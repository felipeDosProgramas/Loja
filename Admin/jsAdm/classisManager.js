import {mostraProUsuario, selectClassis} from './uICadastroProdutos.js';

function criaElementOption(cmOq){
	let elmnt = document.createElement('option')
	elmnt.setAttribute('value',cmOq);
	elmnt.innerText = cmOq;	
	return elmnt;
	
	//Cria o <option> dentro do <select>
}


async function lerClassis(){
	let resp = await fetch("phpAdm/setGetclassis.php?oq=soLer");
	let resposta = await resp.text();
	resposta = resposta.split(",");
	// console.log(resposta)
	selectClassis.innerHTML = "<option value='' selected disabled hidden>classificação</option>";
	resposta.forEach((cada)=>{
		if(cada != ""){
			
			selectClassis.append(
				criaElementOption(cada)
			)
		}
	})
	//faz a leitura do arquivo e pra cada item cria uma <option>
	
}

async function criaClassificacao(doque){	
	let server = await fetch("phpAdm/setGetclassis.php?oq=criaOutro&cmEsse="+doque);
	mostraProUsuario("criado com sucesso");
	lerClassis();
}
async function tiraClassificacao(){
	let qual = selectClassis.value;
	if(qual != ""){
		let server = await fetch("phpAdm/setGetclassis.php?oq=tiraEsse&esse="+qual);
		lerClassis();
		mostraProUsuario("excluido com sucesso");
		return;
	}
	mostraProUsuario("escolha uma classificação para excluir");
}

function criaOption(){
	let inputNomeClassi = document.createElement('input');	
	let sendNomeClass = document.createElement('button');
	let cancelNomeClass = document.createElement('button');
	
	inputNomeClassi.setAttribute('type','text');
	inputNomeClassi.setAttribute('placeholder','Nome da classificação');
	inputNomeClassi.setAttribute('id','inputCriadorClassis');	
	
	sendNomeClass.innerText = "enviar";
	cancelNomeClass.innerText = "cancelar";
	
	sendNomeClass.addEventListener('click', ()=>{
		if(inputNomeClassi.value != ""){
			let ele = criaElementOption(inputNomeClassi.value);
			selectClassis.append(ele);		
			criaClassificacao(inputNomeClassi.value);
			
			inputNomeClassi.remove();
			sendNomeClass.remove();
			cancelNomeClass.remove();
			return;
		}
		mostraProUsuario("insira um nome válido");
	});	
	cancelNomeClass.addEventListener('click', ()=>{
		newClass.style.display = 'initial';
		
		inputNomeClassi.remove();
		sendNomeClass.remove();
		cancelNomeClass.remove();
	});
	criadorClassis.append(inputNomeClassi, sendNomeClass, cancelNomeClass);
}


export {criaClassificacao, tiraClassificacao, criaElementOption, lerClassis, criaOption};
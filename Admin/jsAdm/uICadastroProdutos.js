let newClass = document.getElementById('newClass');
let criadorClassis = document.getElementById('criadorClassis');
let tirarClass = document.getElementById('tiraClass');
let respostaServer = document.getElementById('respostasServidor');
let qtdCor = document.getElementById('qtdCores');
let qtdTamanhos = document.getElementById('qtdTamanhos');
let cores = document.getElementById('cores');
let tamanhos = document.getElementById('tamanhos');
let semiSubmit = document.getElementById('semiSubmit');

let dadosSecundarios = document.getElementById('dadosSecundarios');
let nomePeca = document.getElementById('nome');
let descricaoPeca = document.getElementById('description');
let selectClassis = document.getElementById('classificacoes');
let disponibilidade = document.getElementById('disponivelSimNao');
/*-----------------------------------------------------------------------*/
function getTodosOsDados(){
	let dados = {};
	dados.nome = nomePeca.value;
	dados.descricao = descricaoPeca.value;
	dados.classificacao = selectClassis.value;		
	dados.disponibilidade = taOuNaoDisponivel();
	dados.quantidades = [];
	let inputsSettarQtds = document.getElementsByClassName('inputsSettarQtds');	
	let precos = document.getElementsByClassName('precoPorTamanho');
	let ids = [];
	let aux = [];
	let i = 0;
	for(;i != inputsSettarQtds.length;i++){
		ids.push(inputsSettarQtds[i].id)		
	}	
	ids.forEach((cada)=>{
		aux.push(cada.split('e_e'))
	});
	for(i = 0;i!= inputsSettarQtds.length;i++){
		dados.quantidades.push([aux[i][0], aux[i][2], aux[i][3], document.getElementById(ids[i]).value])
	}
	// console.log(dados.quantidades)
	// console.log(ids)
	// console.log(precos)
	// console.log(aux)
	return dados;
}

function mostraProUsuario(oque){
	respostaServer.innerHTML = oque;
	setTimeout(()=>{
		respostaServer.innerHTML = "";
	}, 1000)
	
}	
function voltaPraAntesDosInputDasCores(){
	cores.innerHTML = '<input type="number" min="0" max="50" id="qtdCores" required>';
}
function voltaPraAntesDosInputDosTamanhos(){
	tamanhos.innerHTML = '<input type="number" min="0" max="50" id="qtdTamanhos" required>';
}
function taOuNaoDisponivel(){
	if(disponibilidade.checked == true){
		return 1;
	}
	return 0;
}
function entreComAsQtdsDeRoupas(){
	
	let inputsTamanhos = document.getElementsByClassName('inputTamanhos');
	let inputsCores = document.getElementsByClassName('inputCores');	
	let precoPorTamanho = document.getElementsByClassName('precoPorTamanho')
	let aux;
	let principal = document.createElement('div');
	principal.setAttribute('class','defineQtds');
	
	for(let x = 0;x != inputsCores.length;x++){
		for(let y = 0;y != inputsTamanhos.length;y++){
			aux = document.createElement('input');
			aux.setAttribute('type','number');
			aux.setAttribute('placeholder', "quantidade de "+inputsTamanhos[y].value+"'s da cor "+ nomesCores[x].value);
			aux.setAttribute('class', "inputsSettarQtds");	
			aux.setAttribute('id',inputsTamanhos[y].value+"e_e"+inputsCores[x].value+"e_e"+precoPorTamanho[y].value )
			aux.required = true
			principal.append(aux)
			aux = null;			
		}
	}
	dadosSecundarios.append(principal)
	
	semiSubmit.removeEventListener('click',entreComAsQtdsDeRoupas);	
	semiSubmit.innerText = "confirmar envio";
	semiSubmit.addEventListener('click',enviaOsDados);	
}

// function enviaOsDados(){
	
	// let dados = getTodosOsDados();
	// dados = JSON.stringify(dados);	
	// let promessa = new Promisse((resolve) => {

	// let xhr = new XMLHttpRequest();
	
	// xhr.onreadystatechange = () =>{
		// if(this.readyState == 4 && this.status == 200){
			// let texto = resolve(xhr.responseText)
		// }
	// }					
	// })
	
	// xhr.open("POST", "phpAdm/backCadastroProduto.php");
	// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");	
	// xhr.send("dados="+dados);
// }


async function enviaOsDados(){       	
	let dados = getTodosOsDados();
	dados = JSON.stringify(dados);	

		let promessa = new Promise((resolve) => {
			let req = new XMLHttpRequest();
			req.open("POST","phpAdm/backCadastroProduto.php");
			req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");	
			req.onload = () => {resolve(req.responseText)};
			req.send("dados="+dados);
		});	
		
		let exemp = await promessa	
		console.log(exemp)	
}
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
/*-----------------------------------------------------------------------*/

lerClassis();

newClass.addEventListener('click', ()=>{	
	criaOption();
	newClass.style.display = "none";	
})
tirarClass.addEventListener('click', tiraClassificacao);

qtdTamanhos.addEventListener('keydown', (e)=> {
    e = e || window.event;
    let code = e.which || e.keyCode;
	let range = Number(qtdTamanhos.value);
	let praPor = "";
	let antesDosInputs = tamanhos.innerHTML;
	
	if(code == "13"){
		praPor += "<br>";
		for(let x = 0;x !=range;x++){
			praPor += "<input type='text' class='inputTamanhos' placeholder='tamanho'><input type='number' class='precoPorTamanho' placeholder='preço'><br>"
		}
		tamanhos.innerHTML = praPor+"<button onclick='voltaPraAntesDosInputDosTamanhos()'>cancelar</button>";
	}
});


qtdCor.addEventListener('keydown', (e) =>{
    e = e || window.event;
    let code = e.which || e.keyCode;
	let range = Number(qtdCor.value);
	let praPor = "";
	let antesDosInputs = cores.innerHTML;
	
	if(code == "13"){
		praPor += "<br>";
		for(let x = 0;x !=range;x++){
			praPor += "<input type='color' class='inputCores'><br>"			
		}
		cores.innerHTML = praPor+"<button onclick='voltaPraAntesDosInputDasCores()'>cancelar</button>";
	}
});

semiSubmit.addEventListener('click', entreComAsQtdsDeRoupas);	
import {criaClassificacao, tiraClassificacao, criaElementOption, lerClassis, criaOption} from "./classisManager.js";

let newClass = document.getElementById('newClass');
let criadorClassis = document.getElementById('criadorClassis');
let tirarClass = document.getElementById('tiraClass');
let respostaServer = document.getElementById('respostasServidor');
let qtdCor = document.getElementById('qtdCores');
let qtdTamanhos = document.getElementById('qtdTamanhos');
let cores = document.getElementById('cores');
let tamanhos = document.getElementById('tamanhos');
let semiSubmit = document.getElementById('semiSubmit');
let form = document.querySelector('form');
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
		dados.quantidades.push([aux[i][0], aux[i][1], aux[i][2], document.getElementById(ids[i]).value])
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
			aux.setAttribute('placeholder', "quantidade de "+inputsTamanhos[y].value+"'s da cor "+ inputsCores[x].value);
			aux.setAttribute('class', "inputsSettarQtds");	
			aux.id = `,${inputsTamanhos[y].value}e_e${inputsCores[x].value}e_e${precoPorTamanho[y].value}`
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


async function enviaOsDados(){       	
	let dados = getTodosOsDados();
	dados = JSON.stringify(dados);	
	
	let formData = new FormData(form);
	
	formData.append('dados', dados);	
	let promessa = new Promise((resolve) => {
		let req = new XMLHttpRequest();
		req.open("POST","phpAdm/backCadastroProduto.php");
		req.onload = () => {resolve(req.responseText)};
		req.send(formData);
	});	
	
	let exemp = await promessa	
	if(exemp == "foiCertin"){			
		//mostrar que foi sem erros
		return;
	}
	//mostrar que deu algo errado
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

form.addEventListener('submit', e => {e.preventDefault()});

semiSubmit.addEventListener('click', entreComAsQtdsDeRoupas);		


export {mostraProUsuario, selectClassis};
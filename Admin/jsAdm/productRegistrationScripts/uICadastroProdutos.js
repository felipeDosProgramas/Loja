import classManager from "./classes/classisManager.js";
import previewManager from "./classes/previewManager.js";



// VARIAVEIS DAS CLASSES 
let newClass = document.getElementById		('newClass');
let criadorClassis = document.getElementById('criadorClassis');
let tirarClass = document.getElementById	('tiraClass');
// --------------------- 

// INPUTS DE ENTRADA DE DADOS
let disponibilidade = document.getElementById	('disponivelSimNao');
let nomePeca = document.getElementById			('nome');
let descricaoPeca = document.getElementById		('description');
let selectClassis = document.getElementById		('classificacoes');
let semiSubmit = document.getElementById		('semiSubmit');
let oInputDeSeleciona = document.getElementById	('muitasFotosSimNao')
// -------------------------

// Divs do DOM e SAIDA DE DADOS
let form = document.querySelector				('form');
let cores = document.getElementById				('cores');
let tamanhos = document.getElementById			('tamanhos');
let respostaServer = document.getElementById	('respostasServidor');
let dadosSecundarios = document.getElementById	('dadosSecundarios');
// -------------------------


/* VARIAVEIS DA TABELA */
let inputsInfoTable = document.getElementById	('inputsInfoTable')
let addInfosTable = document.getElementById		('definCorTam')
/* -------------------  */

// VARIAVEIS DAS PREVIAS
let temOuNnPrevia = document.getElementById				('labelSeTemPreviaCadastrada');	
let dataPeca = document.getElementById 					('dataLancPrevia')
let selectDasPreviasCadastradas =document.getElementById('temPrevia');
// ---------------------

// INSTANCIAS DO GERENCIADOR DE CLASSIFICAÇÕES

let ClManage = new classManager();
	ClManage.setOutput(criadorClassis,newClass , tirarClass);
	ClManage.setInput(selectClassis, respostaServer);	
	ClManage.lerClassis();
// ----------------------------------------------

//INSTANCIAS DO GERENCIADOR DE PRÉVIAS
let prVwManage = new previewManager();
	prVwManage.setOutput(selectDasPreviasCadastradas, nomePeca, dataPeca);
	prVwManage.setInput(temOuNnPrevia);
	prVwManage.setPreviewOptions()
	prVwManage.ifGotPreview()
/*-----------------------------------------------------------------------*/


function getTodosOsDados(){
	let dados = {};
	dados.nome = nomePeca.value;
	dados.descricao = descricaoPeca.value;
	dados.classificacao = selectClassis.value;		
	dados.disponibilidade = taOuNaoDisponivel();
	dados.quantidades = [];
	let inputsSettarQtds = document.getElementsByClassName	('inputsSettarQtds');	
	let precos = document.getElementsByClassName			('precoPorTamanho');
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
	
	return dados;
}

// function voltaPraAntesDosInputDasCores(){
// cores.innerHTML = '<input type="number" min="0" max="50" id="qtdCores" required>';
// }
// function voltaPraAntesDosInputDosTamanhos(){
// tamanhos.innerHTML = '<input type="number" min="0" max="50" id="qtdTamanhos" required>';
// }
function taOuNaoDisponivel(){
	if(disponibilidade.checked == true){
		return 1;
	}
	return 0;
}
function entreComAsQtdsDeRoupas(){
	
	let inputsTamanhos = document.getElementsByClassName	('inputTamanhos');
	let inputsCores = document.getElementsByClassName		('inputCores');	
	let precoPorTamanho = document.getElementsByClassName	('precoPorTamanho')
	let aux;
	let principal = document.createElement('div');
	principal.className = 'defineQtds';
	
	for(let x = 0;x != inputsCores.length;x++){
		for(let y = 0;y != inputsTamanhos.length;y++){
			aux = document.createElement('input');
			aux.type = 'number';
			aux.placeholder = `quantidade de ${inputsTamanhos[y].value}'s da cor ${inputsCores[x].value}`;
			aux.className = "inputsSettarQtds";	
			aux.id = `${inputsTamanhos[y].value}e_e${inputsCores[x].value}e_e${precoPorTamanho[y].value}`
			aux.required = true
			principal.append(aux)
			aux = null;			
		}
	}
	dadosSecundarios.append(principal)
	
	semiSubmit.innerText = "confirmar envio";
	
	semiSubmit.removeEventListener	('click',entreComAsQtdsDeRoupas);		
	semiSubmit.addEventListener		('click',enviaOsDados);	
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

function setPicCores(){
	if(oInputDeSeleciona.checked == 'true'){
		let inputsCores = document.getElementsByClassName('inputCores');
		let qntsCores = inputsCores.length;		
		
		if(qntsCores != 0){
			for(let x = 0; x != qntsCores;x++){
				let input = document.createElement('input');
				input.type = 'file';
				input.name = `${inputsCores[x].value}[]`;
				input.multiple = true;
				form.append(input);
			}		
		}
	}
}


/*-----------------------------------------------------------------------*/







/*qtdTamanhos.addEventListener('keydown', (e)=> {
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
});*/


/*qtdCor.addEventListener('keydown', (e) =>{
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
});*/

/*FUNCAO ADD INFORMACOES DA TABELA*/
addInfosTable.addEventListener('click', () => {
	let divTodoInput = document.createElement('div')
	divTodoInput.classList.add('divTodoInput')
	
	let cardsTableInput = document.createElement('div')
	cardsTableInput.classList.add('cardsTableInput')
	
	let divInputCor = document.createElement('div')
	divInputCor.classList.add('divInputCor')
	let inputCor = document.createElement('input')
	inputCor.type = 'color'
	inputCor.classList.add('inputColor')
	divInputCor.appendChild(inputCor)
	
	let divInputQtdCor = document.createElement('div')
	divInputQtdCor.classList.add('divInputQtdCor')
	let inputQtdCor = document.createElement('input')
	inputQtdCor.type = 'number'
	inputQtdCor.min = '1'
	inputQtdCor.placeholder = 'Digite a quantidade'
	inputQtdCor.classList.add('inputs')
	divInputQtdCor.appendChild(inputQtdCor)
	
	let divInputTamQtd = document.createElement('div')
	divInputTamQtd.classList.add('divInputQtdCor')
	let inputTamQtd = document.createElement('input')
	inputTamQtd.type = 'text'
	inputTamQtd.placeholder = 'Digite os tamanhos'
	inputTamQtd.classList.add('inputs')
	divInputTamQtd.appendChild(inputTamQtd)
	
	let divCancelInfo = document.createElement('divCancelInfo')
	divCancelInfo.classList.add('divCancelInfo')
	let cancelTableInputs = document.createElement('button')
	cancelTableInputs.id = 'cancelTableInputs'
	cancelTableInputs.classList.add('btnsCria')
	cancelTableInputs.innerText = 'Cancelar Cor'
	cancelTableInputs.onclick = () => {
		divTodoInput.remove()
	}
	divCancelInfo.appendChild(cancelTableInputs)
	
	cardsTableInput.append(divInputCor, divInputQtdCor, divInputTamQtd)
	divTodoInput.append(cardsTableInput, divCancelInfo)
	inputsInfoTable.appendChild(divTodoInput)
})
/*------------------*/
/*<div id="inputsInfoTable">
	<div class="divTodoInput">
	<div class="cardsTableInput">
	<div class="divInputCor"><input type="text" placeholder="Digite a cor" class="inputs"></div>
	<div class="divInputQtdCor"><input type="number" placeholder="Digite a quantidade " class="inputs"></div>
	<div class="divInputTamQtd"><input type="number" placeholder="Digite o tamanho" class="inputs"></div>
	</div>
	<div class="divCancelInfo"><button class="btnsCria" id="cancelTableInputs">Cancelar Cor</button></div>
	</div>
</div>*/
// form.addEventListener('submit', e => {e.preventDefault()});

semiSubmit.addEventListener('click', entreComAsQtdsDeRoupas);		



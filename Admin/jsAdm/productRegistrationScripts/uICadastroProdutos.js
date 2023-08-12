import classManager 		from "./classes/classisManager.js";
import previewManager 		from "./classes/previewManager.js";
import dataReceiveManager	from "./classes/dataReceiveManager.js";
import variationsManager 	from "./classes/variationsManager.js";

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
// let inputsInfoTable = document.getElementById	('inputsInfoTable')
let addInfosTable = document.getElementById		('boxTabelas')
/* -------------------  */

// VARIAVEIS DAS PREVIAS
let temOuNnPrevia = document.getElementById				('labelSeTemPreviaCadastrada');	
let dataPeca = document.getElementById 					('dataLancPrevia')
let selectDasPreviasCadastradas =document.getElementById('temPrevia');
let checkBoxTemPrev = document.getElementById			('temPreviaCadastradaSsNn')
//------------------------------------------

// INSTANCIAS DO GERENCIADOR DE CLASSIFICAÇÕES
let ClManage = new classManager();
	ClManage.setOutput(criadorClassis,newClass , tirarClass);
	ClManage.setInput(selectClassis, respostaServer);	
	ClManage.lerClassis();
	
// ----------------------------------------------

//INSTANCIAS DO GERENCIADOR DE PRÉVIAS
let prVwManage = new previewManager();
	prVwManage.setOutput(selectDasPreviasCadastradas, nomePeca, dataPeca);
	prVwManage.setInput(temOuNnPrevia, checkBoxTemPrev);
	prVwManage.setPreviewOptions()
	prVwManage.ifGotPreview()

// ----------------------------------------------

//INSTANCIAS DO RECEPTOR DE DADOS
let dtRcvManage = new dataReceiveManager();
	dtRcvManage.setInput(nomePeca, dataPeca, descricaoPeca, selectClassis, disponibilidade);


// ----------------------------------------------

// INSTANCIAS DO GERENCIADOR DE VARIAÇÕES
let varManage = new variationsManager(addInfosTable)
	varManage

/*-----------------------------------------------------------------------*/



/*FUNCAO ADD INFORMACOES DA TABELA
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
------------------*/





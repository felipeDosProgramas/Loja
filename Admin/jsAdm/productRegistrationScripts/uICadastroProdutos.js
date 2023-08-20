import classManager 		from "./classes/classisManager.js";
import previewManager 		from "./classes/previewManager.js";
import dataReceiveManager	from "./classes/dataReceiveManager.js";
import variationsManager 	from "./classes/variationsManager/variationsManager.js";

// VARIAVEIS DAS CLASSES 
let newClass = document.getElementById		('newClass');
let criadorClassis = document.getElementById('criadorClassis');
let tirarClass = document.getElementById	('tiraClass');
let classOptions = document.getElementById	('classOptions');
// --------------------- 

// INPUTS DE ENTRADA DE DADOS
let disponibilidade = document.getElementById	('disponivelSimNao');
let nomePeca = document.getElementById			('nome');
let descricaoPeca = document.getElementById		('description');
let selectClassis = document.getElementById		('classificacoes');
let semiSubmit = document.getElementById		('semiSubmit');
let oInputDeSeleciona = document.getElementById	('muitasFotosSimNao');
// -------------------------

// Divs do DOM e SAIDA DE DADOS
let form = document.querySelector				('form');
let cores = document.getElementById				('cores');
let tamanhos = document.getElementById			('tamanhos');
let respostaServer = document.getElementById	('respostasServidor');
let dadosSecundarios = document.getElementById	('dadosSecundarios');
// -------------------------


/* VARIAVEIS DA TABELA */
let addInfosTable = document.getElementById		('boxTabelas')
let btnDefVariacao = document.getElementById	('definCorTam')
let maisUmaCor = document.getElementById		('maisUmaCor')
let menosUmaCor = document.getElementById 		('menosUmaCor')
let divInputsCores = document.getElementById	('inputsCores')
/* -------------------  */

// VARIAVEIS DAS PREVIAS
let temOuNnPrevia = document.getElementById				('labelSeTemPreviaCadastrada');	
let dataPeca = document.getElementById 					('dataLancPrevia')
let selectDasPreviasCadastradas =document.getElementById('temPrevia');
let checkBoxTemPrev = document.getElementById			('temPreviaCadastradaSsNn')
//------------------------------------------

// INSTANCIAS DO GERENCIADOR DE CLASSIFICAÇÕES
let ClManage = new classManager	();
	ClManage.setOutput			(criadorClassis,newClass , tirarClass);
	ClManage.setInput			(selectClassis, respostaServer, classOptions);	
	ClManage.lerClassis			();
	
// ----------------------------------------------

//INSTANCIAS DO GERENCIADOR DE PRÉVIAS
let prVwManage = new previewManager	();
	prVwManage.setOutput			(selectDasPreviasCadastradas, nomePeca, dataPeca);
	prVwManage.setInput				(temOuNnPrevia, checkBoxTemPrev);
	prVwManage.setPreviewOptions	()
	prVwManage.ifGotPreview			()

// ----------------------------------------------

//INSTANCIAS DO RECEPTOR DE DADOS
let dtRcvManage = new dataReceiveManager();
	dtRcvManage.setInput				(nomePeca, dataPeca, descricaoPeca, selectClassis, disponibilidade);


// ----------------------------------------------

// INSTANCIAS DO GERENCIADOR DE VARIAÇÕES
let varManage = new variationsManager	(addInfosTable, tamanhos, respostaServer)
	varManage.setInputs					(btnDefVariacao, maisUmaCor,menosUmaCor,divInputsCores)
/*-----------------------------------------------------------------------*/
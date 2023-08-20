import classManager 		from "./classes/classisManager.js";
import previewManager 		from "./classes/previewManager.js";
import dataReceiveManager	from "./classes/dataReceiveManager.js";
import variationsManager 	from "./classes/variationsManager/variationsManager.js";

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
// -------------------------

// Divs do DOM e SAIDA DE DADOS
let tamanhos = document.getElementById			('tamanhos');
let respostaServer = document.getElementById	('respostasServidor');
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
let previewsCtrlZ = document.getElementById 			('previewsCtrlZ')
//------------------------------------------

// INSTANCIAS DO GERENCIADOR DE CLASSIFICAÇÕES
let ClManage = new classManager	();	
	ClManage.setInput			(selectClassis, respostaServer);
	ClManage.setOutput			(criadorClassis,newClass , tirarClass);
	ClManage.lerClassis			();
	
// ----------------------------------------------

//INSTANCIAS DO GERENCIADOR DE PRÉVIAS
let prVwManage = new previewManager	();
	prVwManage.setInput				(temOuNnPrevia, checkBoxTemPrev, previewsCtrlZ);
	prVwManage.setOutput			(selectDasPreviasCadastradas, nomePeca, dataPeca);	
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
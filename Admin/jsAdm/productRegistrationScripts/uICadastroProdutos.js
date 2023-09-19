import classManager 		from	"./classes/classisManager/classisManager.js";
import dataReceiveManager	from	"./classes/dataSendManager/dataReceiveManager.js";
import variationsManager 	from	"./classes/variationsManager/variationsManager.js";
import previewManager 		from	"./classes/previewsManager/previewManager.js";

// VARIAVEIS DAS CLASSIFICAÇÕES
let newClass = document.getElementById			('newClass');
let criadorClassis = document.getElementById	('criadorClassis');
let tirarClass = document.getElementById		('tiraClass');
let selectClassis = document.getElementById		('classificacoes');
let btnAddOClassPaPc = document.getElementById	('btnAdicionaOutroClassPraPeca');
let divSelectsClassis = document.getElementById	('divSelectsDasClassificacoesSelecionadas');
// ---------------------

// INPUTS DE ENTRADA DE DADOS
let disponibilidade = document.getElementById	('disponivelSimNao');
let nomePeca = document.getElementById			('nome');
let descricaoPeca = document.getElementById		('description');
let dataPeca = document.getElementById 			('dataLancPrevia');
let inputAddFotos = document.getElementById		('inputAddFotos');
// -------------------------

// Divs do DOM e SAIDA DE DADOS
let tamanhos = document.getElementById			('tamanhos');
let respostaServer = document.getElementById	('respostasServidor');
let submit = document.getElementById			('semiSubmit');
let btnLancHj = document.getElementById			('btnLancHoje');
let generalPictures = document.getElementById	('generalPictures');
// -------------------------

/* VARIAVEIS DA TABELA DE VARIAÇÕES */
let addInfosTable = document.getElementById		('boxTabelas');
let btnDefVariacao = document.getElementById	('definCorTam');
let maisUmaCor = document.getElementById		('maisUmaCor');
let menosUmaCor = document.getElementById 		('menosUmaCor');
let divInputsCores = document.getElementById	('inputsCores');
let checkMsmPrcoTdsVars =document.getElementById('msmPrecoTodasVariacoes');
let slotInptPrecoTdsVars=document.getElementById('slotInputPrecoTdsVars');
let inptIdFotosRecebidas=document.getElementById('inputIdTodasFotosRecebidas');
/* -------------------  */

// VARIAVEIS DAS PREVIAS
let temOuNnPrevia = document.getElementById				('labelSeTemPreviaCadastrada');
let selectDasPreviasCadastradas =document.getElementById('temPrevia');
let checkBoxTemPrev = document.getElementById			('temPreviaCadastradaSsNn');
let selectedPreviewPictures = document.getElementById 	('selectedPreviewPictures');
let picturesInInputFile = document.getElementById 		('picturesInInputFile');
//------------------------------------------

// INSTANCIAS DO GERENCIADOR DE CLASSIFICAÇÕES
let ClManage = new classManager	();
	ClManage.setInput			(selectClassis, respostaServer, btnAddOClassPaPc);
	ClManage.setOutput			(criadorClassis,newClass , tirarClass, divSelectsClassis);
	ClManage.lerClassis			();
// ----------------------------------------------

//INSTANCIAS DO GERENCIADOR DE PRÉVIAS
let prVwManage = new previewManager	();
	prVwManage.setInput				(temOuNnPrevia, checkBoxTemPrev, selectedPreviewPictures, divInputsCores);
	prVwManage.setOutput			(selectDasPreviasCadastradas, nomePeca, dataPeca);
	prVwManage.setPreviewOptions	();
// ----------------------------------------------
// INSTANCIAS DO GERENCIADOR DE VARIAÇÕES
let varManage = new variationsManager	(addInfosTable, tamanhos, respostaServer, inputAddFotos);
	varManage.setInputs					(btnDefVariacao, maisUmaCor,menosUmaCor,divInputsCores, checkMsmPrcoTdsVars, slotInptPrecoTdsVars, generalPictures);
	varManage.setOutputs				(picturesInInputFile,inptIdFotosRecebidas)
// ----------------------------------------------
//INSTANCIAS DO RECEPTOR DE DADOS
let dtRcvManage = new dataReceiveManager(submit, btnLancHj);
	dtRcvManage.setInput				(nomePeca, dataPeca, descricaoPeca, selectClassis, disponibilidade);
	dtRcvManage.setClassToGetDomThings	(varManage);
/*-----------------------------------------------------------------------*/
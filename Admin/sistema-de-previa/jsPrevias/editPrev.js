import editPrevHandler from './classes/editPrevHandler.js';

let get = location.href;get = get.split("?");get = get[1].split("=");get =  get[1].replace("%20", " ");
let inpuNome = document.getElementById('inputEditarNomePrevia');
let inpuDate = document.getElementById('inputDataPrevia');
let listaImagens = document.getElementById('divLista');
let excluPreviaInteira = document.getElementById("excluPreviaInteira");	
/*
	let divDosBotoes = document.getElementById('botoesControle');
	let excluMarcados = document.getElementById('excluMarcados')
	let marcaAtualPraExclu = document.getElementById('marcaAtual');
	let imgsBanco = document.getElementById("imgsExistentes");
	let mudaImg =  document.getElementById("carroselImgsEdit");
	let imgsPraEditar = [];
	let srcImagensProCarrosel = [];
	let Dataslan = [];
	let exemp;
	let number = 0;
*/
let edtPrev = new editPrevHandler(listaImagens, get);
edtPrev.setInputs(inpuDate, inpuNome)
edtPrev.setImg();
/*function veSeTem(oque, naOnde){
	let retorno = true;
	naOnde.forEach((cada)=>{
	if(oque === cada){
	retorno = false;
	}
	})
	return retorno;
	}
	
	function execCarrosel(arrayImg){
	
	let tamanho = arrayImg.length;
	
	mudaImg.src = arrayImg[number];
	
	if(tamanho != 1 || tamanho != 0){
	divDosBotoes.innerHTML = '<button id="btnEsquerda"> anterior </button><button id="btnDireita"> proximo </button>';
	
	let btnDireita = document.getElementById('btnDireita');
	let btnEsquerda = document.getElementById('btnEsquerda');
	
	btnDireita.addEventListener('click', function (e){
	e.preventDefault()
	
	if (arrayImg[++number]){ 
	mudaImg.src = arrayImg[number];
	}else{
	number = 0;
	mudaImg.src = arrayImg[number];
	}			
	})
	
	btnEsquerda.addEventListener('click', function (e){
	e.preventDefault()
	
	if (arrayImg[--number]){ 
	mudaImg.src = arrayImg[number];
	}else{
	number = arrayImg.length - 1
	mudaImg.src = arrayImg[number];
	}
	})		
	}	
	}
	


marcaAtualPraExclu.addEventListener('click', (e)=>{
	e.preventDefault();
	if(veSeTem(srcImagensProCarrosel[number], imgsPraEditar)){
		imgsPraEditar.push(srcImagensProCarrosel[number])	
		return;
	}
	imgsPraEditar.splice(imgsPraEditar.indexOf(srcImagensProCarrosel[number]), 1);			
})

excluMarcados.addEventListener('click', async (e)=>{
	e.preventDefault();
	if(imgsPraEditar.length != 0){
		let imgs = JSON.stringify(imgsPraEditar);	
		let server = await fetch("phpPrevias/filesHandler.php?q="+get+"&sendThem="+imgs);
		let resposta = await server.text();
		console.log(resposta)		
	}
})
*/
excluPreviaInteira.onclick = (e) => {
	e.preventDefault();
	request.excluPrevInteira();
}

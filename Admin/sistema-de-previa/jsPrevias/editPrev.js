import editPrevHandler from './classes/editPrevHandler.js';

let get = location.href;get = get.split("?");get = get[1].split("=");get =  get[1].replace("%20", " ");
let inpuNome = document.getElementById('inputEditarNomePrevia');
let inpuDate = document.getElementById('inputDataPrevia');
let listaImagens = document.getElementById('divLista');
let excluPreviaInteira = document.getElementById("excluPreviaInteira");	
let btnsPrevManParent = document.getElementById('divBtnsGenPrev')
let inpuImgs = document.getElementById('inputHi')

let edtPrev = new editPrevHandler(listaImagens, get, btnsPrevManParent);
	edtPrev.setInputs(inpuDate, inpuNome, inpuImgs)
	edtPrev.setImg();
	edtPrev.enviarFotosAdicionais();
excluPreviaInteira.onclick = edtPrev.excluPrevInteira
	

inpuNome.addEventListener('input', alterar)
inpuDate.addEventListener('input', alterar)

function alterar(){
	edtPrev.alterouUmDado()
	inpuNome.removeEventListener('input', alterar)		
	inpuDate.removeEventListener('input', alterar)
}
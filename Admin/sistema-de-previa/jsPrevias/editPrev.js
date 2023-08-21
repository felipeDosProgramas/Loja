import editPrevHandler from './classes/editPrevHandler.js';

let get = location.href;get = get.split("?");get = get[1].split("=");get =  get[1].replace("%20", " ");
let inpuNome = document.getElementById('inputEditarNomePrevia');
let inpuDate = document.getElementById('inputDataPrevia');
let listaImagens = document.getElementById('divLista');
let excluPreviaInteira = document.getElementById("excluPreviaInteira");	
let btnsPrevManParent = document.getElementById('divBtnsPre')
let inpuImgs = document.getElementById('inputHi')
let btnAddNewPics = document.getElementById('addImage')
let btnSalvarDados = document.getElementById('btnSalvarDados')

let edtPrev = new editPrevHandler(listaImagens, get, btnsPrevManParent);
edtPrev.setInputs(inpuDate, inpuNome, inpuImgs)
edtPrev.setImg();	

excluPreviaInteira.onclick 	= edtPrev.excluPrevInteira
btnAddNewPics.onclick 		= () => sendPictureOrDisplayFilesInput(true)

btnSalvarDados.onclick = (e) => {
	e.preventDefault()
	edtPrev.mudaDados()					
}
/*
inpuNome.addEventListener('input', alterar)
inpuDate.addEventListener('input', alterar)

function alterar(){
	edtPrev.alterouUmDado()
	inpuNome.removeEventListener('input', alterar)		
	inpuDate.removeEventListener('input', alterar)
}
*/
function sendPictureOrDisplayFilesInput(mode){
	if(mode){
		inpuImgs.style.display = "initial"	
		btnAddNewPics.onclick = () => sendPictureOrDisplayFilesInput(false)			
		return
	}
	inpuImgs.style.display = "none"	
	edtPrev.enviarFotosAdicionais()
	btnAddNewPics.onclick = () => sendPictureOrDisplayFilesInput(true)			
}

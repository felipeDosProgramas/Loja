import requestsHandler from './requestsHandler.js'

class editPrevHandler extends requestsHandler{
	constructor(imgsParentElement, parsedGet, btnsParentElement){			
		super(parsedGet)
		this.imgsParentElement = imgsParentElement;
		this.btnsParentElement = btnsParentElement;
		this.number = 0;
		this.toEdit = []
	}	
	
	querExcluirAlgumaFoto(cardDela, linkImg){
		let nomeFoto = linkImg.split('/');
		nomeFoto = nomeFoto.pop();
		this.excluSoUmaFoto(nomeFoto)
		cardDela.remove()
	}
	
	alterouUmDado(){	
		let btnSalvarDados = document.createElement('button')
		btnSalvarDados.className = 'btnSub'
		btnSalvarDados.innerText = "salvar";
		btnSalvarDados.onclick = (e) => {
			e.preventDefault()
			this.mudaDados()
		}
		
		this.btnsParentElement.append(btnSalvarDados)
	}
	
	enviarFotosAdicionais(){			
		let form = new FormData();						
		
		this.inpuImgs.files
		// form.append('imagens', this.inpuImgs.files, 'imagens');
		form.append('action', 'addPics')
		this.addImgsNaPrev(form)
	}	
	
	createImgCard(linkImg){
		let card = document.createElement('div');
		let btnCheck = document.createElement('div');
		let checkBox = document.createElement('input');
		let btn = document.createElement('button');
		
		card.className = 'cardsListas';
		btnCheck.className = 'divBtnAndCheck';
		checkBox.className = 'checkExclu';
		btn.className = 'excluirOnePrev';
		checkBox.className = 'checkExclu';
		
		checkBox.type = 'checkBox';		
		btn.innerText = 'Excluir';				
		card.style.backgroundImage = `url('../../${linkImg}')`;
		card.style.backgroundSize = 'cover';
		
		btn.onclick = () => this.querExcluirAlgumaFoto(card, linkImg)
		
		this.inputsChecked.push(checkBox)
		btnCheck.append(checkBox, btn)
		card.append(btnCheck)
		
		this.imgsParentElement.append(card)
	}
	async setImg(){	
		let foi = await this.consultaInicial()
		this.inputsChecked = []
		console.log(foi)
		if(foi){
			this.imagens.forEach( cada => this.createImgCard(cada))			
			return;
		}
		
	}
	
}	

export default editPrevHandler;
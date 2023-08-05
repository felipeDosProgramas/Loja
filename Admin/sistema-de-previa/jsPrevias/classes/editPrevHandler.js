import requestsHandler from './requestsHandler.js'

class editPrevHandler extends requestsHandler{
	constructor(imgsParentElement, parsedGet){			
		super(parsedGet)
		this.imgsParentElement = imgsParentElement;
		this.number = 0;
		this.toEdit = []
	}	
	
	querExcluirAlgumaFoto(cardDela, linkImg){
		let nomeFoto = linkImg.split('/');
		nomeFoto = nomeFoto.pop();
		this.excluSoUmaFoto(nomeFoto)
		cardDela.remove()
	}
	
	createImgCard(linkImg){
		let card = document.createElement('div');
		let btnCheck = document.createElement('div');
		let checkBox = document.createElement('input');
		let btn = document.createElement('button');
		
		card.className = 'cardsListas';
		btnCheck.className = 'divBtnAndCheck';
		checkBox.className = 'checkExclu';
		btn.id = 'excluirOnePrev';
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
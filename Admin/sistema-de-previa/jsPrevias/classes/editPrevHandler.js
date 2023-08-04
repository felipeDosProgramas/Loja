class editPrevHandler{
	constructor(imgElement){			
		
		this.mudaImg = imgElement;
		this.number = 0;
	}	
	
	async setImgsCarrosel(){
		this.arrayImg = await arrayImagens;
	}
	
	execCarrosel(){
		
		let tamanho = this.arrayImg.length;
		
		this.mudaImg.src = this.arrayImg[number];
		
		if(tamanho != 1 || tamanho != 0){
			let botoes = []
			Botoes[0] = document.createElement('button')
			Botoes[0].id = "btnEsquerda"
			Botoes[0].innerText = "anterior"
			
			Botoes[1] = document.createElement('button')
			Botoes[1].id = "btnDireita"
			Botoes[1].innerText = "proximo"
			
			this.divDosBotoes.append(...Botoes)
			
			Botoes[1].addEventListener('click', function (e){
				e.preventDefault()
				
				if (this.arrayImg[++number]){ 
					this.mudaImg.src = this.arrayImg[number];
					return;
				}
				number = 0;
				this.mudaImg.src = this.arrayImg[number];
				
			})
			
			Botoes[0].addEventListener('click', function (e){
				e.preventDefault()
				
				if (this.arrayImg[--number]){ 
					this.mudaImg.src = this.arrayImg[number];
					return;
				}
				number = this.arrayImg.length - 1
				this.mudaImg.src = this.arrayImg[number];
				
			})
		}
	}
	
}	

export default editPrevHandler;
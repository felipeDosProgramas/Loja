import elementsCreator from './elementsCreator.js'

class variationsManager extends elementsCreator{
	constructor(divPai){			
		super()	
		
		this.divPai = divPai		
		this.rows = []
		
		this.rowAtual = 0;
	}
	setInputs(btnDefVariacao, maisUmaCor,menosUmaCor, divInputsCores, tamanhos){
		this.btnDefVariacao = btnDefVariacao
		this.maisUmaCor = maisUmaCor
		this.menosUmaCor = menosUmaCor
		this.divPaiInputsCores = divInputsCores
		this.inputTamanhos = tamanhos
		
		this.setEventListeners();
	}
	
	setEventListeners(){
		this.btnDefVariacao.onclick = () => {
			this.listaTamanhos = this.inputTamanhos.value.split(",")
			this.listaTamanhos.forEach((cada, index) => {this.listaTamanhos[index] = cada.trim()})
		}
		
		this.maisUmaCor.onclick = () => {
			let inputColor = this.generateColorInput();
			this.divPaiInputsCores.append(inputColor)
		}
		
		this.menosUmaCor.onclick = () => {
			this.divPaiInputsCores.firstChild.remove()
		}
	}
	variationDataSlot(){
		let colorInput = document.createElement('td')
		let sizeInput = document.createElement('td')
		let priceInput = document.createElement('td')
		
		let colorOptions = this.generateColorsOptions()
		let sizeSelect = this.generateSizeSelect()
		let inputPriceInput = this.generatePriceInput()
		
		priceInput.append(inputPriceInput)
		colorInput.append(colorOptions)
		sizeInput.append(sizeSelect)
	}
	newVariation(){
		this.rows[this.rowAtual] = document.createElement('tr')
		this.rows[this.rowAtual].className = "linhas"
		
		this.table.append(this.rows[this.rowAtual])
	}	
}

export default variationsManager;
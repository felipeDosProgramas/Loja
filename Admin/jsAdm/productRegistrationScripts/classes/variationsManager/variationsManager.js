import elementsCreator from './elementsCreator.js'

class variationsManager extends elementsCreator{
	constructor(divPai){			
		super()	
		
		this.rows = []
		this.rowAtual = 0;
	}
	setInputs(btnDefVariacao, maisUmaCor){
		this.btnDefVariacao = btnDefVariacao
		this.maisUmaCor = maisUmaCor
		this.setEventListeners();
	}
	
	setEventListeners(){
		this.btnDefVariacao.onclick = () => {						
			let sizesInput = this.generateSizesInput()
			
			this.divPai.append(sizesInput)
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
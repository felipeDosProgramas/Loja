class variationsManager{
	constructor(divPai){				
		this.table = document.createElement('table')
		this.table.id = "tabela"
		divPai.append(this.table)
		
		this.rows = []
		this.rowAtual = 0;
	}
	generateColorsOptions(){
		let selectForColors = document.createElement('select')	
		this.selectedColors.forEach((cada) => {
			let option = document.createElement('option')
			option.value = cada			
			option.style.backgroundColor = cada
			
			selectForColors.append(option)
		})	
		
		return selectForColors
	}
	generateSizeSelect(){
		let selectForSizes = document.createElement('select')
		
		this.selectedSizes.forEach((cada) => {
			let option = document.createElement('option')
			option.value = cada			
			option.innerText = cada
			
			selectForSizes.append(option)
		})
		
		return selectForSizes;
	}
	generatePriceInput(){
		let inputPriceInput = document.createElement('input')
		inputPriceInput.type = "number"
		inputPriceInput.min = "0"
		inputPriceInput.required = true
		
		return inputPriceInput;
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
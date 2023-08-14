class elementsCreator{
	constructor(){}
	
	generateColorsOptions(selectedColors){
		let selectForColors = document.createElement('select')	
		
		selectedColors.forEach((cada) => {
			let option = document.createElement('option')
			option.value = cada			
			option.style.backgroundColor = cada
			
			selectForColors.append(option)
		})	
		
		return selectForColors
	}
	generateSizeSelect(selectedSizes){
		let selectForSizes = document.createElement('select')
		
		selectedSizes.forEach((cada) => {
			let option = document.createElement('option')
			option.value = cada			
			option.innerText = cada
			
			selectForSizes.append(option)
		})
		
		return selectForSizes;
	}
	generateColorInput(){
		let colorInput = document.createElement('input')
		colorInput.type = "color"
		
		return colorInput
	}

	generatePriceInput(){
		let inputPriceInput = document.createElement('input')
		inputPriceInput.type = "number"
		inputPriceInput.min = "0"
		inputPriceInput.required = true
		
		return inputPriceInput;
	}		
}

export default elementsCreator;
class elementsCreator{
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
}

export default elementsCreator;
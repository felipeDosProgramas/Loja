class elementsCreator{
	constructor(inputSizes){
		this.inputsCores 	= []
		this.selectsCores	= []		
		this.selectsSizes = []
		this.inputSizes = inputSizes
	}
	
	generateColorsOptions(){
		let selectForColors = document.createElement('select')	
		
		selectForColors.className = "selectsForColors"
		selectForColors.style.width = "5vw"
		
		selectForColors.onchange = () => {			
			selectForColors.style.backgroundColor = this.options[this.selectedIndex].style.backgroundColor;			
			//-------------------------------------------------------------------------------------------------------------------------
		}		
		this.selectsCores.push(selectForColors)
		
		this.refreshColorsOptions()
		return selectForColors
	}
	refreshColorsOptions(){
		
		this.selectsCores.forEach((cada) => {
			while(cada.firstChild){
				cada.firstChild.remove()
			}
			
			
			this.inputsCores.forEach((cor) => {
				let option = document.createElement('option')
				option.value = cor.value		
				option.innerText = cor.value
				option.style.backgroundColor = cor.value
				cada.append(option)
			})
		})				
		
	}
	createOptions(wit){
		let opts = []
		wit.forEach((cada) => {
			let option = document.createElement('option')
			option.innerText = cada
			option.value = cada
			
			opts.push(option)
		})
		console.log(opts)
		return opts
	}
	cleanSelectChilds(select){
		while(select.firstChild){
			select.firstChild.remove()
		}
		return select
	}
	createSizeOptions(){
		let tamanhos = this.inputSizes.value.split(',') 
		tamanhos.forEach((cada, um) => tamanhos[um] = cada.trim())
		
		tamanhos = this.createOptions(tamanhos)
		
		return tamanhos
	}
	refreshSizesOptions(){
		console.clear()		
		
		
		this.selectsSizes.forEach((cada)=>{			
			const tamanhos = this.createSizeOptions()
			
			cada = this.cleanSelectChilds(cada)
			
			tamanhos.forEach((opt) => {
				cada.append(opt)
			})
		})
	}	
	
	generateSizeSelect(){
		let selectForSizes = document.createElement('select')		
		this.selectsSizes.push(selectForSizes)
		
		this.refreshSizesOptions()	
		return selectForSizes;
	}
	generateColorInput(){
		let colorInput = document.createElement('input')
		colorInput.className = "cores"
		colorInput.type = "color"
		
		this.inputsCores.push(colorInput)
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
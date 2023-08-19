import sideElementsCreator from './sideElementsCreator.js'

class elementsCreator extends sideElementsCreator{
	constructor(inputSizes){
		super()
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
	refreshSizesOptions(){
		console.clear()		
		
		
		this.selectsSizes.forEach((cada)=>{			
			const tamanhos = this.createSizeOptions(this.inputSizes.value)
			
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
		inputPriceInput.placeholder = "Preço dessa variação"
		inputPriceInput.required = true
		
		return inputPriceInput;
	}		
}

export default elementsCreator;
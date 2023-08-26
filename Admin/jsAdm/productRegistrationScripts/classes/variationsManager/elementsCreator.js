import singleElementsCreator from './singleElementsCreator.js';

class elementsCreator extends singleElementsCreator{
	constructor(inputSizes, saidaServer){
		super(saidaServer);
		this.inputSizes 	= inputSizes;
		this.inputsCores 	= [];
		this.selectsCores	= [];
		this.selectsSizes 	= [];		
	}
	testEverything(sizesStr){
		let retorno = true		
		if(this.inputsCores.length == 0){
				this.mostraProUsuario("voce é fraco, lhe falta cores")
				retorno =  false
		}
		
		if(sizesStr == ""){			
			retorno = false
		}					
		return retorno
	}	
	refreshColorsOptions(){		
		
		this.selectsCores.forEach((cada) => {
			cada = this.cleanSelectChilds(cada);
							
			this.inputsCores.forEach((cor) => {
				let option = document.createElement('option');
				option.value = cor.value;
				option.innerText = cor.value;
				option.style.backgroundColor = cor.value;
				cada.append(option);
			});
		});		
	}		
	refreshSizesOptions(sizesStr){
		try{
			this.selectsSizes.forEach((cada)=>{
				let tamanhos = this.createSizeOptions(sizesStr);
				if(!tamanhos) throw 0
					cada = this.cleanSelectChilds(cada);
					tamanhos.forEach((opt) => {
						cada.append(opt);
					});				
			});
		}catch(e){
			if(e instanceof TypeError || e == 0) this.mostraProUsuario("dnv")
		}
	}	
	
	generateSizeSelect(){
		let sizesStr = this.inputSizes.value.trim();				
		let test = this.testEverything(sizesStr);		
		if(test){
			let selectForSizes = document.createElement('select');			
			this.selectsSizes.push(selectForSizes);		
			this.refreshSizesOptions(sizesStr);
			
			return selectForSizes;
		}
		return false;
	}
	generateColorInput(){
		let divColor = document.createElement('div');
				
		let divImgsColors = document.createElement('div')
			divImgsColors.style.width = "25px";
			divImgsColors.style.height = "25px";
			divImgsColors.className = 'divPicsSpecificColors';		
			divImgsColors.ondragover = (ele) => {
				ele.preventDefault();	
			};
			divImgsColors.ondrop = (ele) => {
				ele.preventDefault();
				let data = ele.dataTransfer.getData("text");
				ele.target.appendChild(document.getElementById(data));
			};								
		let colorInput = document.createElement('input');
			colorInput.className = "cores";
			colorInput.type = "color";
			colorInput.onchange = () => this.refreshColorsOptions()
		
		divColor.append(colorInput, divImgsColors)		
		this.inputsCores.push(colorInput);
		this.refreshColorsOptions();
		return divColor;
	}
	generateColorsOptions(){
	
		let selectForColors = document.createElement('select');		
		selectForColors.className = "selectsForColors";
		selectForColors.onchange = (e) => {			
			e.target.style.backgroundColor = e.target.options[e.target.selectedIndex].style.backgroundColor;			
			//-------------------------------------------------------------------------------------------------------------------------
		};
		this.selectsCores.push(selectForColors);		
		this.refreshColorsOptions();
		
		return selectForColors;		
	}
}

export default elementsCreator;
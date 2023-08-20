import elementsCreator from './elementsCreator.js'

class variationsManager extends elementsCreator{
	constructor(divPai, tamanhos, saidaServer){					
		super(tamanhos, saidaServer);
		this.rows = [];
		this.rowAtual = 0;
		this.divPai 		= divPai;		
		this.inputTamanhos	= tamanhos		
	}
	setInputs(btnDefVariacao, maisUmaCor,menosUmaCor, divInputsCores){
		this.btnDefVariacao 	= btnDefVariacao
		this.maisUmaCor 		= maisUmaCor
		this.menosUmaCor 		= menosUmaCor
		this.divPaiInputsCores 	= divInputsCores
		
		this.setEventListeners();
	}	
	
	setEventListeners(){
		this.btnDefVariacao.onclick = () => {												
			this.newVariation()			
		}
		
		this.maisUmaCor.onclick = () => {
			let inputColor = this.generateColorInput();
			this.divPaiInputsCores.append(inputColor);
			if(this.inputsCores.length != 0) this.refreshColorsOptions()
		}
		
		this.menosUmaCor.onclick = () => {
			try{
				if(this.inputsCores.length == 0) throw 0
				
				this.divPaiInputsCores.removeChild(this.divPaiInputsCores.firstChild);
				this.inputsCores.shift();
				this.refreshColorsOptions()								
				
			}catch(e){
				if(e == 0) this.mostraProUsuario("cria pelo menos uma cor pra excluir")				
			}
		}
		let intervalo = null
		this.inputSizes.oninput = () => {
			clearTimeout(intervalo)
			
			intervalo = setTimeout(() => {
				let sizesStr = this.inputSizes.value.trim();				
				let test = this.testEverything(sizesStr)
				if(test) this.refreshSizesOptions()
			},1250)
		}
	}
	variationDataSlot(){		
		let row = []
		for(let x = 0;x != 5;x++) row.push( document.createElement('td'));

		try{
			let sizeSelect 		= this.generateSizeSelect();
			let colorOptions 	= this.generateColorsOptions();			
			let inputPriceInput = this.generatePriceInput();
			let qtdInput 		= this.createQtdInput();
			let rmvVarBtn 		= this.createVarsRmvBtn();
			
			if(sizeSelect && colorOptions && inputPriceInput && qtdInput && rmvVarBtn){				
				row[0].append(inputPriceInput);
				row[1].append(colorOptions);
				row[2].append(sizeSelect);
				row[3].append(qtdInput);
				row[4].append(rmvVarBtn);
				
				return row;
			}
			throw 0
		}catch(e){			
			if(e == 0){
				this.mostraProUsuario("você é fraco, lhe falta dados");							
			}			
			return false
		}
	}
	newVariation(){
		
		this.rows[this.rowAtual] = document.createElement('tr')
		this.rows[this.rowAtual].className = "linhas";
		
		let elmnts = this.variationDataSlot();
		if(elmnts){
			elmnts.forEach((cada) => this.rows[this.rowAtual].append(cada));			
			this.divPai.append(this.rows[this.rowAtual])
			this.rowAtual++		
		}
	}	
}

export default variationsManager;
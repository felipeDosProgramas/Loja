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
				this.divPaiInputsCores.removeChild(this.divPaiInputsCores.firstChild);
				this.inputsCores.shift();
				this.refreshColorsOptions()
			}catch(e){
				this.mostraProUsuario("cria pelo menos uma cor pra excluir")
			}
		}
	}
	variationDataSlot(){		
		let row = {}
			row.colorInput	= document.createElement('td');
			row.sizeInput 	= document.createElement('td');
			row.priceInput 	= document.createElement('td');
			row.qtdInput 	= document.createElement('td');
		
		try{
			let sizeSelect 		= this.generateSizeSelect();
			let colorOptions 	= this.generateColorsOptions();			
			let inputPriceInput = this.generatePriceInput();
			let qtdInput 		= this.createQtdInput();
			
			if(sizeSelect && colorOptions && inputPriceInput && qtdInput){
				row.priceInput.append(inputPriceInput);
				row.colorInput.append(colorOptions);
				row.sizeInput.append(sizeSelect);
				row.qtdInput.append(qtdInput);
				
				return row;
			}
			throw 0
		}catch(e){
			console.log(e)			
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
			this.rows[this.rowAtual].append(elmnts.colorInput, elmnts.sizeInput, elmnts.priceInput, elmnts.qtdInput);
			this.divPai.append(this.rows[this.rowAtual])
			this.rowAtual++		
		}
	}	
}

export default variationsManager;
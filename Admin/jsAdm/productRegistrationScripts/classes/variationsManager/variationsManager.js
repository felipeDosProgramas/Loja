import elementsCreator from './elementsCreator.js'

class variationsManager extends elementsCreator{
	constructor(divPai, tamanhos){					
		super(tamanhos);
		this.divPai = divPai;
		this.rows = [];
		this.inputTamanhos = tamanhos
		this.rowAtual = 0;
	}
	setInputs(btnDefVariacao, maisUmaCor,menosUmaCor, divInputsCores){
		this.btnDefVariacao = btnDefVariacao
		this.maisUmaCor = maisUmaCor
		this.menosUmaCor = menosUmaCor
		this.divPaiInputsCores = divInputsCores
		
		
		
		
		this.setEventListeners();
	}
	mostraProUsuario(oque){
		this.saidaServer.innerHTML = oque;
		setTimeout(()=>{
			this.saidaServer.innerHTML = "";
		}, 1000)		
	}	
	setOutputs(saidaServer){
		this.saidaServer = saidaServer
	}
	
	setEventListeners(){
		this.btnDefVariacao.onclick = () => {												
			this.newVariation()			
		}
		
		this.maisUmaCor.onclick = () => {
			let inputColor = this.generateColorInput();
			this.divPaiInputsCores.append(inputColor)
		}
		
		this.menosUmaCor.onclick = () => {
			try{
				this.divPaiInputsCores.firstChild.remove()
			}catch(e){
				this.mostraProUsuario("cria pelo menos uma cor pra excluir")
			}
		}
	}
	variationDataSlot(){		
		let row = {}
		row.colorInput = document.createElement('td')
		row.sizeInput = document.createElement('td')
		row.priceInput = document.createElement('td')
		
		let colorOptions = this.generateColorsOptions()
		let sizeSelect = this.generateSizeSelect()
		let inputPriceInput = this.generatePriceInput()
		
		row.priceInput.append(inputPriceInput)
		row.colorInput.append(colorOptions)
		row.sizeInput.append(sizeSelect)
		
		return row;
	}
	newVariation(){
		
		this.rows[this.rowAtual] = document.createElement('tr')
		this.rows[this.rowAtual].className = "linhas";
		
		let elmnts = this.variationDataSlot();
		
		this.rows[this.rowAtual].append(elmnts.colorInput, elmnts.sizeInput, elmnts.priceInput);
		this.divPai.append(this.rows[this.rowAtual])
		this.rowAtual++
		
		
	}	
}

export default variationsManager;
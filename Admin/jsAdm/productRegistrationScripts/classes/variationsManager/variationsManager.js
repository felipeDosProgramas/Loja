import elementsCreator from './elementsCreator.js'

class variationsManager extends elementsCreator{
	constructor(divPai, tamanhos, saidaServer, inputAddFotos){
		super(tamanhos, saidaServer);
		this.divPai 		= divPai;
		this.inputTamanhos	= tamanhos;
		this.inputAddFotos	= inputAddFotos;

		this.rows 			= [];
		this.rowAtual 		= 0;
		this.tdsMsmPreco	= false
	}
	getPuttedPicsInEachColor(){
		let aux = 0;
		let pics = [];

		this.inputsCores.forEach((input)=>{
			pics[aux] = {
				cor:input.value,
				imgs:[]
			}
			let div = input.nextSibling;
				div = div.childNodes
			for(let x = 0;x != div.length; x++){
				pics[aux].imgs.push(div[x].id)
			}
			aux++
		})

		return pics;
	}
	setInputs(btnDefVariacao, maisUmaCor,menosUmaCor, divInputsCores, checkMsmPrcoTdsVars, slotInptPrecoTdsVars){
		this.btnDefVariacao 		= btnDefVariacao;
		this.maisUmaCor 			= maisUmaCor;
		this.menosUmaCor 			= menosUmaCor;
		this.divPaiInputsCores 		= divInputsCores;
		this.checkMsmPrcoTdsVars	= checkMsmPrcoTdsVars;
		this.slotInptPrecoTdsVars	= slotInptPrecoTdsVars

	}
	setOutputs(selectedPreviewPictures){
		this.selectedPictures = selectedPreviewPictures;

		this.setEventListeners();
	}
	setEventListeners(){
		this.btnDefVariacao.onclick = () => {
			this.newVariation()
		}
	//----------------------------------------------------------------------
		this.maisUmaCor.onclick = () => {
			let inputColor = this.generateColorInput();
			this.divPaiInputsCores.append(inputColor);
			if(this.inputsCores.length != 0) this.refreshColorsOptions()
		}
	//----------------------------------------------------------------------
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
	//----------------------------------------------------------------------
		let intervalo = null
		this.inputSizes.oninput = () => {
			clearTimeout(intervalo)

			intervalo = setTimeout(() => {
				let sizesStr = this.inputSizes.value.trim();
				let test = this.testEverything(sizesStr);
				if(test) this.refreshSizesOptions();
			},1250)
		}
	//----------------------------------------------------------------------
		this.checkMsmPrcoTdsVars.addEventListener('click', (e) => {
			if(e.target.checked){
				this.tdsMsmPreco = true;

				let input = this.generatePriceInput();
					input.placeholder = "Preço todas Variações";
					input.oninput = (e) => {
						this.mudaTdsPrecos(this.rows, e.target.value)
					}
				this.slotInptPrecoTdsVars.appendChild(input);
				return
			}
			this.tdsMsmPreco = false;
			this.slotInptPrecoTdsVars.removeChild(this.slotInptPrecoTdsVars.firstChild);
		})

		this.inputAddFotos.addEventListener('change',(e) => {
			let files = e.target.files
			let aux = -1			
			this.cleanSelectChilds(this.selectedPictures)
			
			while(files[++aux]){
				(() => {
					let leitor = new FileReader();
					
					leitor.onload = () => {
						let img = document.createElement('img')
							img.src 		= leitor.result;
							img.id			= `b${aux}`
							img.style.width	= '5vw';
							img.draggable 	= true;			
							img.ondragstart	= (ev)=> {
								ev.dataTransfer.setData("text", ev.target.id);				
							}
						this.selectedPictures.append(img)
					}
					leitor.readAsDataURL(files[aux])
				})()
			}
		})
	}
	variationDataSlot(){
		try{
			let row = []

			for(let x = 0;x != 5;x++) row.push( document.createElement('td') );

			let sizeSelect 		= this.generateSizeSelect	();
			let colorOptions 	= this.generateColorsOptions();
			let inputPriceInput = this.generatePriceInput	();
			let qtdInput 		= this.createQtdInput		();
			let rmvVarBtn 		= this.createVarsRmvBtn		();

			if(sizeSelect && colorOptions && inputPriceInput && qtdInput && rmvVarBtn){

				row[0].append(inputPriceInput);
				row[1].append(colorOptions);
				row[2].append(sizeSelect);
				row[3].append(qtdInput);
				row[4].append(rmvVarBtn);

				return row;
			}
			throw 0;
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
			this.inputsNoDom.push(elmnts)
			elmnts.forEach((cada) => this.rows[this.rowAtual].append(cada));
			this.divPai.append(this.rows[this.rowAtual])
			this.rowAtual++

			if(this.rows.length != 0 && this.tdsMsmPreco) this.mudaTdsPrecos(this.rows, this.slotInptPrecoTdsVars.firstChild.value)
		}
	}
}

export default variationsManager;
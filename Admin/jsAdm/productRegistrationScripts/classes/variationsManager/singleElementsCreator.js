class singleElementsCreator{
	constructor(saidaServer){
		this.saidaServer = saidaServer;		
	}
	mostraProUsuario(oque){
		this.saidaServer.innerHTML = oque;
		setTimeout(()=>{
			this.saidaServer.innerHTML = "";
		}, 1000)		
	}	
	createOptions(wit){
		let opts = []
		wit.forEach((cada) => {
			let option = document.createElement('option')
			option.innerText = cada
			option.value = cada
			
			opts.push(option)
		})		
		return opts
	}
	createVarsRmvBtn(){
		let btn = document.createElement('button')
			btn.innerText = "X"
			btn.className = "btnRmvVar"
			btn.onclick = (e) => {
				let linha = e.target.parentNode.parentNode
				linha.parentNode.removeChild(linha)
				//segredos
			}
		return btn
	}
	createQtdInput(){
		let input = document.createElement('input');
			input.type = "number";
			input.placeholder = "Qtd";
			input.min = 0;
			input.required = true;
		
		return input
	}
	cleanSelectChilds(select){
		while(select.firstChild){
			select.firstChild.remove()
		}
		return select
	}	
	createSizeOptions(stringWithSizes){		
		let tamanhos = stringWithSizes.split(',') 
		tamanhos.forEach((cada, um) => {
			if(cada != ''){
				tamanhos[um] = cada.trim()
				return
			}
			tamanhos.splice(um, 1)
		})
		
		tamanhos = this.createOptions(tamanhos)
		
		return tamanhos
	}
	createFileInputForSpecificColor(){
		let input = document.createElement('input');
			input.type = 'file';
			input.required = true;
			input.multiple = true;
		return input
	}

	createOptionAddPicsOrNot(){
		let checkBox = document.createElement('input');
			checkBox.type = 'checkbox';
			checkBox.onclick = (e) => {
				if(e.target.checked){
					e.target.parentNode.append(this.createFileInputForSpecificColor());
					
					
					return
				}
			}
	}
	generatePriceInput(){
		let inputPriceInput = document.createElement('input');
		inputPriceInput.type = "number";
		inputPriceInput.min = "0";
		inputPriceInput.placeholder = "Preço dessa variação";
		inputPriceInput.required = true;
		
		return inputPriceInput;
	}		
}

export default singleElementsCreator
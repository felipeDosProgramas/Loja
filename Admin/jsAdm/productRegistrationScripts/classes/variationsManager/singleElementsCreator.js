import appendIntoIt from '../Traits/appendIntoIt.js';

class singleElementsCreator{
	constructor(saidaServer){
		this.saidaServer = saidaServer;	
		this.parsedAppendables;
		this.inptIdFotosRecebidas;
	}	
	mostraProUsuario(oque){
		this.saidaServer.innerHTML = oque;
		setTimeout(()=>{
			this.saidaServer.innerHTML = "";
		}, 1000);
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
				let linha = e.target.parentNode.parentNode;
				linha.parentNode.removeChild(linha);
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
		return input;
	}
	cleanSelectChilds(select){
		while(select.firstChild){
			select.firstChild.remove();
		}
		return select;
	}
	createSizeOptions(stringWithSizes){
		try{
			let tamanhos = stringWithSizes.split(',')
			tamanhos.forEach((cada, um) => {
				if(cada != ''){
					tamanhos[um] = cada.trim();
					return;
				}
				tamanhos.splice(um, 1)
			})
			tamanhos = this.createOptions(tamanhos)

			return tamanhos
		}catch(e){
			if(e instanceof TypeError){
				this.mostraProUsuario('algoDeuErrado');
				return false
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
	generateDivDasImgsDasCores(classeDaDiv){
		let divImgsColors = document.createElement('div')
			divImgsColors.style.width = "25px";
			divImgsColors.style.height = "25px";
			divImgsColors.className = classeDaDiv;
			divImgsColors.ondragover = (ele) => {
				ele.preventDefault();
			};
			divImgsColors.addEventListener('drop', (ele) => {
				ele.preventDefault();
				appendIntoIt(ele);
				/*let data = ele.dataTransfer.getData("text");
				if(ele.target.previousSibling && ele.target.previousSibling.type == 'color'){
					let lugarAnterior = document.getElementById(data);
						lugarAnterior = lugarAnterior.cloneNode(true);
					ele.target.append(lugarAnterior);
					*/
					return;				
				console.log(document.getElementById(data))
				ele.target.parentNode.append(document.getElementById(data));
			});

		return divImgsColors;
	}
	generateInputCor(classDoInput){
		let colorInput = document.createElement('input');
			colorInput.className = classDoInput	;
			colorInput.type = "color";
			colorInput.onchange = () => this.refreshColorsOptions();

			return colorInput;
	}	
}

export default singleElementsCreator
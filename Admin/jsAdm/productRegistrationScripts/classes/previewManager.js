class previewManager{
	constructor(){}
	
	setOutput(selectWithExistingPreviews, nomeDela, dataDela){
		this.select = selectWithExistingPreviews;		
		this.nomePeca = nomeDela;
		this.dataLancPeca = dataDela;
		
		this.select.onchange = () => {
			this.setInOtherInputsPreviewData()
		}
	}
	setInput(btnThereOrNotExistingPreview, checkBoxTemPrev){
		this.temOuNn = btnThereOrNotExistingPreview;
		this.checkBoxTemPrev = checkBoxTemPrev
	}
	createOption(previewName, previewData){
		let data = {
			"nome":previewName,
			"data":previewData
		}		
		let option = document.createElement("option");
		option.value = JSON.stringify(data)	
		option.innerText = previewName		
		this.select.append(option)
	}
	async getPreviewsList(){
		let server = await fetch("sistema-de-previa/phpPrevias/filesHandler.php?action=allDirData")
		let response = await server.text()
		try{
			this.response = JSON.parse(response);			
		}catch(e){
			if(e instanceof SyntaxError) console.log(e.message)
		}
	}
	
	setInOtherInputsPreviewData(){
		let selected =  this.select.options.selectedIndex
		if( selected != 0){
			let qual = JSON.parse(this.select.options[selected].value)
			this.nomePeca.value = qual.nome
			this.dataLancPeca.value = qual.data
		}	
	}
	
	async setPreviewOptions(){
		await this.getPreviewsList();
		this.response.forEach((cada) => {		
			this.createOption(cada.nome, cada.data)
		})
	}
	
	ifGotPreview(){
		this.temOuNn.addEventListener('click', () => {
			this.select.style.display = this.select.style.display != "none" ? "none" : "initial"
			/*this.temOuNn.style.display = "none";
			this.checkBoxTemPrev.style.display = "none";*/
		})		
	}
	
}

export default previewManager
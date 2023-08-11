class previewManager{
	constructor(){		
		this.returnObj = {}
	}
	
	setOutput(selectWithExistingPreviews, nomeDela, dataDela){
		this.select = selectWithExistingPreviews;		
	}
	setInput(btnThereOrNotExistingPreview){
		this.temOuNn = btnThereOrNotExistingPreview;
	}
	createOption(previewName, previewData){
		let data = {
			"nome":previewName,
			"data":previewData
		}
		// console.log(data)
		let option = document.createElement("option");
		option.value = JSON.stringify(data)	
		option.innerText = previewName
		option.addEventListener('click', () => {
			this.setInOtherInputsPreviewData()
		})
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
			this.returnObj.nome = qual.nome
			this.returnObj.data = qual.data
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
		})
	}
	
}

export default previewManager
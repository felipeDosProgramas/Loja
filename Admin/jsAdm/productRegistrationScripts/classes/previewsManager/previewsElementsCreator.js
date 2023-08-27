class previewsElementsCreator{
	constructor(){
		
	}
	clearAllChilds(from){
		while(from.firstChild){
			from.removeChild(from.firstChild)
		}
	}
	createImgSlot(wit){
		let slot = document.createElement('div')
			slot.className = 'divImagePreview'
			
		let image = document.createElement('img');
			image.src = `../${wit}`;
			image.className = 'imgsPreviaSelecionada';
			image.style.width = '5vw'
			
		slot.append(image) 
		
		return slot;
	}
	
	createOption(previewName, previewData){
		let data = {
			"nome":previewName,
			"data":previewData
		}		
		let option = document.createElement("option");
			option.value = JSON.stringify(data)	
			option.innerText = previewName
			
			return option
	}	
	async getPreviewsList(){
		try{
			let server = await fetch("sistema-de-previa/phpPrevias/filesHandler.php?action=allDirData");		
			let response = await server.text();		
		
			return JSON.parse(response);			
		}catch(e){
			if(e instanceof SyntaxError) console.log(e.message)
		}
	}	
}

export default previewsElementsCreator;
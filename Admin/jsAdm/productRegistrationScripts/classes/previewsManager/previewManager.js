import previewsElementsCreator from './previewsElementsCreator.js';

class previewManager extends previewsElementsCreator{
	constructor(){
		super();
		this.imgIdAux = 0;		
	}

	setInput(btnThereOrNotExistingPreview, checkBoxTemPrev, selectedPreviewPictures){
		this.temOuNn 				= btnThereOrNotExistingPreview;
		this.checkBoxTemPrev 		= checkBoxTemPrev;
		this.selectedPreviewPictures= selectedPreviewPictures;		
		
		this.temOuNn.addEventListener('click', () => {
			if(this.select.style.display != "none"){
				this.select.style.display = "none"
				this.nomePeca.value = ""
				this.dataLancPeca.value = ""
				this.clearSelectedPreviewImageSlot();
				
				return;
			}
			this.select.style.display = "initial"
			if(this.select.options.selectedIndex != 0){
				this.setGettedPreviewData()				
			}
		})		
	}
	setGettedPreviewData(){
			this.setInOtherInputsPreviewData();
			this.showSelectedPreviewPictures();
	}		
	setOutput(selectWithExistingPreviews, nomeDela, dataDela){
		this.select 		= selectWithExistingPreviews;
		this.nomePeca 		= nomeDela;
		this.dataLancPeca 	= dataDela;

		this.select.onchange = () => this.setGettedPreviewData()
		this.selectedPreviewPictures.ondragover = (ele) => {
				ele.preventDefault();	
			};
		this.selectedPreviewPictures.ondrop = (ele) => {
				ele.preventDefault();
				let data = ele.dataTransfer.getData("text");
				ele.target.appendChild(document.getElementById(data));
			}
	}
	createOption(previewName, previewData){
		let data = {
			"nome":previewName,
			"data":previewData
		};
		let option = document.createElement("option");
			option.value = JSON.stringify(data);
			option.innerText = previewName;

		this.select.append(option)
	}
	createImgSlot(wit){
		let slot 			= document.createElement('img');
			slot.src 		= `../${wit}`;
			slot.className 	= 'imgsPreviaSelecionada';
			slot.id			= this.imgIdAux++
			slot.style.width= '5vw';
			slot.draggable 	= true;
			slot.appendTo  ="especifico";
			slot.ondragstart= (ev)=> {
				ev.dataTransfer.setData("text", ev.target.id);				
			}
		this.selectedPreviewPictures.append(slot);
	}
	async getPreviewsList(){
		let server = await fetch("sistema-de-previa/phpPrevias/filesHandler.php?action=allDirData");
		let response = await server.text();

		try{
			this.response = JSON.parse(response);
		}catch(e){
			if(e instanceof SyntaxError) console.log(e.message)
		}
	}
	async showSelectedPreviewPictures(){
		let data = await this.getDataSelectedPreview();
		data = JSON.parse(data)
		this.clearSelectedPreviewImageSlot()
		data.imagens.forEach((cada) => {
			this.createImgSlot(cada)
		})
	}
	clearSelectedPreviewImageSlot(){
		while(this.selectedPreviewPictures.firstChild){
			this.selectedPreviewPictures.removeChild(this.selectedPreviewPictures.firstChild)
		}
	}
	async getDataSelectedPreview(){
		let selected =  this.select.options.selectedIndex;
			selected = 	JSON.parse(this.select.options[selected].value);
			selected = this.response.find((cada) => {
				return cada.nome ==  selected.nome && cada.data == selected.data
			});
		let server = await fetch("sistema-de-previa/phpPrevias/filesHandler.php?action=especifico&qual="+selected.raw);
		let response = await server.text();

		return response
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



}

export default previewManager
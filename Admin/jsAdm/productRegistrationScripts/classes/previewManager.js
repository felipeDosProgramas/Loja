import previewsElementsCreator from './previewsElementsCreator.js';

class previewManager extends previewsElementsCreator{
	constructor(){
		super()
		this.imgSlots = [];
		this.response = this.getPreviewsList()
	}
		
	setInput(btnThereOrNotExistingPreview, checkBoxTemPrev, selectedPreviewPictures){
		this.temOuNn 				= btnThereOrNotExistingPreview;
		this.checkBoxTemPrev 		= checkBoxTemPrev;
		this.selectedPreviewPictures= selectedPreviewPictures;			
	}
	setOutput(selectWithExistingPreviews, nomeDela, dataDela){
		this.select 		= selectWithExistingPreviews;		
		this.nomePeca 		= nomeDela;
		this.dataLancPeca 	= dataDela;				
	}
	setEventListeners(){
		this.select.onchange = () => {
			this.setInOtherInputsPreviewData();
			this.showSelectedPreviewPictures();
		}		
		
		this.temOuNn.addEventListener('click', () => {
			if(this.select.style.display != "none"){
				console.log(this.select.style.display)
				this.select.style.display = "none";
				// this.nomePeca.value = this.dataDela.value = "";
				return
			}
			this.select.style.display = "initial";
		})
	}
	
	async showSelectedPreviewPictures(){
		let data = await this.getDataSelectedPreview();
		data = JSON.parse(data)
		this.clearSelectedPreviewImageSlot()
		data.imagens.forEach((cada) => {
			let slot = this.createImgSlot(cada);
			this.selectedPreviewPictures.append(slot);
		})
	}
	clearSelectedPreviewImageSlot(){
		while(this.selectedPreviewPictures.firstChild){
			this.selectedPreviewPictures.removeChild(this.selectedPreviewPictures.firstChild);
		}
	}
	async getDataSelectedPreview(){
		let selected =  this.select.options.selectedIndex;
			selected = 	JSON.parse(this.select.options[selected].value);		
			selected = this.response.find((cada) => {
				return cada.nome ==  selected.nome && cada.data == selected.data;
			});		
		let server = await fetch("sistema-de-previa/phpPrevias/filesHandler.php?action=especifico&qual="+selected.raw);			
		let response = await server.text();
		
		return response;
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
		let option;
		this.response.forEach((cada) => {		
			option = this.createOption(cada.nome, cada.data)
			this.select.append(option)
		})
	}
		
	
}

export default previewManager
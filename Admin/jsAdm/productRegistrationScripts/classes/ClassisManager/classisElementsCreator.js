class classisElementsCreator{
    constructor(){
        this.respostaServer;
    }
    mostraProUsuario(oque){
		this.respostaServer.innerHTML = oque;
		setTimeout(()=>{
			this.respostaServer.innerHTML = "";
		}, 1000)		
	}	
    criaElementOption(cmOq, selected = false, disabled = false, hidden = false){
		let elmnt = document.createElement('option')
		elmnt.selected = selected
		elmnt.disabled = disabled 
		elmnt.hidden = hidden
		elmnt.value = cmOq;
		elmnt.innerText = cmOq;	
		return elmnt;
		//Cria o <option> dentro do <select>
	}
    criaInputNomeClassificao(){
        let inputNomeClassi = document.createElement('input');        
            inputNomeClassi.type = 'text';
    		inputNomeClassi.placeholder = 'Nome da classificação';
            inputNomeClassi.id = 'inputCriadorClassis';	
		
        return inputNomeClassi;
    }
    criaBtn(texto, classe){
        let sendNomeClass = document.createElement('button');
            sendNomeClass.innerText = texto;
            sendNomeClass.className = classe;
            
        return sendNomeClass;
    }
}
export default classisElementsCreator
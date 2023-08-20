class classManager{
	
	constructor(){}
	
	setInput(selectDeSaida, respostaServer){
		this.selectDeSaida 	= selectDeSaida;
		this.respostaServer = respostaServer;			
	}	
	setOutput(divPrincipal, btnCriaClass, btnExcluClass){
		this.criadorClassis = divPrincipal;
		this.btnCriaClass = btnCriaClass;
		this.btnExcluClass = btnExcluClass;
		
		this.setEventListeners();
	}
	
	setEventListeners(){
		this.btnCriaClass.onclick = (e) => {
			this.criaOption();
			
			this.btnExcluClass.style.display 	= "none";
			e.target.style.display 				= "none";	
		}
		this.btnExcluClass.onclick = () => { 			
			this.tiraClassificacao()
		}
	}
	refazBotoesIniciais(){
		this.btnCriaClass.style.display = "initial"
		this.btnExcluClass.style.display = "initial";
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
	removeAllChilds(elementToClean){
		while(elementToClean.firstChild){
			elementToClean.removeChild(elementToClean.firstChild);
		}
	}
	async lerClassis(){
		let resp = await fetch("phpAdm/setGetclassis.php?oq=soLer");
		let resposta = await resp.text();		
		resposta = resposta.split(",");
		
		let auxForElmnts = this.criaElementOption("Classificação", true, true, true)		
		this.removeAllChilds(this.selectDeSaida);
		this.selectDeSaida.append(auxForElmnts);
		
		resposta.forEach((cada)=>{
			if(cada != ""){							
				auxForElmnts = this.criaElementOption(cada)
				this.selectDeSaida.append(auxForElmnts)
			}
		})
		//faz a leitura do arquivo e pra cada item cria uma <option>
	}
	
	mostraProUsuario(oque){
		this.respostaServer.innerHTML = oque;
		setTimeout(()=>{
			this.respostaServer.innerHTML = "";
		}, 1000)		
	}	
	
	async criaClassificacao(doque){	
		let server = await fetch("phpAdm/setGetclassis.php?oq=criaOutro&cmEsse="+doque);
		this.mostraProUsuario("criado com sucesso");
		this.lerClassis();
		this.refazBotoesIniciais();
	}
	async tiraClassificacao(){
		console.log(this)
		let qual = this.selectDeSaida.value;		
		if(qual != "Classificação"){
			let server = await fetch("phpAdm/setGetclassis.php?oq=tiraEsse&esse="+qual);
			this.lerClassis();
			this.mostraProUsuario("excluido com sucesso");
			return;
		}
		this.mostraProUsuario("escolha uma classificação para excluir");
	}
	criaOption(){
		let inputNomeClassi = document.createElement('input');	
		let sendNomeClass = document.createElement('button');
		let cancelNomeClass = document.createElement('button');
		
		inputNomeClassi.type = 'text';
		inputNomeClassi.placeholder = 'Nome da classificação';
		inputNomeClassi.id = 'inputCriadorClassis';	
		
		sendNomeClass.innerText = "enviar";
		cancelNomeClass.innerText = "cancelar";
		
		sendNomeClass.addEventListener('click', ()=>{ // AQUI ADICIONAR OUVINTE QUE CRIA DNV OS BOTOES INICIAIS
			if(inputNomeClassi.value != ""){
				let ele = this.criaElementOption(inputNomeClassi.value);
				this.selectDeSaida.append(ele);		
				this.criaClassificacao(inputNomeClassi.value);
				
				inputNomeClassi.remove();
				sendNomeClass.remove();
				cancelNomeClass.remove();
				
				
				
				return;
			}
			this.mostraProUsuario("insira um nome válido");
		});	
		cancelNomeClass.addEventListener('click', ()=>{
			this.refazBotoesIniciais()
			
			inputNomeClassi.remove();
			sendNomeClass.remove();
			cancelNomeClass.remove();
		});
		this.criadorClassis.append(inputNomeClassi, sendNomeClass, cancelNomeClass);
	}
}

export default classManager;
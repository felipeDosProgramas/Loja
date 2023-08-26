class dataReceiveManager{
	constructor(){
		this.generalData = {}
	}
	
	setInput(nomePeca, dataLancPeca, descriPeca, classePeca, disponiPeca){
		this.nomePeca 	= nomePeca
		this.datLanPeca = dataLancPeca
		this.descriPeca = descriPeca
		this.classePeca = classePeca
		this.dispoPeca	= disponiPeca
	}
	
	getAvailability(){		
		if(disponiPeca.checked) return 1;
		return 0;
	}
	
	getAllData(){
		this.generalData.nome = this.nomePeca.value;
		this.generalData.descricao = this.descriPeca.value;
		this.generalData.classificacao = this.classePeca.value;
		this.generalData.disponibilidade = this.getAvailability();
		// this.generalData.
	}
	async sendReceivedData(){		
		let dados = JSON.stringify(this.generalData);			
		let formData = new FormData();		
		formData.append('dados', dados);	
		
		let promessa = new Promise((resolve) => {
			let req = new XMLHttpRequest();
			req.open("POST","phpAdm/backCadastroProduto.php");
			req.onload = () => {resolve(req.responseText)};
			req.send(formData);
		});	
		
		let exemp = await promessa	
		if(exemp == "foiCertin"){			
			//mostrar que foi sem erros
			return;
		}
		//mostrar que deu algo errado
	}
}

export default dataReceiveManager
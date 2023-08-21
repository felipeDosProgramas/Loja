class dataReceiveManager{
	constructor(){
		this.generalData = {}
	}
	
	setInput(nomePeca, dataLancPeca, descriPeca, classePeca, disponiPeca, qtdsPecas){
	this.nomePeca 	= nomePeca
	this.datLanPeca = dataLancPeca
	this.descriPeca = descriPeca
	this.classePeca = classePeca
	this.dispoPeca	= disponiPeca
	this.qtdsPecas 	= qtdsPecas
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
	async sendAllData(){
	
	}
}
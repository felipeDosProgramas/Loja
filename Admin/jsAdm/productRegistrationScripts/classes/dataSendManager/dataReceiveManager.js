class dataReceiveManager{
	constructor(submit){
		this.submit		 = submit
		this.generalData = {}
	}
	setClassToGetDomThings(classDele){
		this.classDele = classDele
	}
	getAllVariations(){
		let vars = this.classDele.getInputsDoDom();
		let aux = 0;
		
		this.generalData.variations = []		
		vars.forEach((cadaLinha) => {
			this.generalData.variations[aux] = []
			cadaLinha.forEach((cadaTd) => {
				this.generalData.variations[aux].push(cadaTd.firstChild.value)				
			})
		})
		console.log(this.generalData)
	}
	setInput(nomePeca, dataLancPeca, descriPeca, classePeca, disponiPeca){
		this.nomePeca 	= nomePeca;
		this.datLanPeca = dataLancPeca;
		this.descriPeca = descriPeca;
		this.classePeca = classePeca;
		this.dispoPeca	= disponiPeca;
		
		this.submit.onclick = () => {
			this.getAllData();
			this.sendReceivedData();
		}
	}
	
	getAvailability(){		
		if(this.dispoPeca.checked) return 1;
		return 0;
	}
	
	getAllData(){
		this.getAllVariations();
		
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

export default dataReceiveManager;
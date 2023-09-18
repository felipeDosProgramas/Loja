class dataReceiveManager{
	constructor(submit, btnLancHj){
		this.submit			= submit;
		this.btnLancHj		= btnLancHj;

		this.generalData	= {};
	}
	setClassToGetDomThings(classDele){
		this.classDele = classDele
	}
	parsePicsIds(){
		let src = [];
		let aux;
		let picInEachColor = this.classDele.getPuttedPicsInEachColor();
		picInEachColor.forEach((cada)=>{
			src = [];
			cada.imgs.forEach((id) => {
				aux = document.getElementById(id);
				aux = aux.src;
				aux = aux.split('Admin');				
				aux = aux[1].replace(/%20/g, ' ');
				src.push(aux);
			})
			cada.imgs = src.length != 0 ? src : 0;
		});
		this.generalData.picsAndColors = picInEachColor;
	}
	getAllVariations(){
		let vars= this.classDele.getInputsDoDom();
		let pics= this.parsePicsIds();
		let aux	= 0;
		this.generalData.variations = [];
		
		vars.forEach((cadaLinha) => {
			this.generalData.variations[aux] = {}
			this.generalData.variations[aux].preco = 	cadaLinha[0].firstChild.value;
			this.generalData.variations[aux].cor = 		cadaLinha[1].firstChild.value;
			this.generalData.variations[aux].tamanho = 	cadaLinha[2].firstChild.value;
			this.generalData.variations[aux].quantidade=cadaLinha[3].firstChild.value;

			aux++
		})
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
		this.btnLancHj.onclick = () => {
			let hj = new Date();
			
			let mes = `${hj.getMonth() + 1}`;
				mes = mes.length != 2 ? "0"+mes : mes

			let dia = `${hj.getDate()}`;
				dia = dia.length != 2 ? "0"+dia : dia

			//não remova os dois pontos ( : ) do operador ternário ou irá dar erro de sintaxe :)
			this.datLanPeca.value = `${hj.getFullYear()}-${mes}-${dia}`
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
		this.generalData.classificacao = this.classePeca.value != "Classificação" ? this.classePeca.value : 0;
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
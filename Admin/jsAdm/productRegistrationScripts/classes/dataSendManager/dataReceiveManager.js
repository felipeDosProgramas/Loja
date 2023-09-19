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
		let picsInEachColor = [], picInColor, pics;
		let picsNamesAndIds = this.classDele.inptIdFotosRecebidas.value.trim();
		if(picsNamesAndIds != ''){
			picsNamesAndIds = JSON.parse(picsNamesAndIds);
			let linhas = this.classDele.divPaiInputsCores.childNodes
			console.log(linhas)
			for(let aux = 0;aux != linhas.length; aux++){				
				pics = linhas[aux].lastChild.childNodes;
				
				picInColor = {
					cor:linhas[aux].firstChild.value,
					picsIds:[]
				}

				for(let pic = 0;pic != pics.length;pic++){
					picInColor.picsIds.push(pics[pic].id);
				}
				picsInEachColor.push(picInColor)
			}
			this.generalData.picsAndColors = picsInEachColor;
			this.generalData.picsIds = picsNamesAndIds;
		}
	}
	parseGeneralPics(){
		let pics = this.classDele.generalPictures.childNodes, pictures = [];
		
		for(let x = 0;x != pics.length;x++) pictures[x] = pics[x].id;
		
		this.generalData.generalPics = pics;
	}
	getAllVariations(){
		let vars = document.getElementsByClassName('linhas'), varChild;
		this.generalData.variations = [];
		for(let aux	= 0;aux != vars.length; aux++){
			varChild = vars[aux].childNodes;
			this.generalData.variations[aux] 			= {}
			this.generalData.variations[aux].preco 		= varChild[0].firstChild.value;
			this.generalData.variations[aux].cor 		= varChild[1].firstChild.value;
			this.generalData.variations[aux].tamanho 	= varChild[2].firstChild.value;
			this.generalData.variations[aux].quantidade	= varChild[3].firstChild.value;
		}
	}
	setInput(nomePeca, dataLancPeca, descriPeca, classePeca, disponiPeca){
		this.nomePeca 	= nomePeca;
		this.datLanPeca = dataLancPeca;
		this.descriPeca = descriPeca;
		this.classePeca = classePeca;
		this.dispoPeca	= disponiPeca;

		this.submit.onclick = () => {
			this.parsePicsIds();
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
	getAllData(){
		this.getAllVariations();
		this.parseGeneralPics();
		
		this.generalData.nome = this.nomePeca.value;
		this.generalData.dataLancamento = this.datLanPeca.value;
		this.generalData.descricao = this.descriPeca.value;
		this.generalData.classificacao = this.classePeca.value != "Classificação" ? this.classePeca.value : 0;
		this.generalData.disponibilidade = this.dispoPeca.checked ? 1 : 0
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
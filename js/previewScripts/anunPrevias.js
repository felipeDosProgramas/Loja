
class showPrevias{

    constructor(){
		this.container = document.getElementById("containerCardLancamento");
		this.x = 0;
	}
    criaElemento(nome, classe, texto = false){
        let elemento = document.createElement(nome);
            elemento.className = classe;
            if(texto) elemento.innerText = texto;
        return elemento;
    }
    organizaData(data){
   		data = data.split('-');
		data = data.reverse();
        
        return `${data[0]}/${data[1]}/${data[2]}`
    }
    setEstruCard(ImageLink, nome, data, ProLink){
		let LinkSlot 	= this.criaElemento("a",    "linkPraPoi");
		let CardDivSlot = this.criaElemento("div",  "cardsLanca");
		let ImgSlot 	= this.criaElemento("div",  "divImgsLanca");
		let DateSlot 	= this.criaElemento("div",  "cardDateLanca", this.organizaData(data));
		let Image 		= this.criaElemento("img",  "imgsCardsLanca");

		Image.src = ImageLink
		LinkSlot.href=  ProLink;

		ImgSlot.append(Image);
		CardDivSlot.append(
            ImgSlot,
            this.criaElemento("div",  "nomeCardsLanca", nome),
            DateSlot
        );
		LinkSlot.append(CardDivSlot);
		this.container.append(LinkSlot);
	}

    showHow(coisa){
		let soDatas = [];
		let nomes = [];
		let caminhos = [];

		coisa.forEach((iten) => {
			this.setEstruCard(
				iten.rota,
				iten.nome,
				iten.data,
                'pagePrevia.php?q='+iten.raw
			);
			this.x++;
		});

	}
}
var show = new showPrevias();

async function consulta (){
    let promessa = new Promise((resolve) => {
        let req = new XMLHttpRequest();
        req.open("GET","Admin/sistema-de-previa/phpPrevias/filesHandler.php?action=returnAll");
		req.onload = () => {resolve(req.responseText)};
        req.send();
	});
	let exemp = await promessa
	exemp = JSON.parse(exemp);
	show.showHow(exemp);
}


consulta();



// var divPrin = document.getElementById('containerCardLancamento');

class showPrevias{
	
    constructor(){
		this.container = document.getElementById("containerCardLancamento");
		this.x = 0;
	}
    setEstruCard(ImageLink, nome, data, ProLink){
		let LinkSlot 	= document.createElement("a");
		let CardDivSlot = document.createElement("div");
		let ImgSlot 	= document.createElement("div");
		let NameSlot 	= document.createElement("div");
		let DateSlot 	= document.createElement("div");
		let Image 		= document.createElement("img");
		
		Image.setAttribute("class","imgsCardsLanca");
		LinkSlot.setAttribute("class","linkPraPoi");
		CardDivSlot.setAttribute("class","cardsLanca");
		ImgSlot.setAttribute("class","divImgsLanca");
		NameSlot.setAttribute("class","nomeCardsLanca");
		DateSlot.setAttribute("class","cardDateLanca");
		
		data = data.split('-');
		data = data.reverse();
		
		NameSlot.innerText = nome; 
		DateSlot.innerText = `${data[0]}/${data[1]}/${data[2]}`;
		Image.src = ImageLink
		LinkSlot.href=  ProLink;
		
		ImgSlot.append(Image);
		CardDivSlot.append(ImgSlot,NameSlot,DateSlot);		
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



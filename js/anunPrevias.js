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
		
		NameSlot.innerText = nome; 
		DateSlot.innerText = data;
		Image.setAttribute("src","Admin/arquivos/"+ImageLink);
		LinkSlot.setAttribute("href", ProLink);
		
		ImgSlot.append(Image);
		CardDivSlot.append(ImgSlot,NameSlot,DateSlot);		
		LinkSlot.append(CardDivSlot);
		this.container.append(LinkSlot);
	}
	
    showHow(coisa){
		let Dataslan = [];
		let soDatas = [];
		let prosLink = [];
		coisa.forEach((cada)=>{prosLink.push(cada[0].split("/"))});
		
		
		coisa.forEach((iten) => {Dataslan.push(iten[0].split("!-!"))});
		Dataslan.forEach((iten) => {this.setEstruCard(coisa[this.x][0], Dataslan[this.x][1], Dataslan[this.x][2], 'pagePrevia.php?q='+prosLink[this.x][2] );this.x++;})
	}
}
var show = new showPrevias();

async function consulta (){   
    let promessa = new Promise((resolve) => {
        let req = new XMLHttpRequest();
        req.open("GET","Admin/sistema-de-previa/filesHandler.php?q=");
        req.onload = () => {resolve(req.responseText)};
        req.send();
	});	
	let exemp = await promessa	
	exemp = JSON.parse(exemp);	
	show.showHow(exemp);
}


consulta();



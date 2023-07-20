let container = document.getElementById("them");
const padroes = /[!]|[-]/;

class queryHandler{
	constructor(){
		this.x = 0;
		this.y = 0;
		
		this.elmnts = [];
		this.sec = container.parentNode;
	}
	
	setEstruPrev(ImgsRoutes, Name, linkPraEdit){
		let card = document.createElement("div")
		let nameSlot = document.createElement("div")
		let imageSlot = document.createElement("div")
		let btnSlot = document.createElement("div")
		let editBtn = document.createElement("button")
		let linkEditBtn = document.createElement("a")
		let images = [];
		
		ImgsRoutes.forEach(() => {			
			images.push(document.createElement("img"))
		})
		
		images.forEach((imagi) => {
			imagi.setAttribute("class","imgsConsul")
			imagi.setAttribute("alt", ImgsRoutes[this.y])
			imagi.setAttribute("src", ImgsRoutes[this.y++])
			
		})
		this.y = 0;
		
		
		card.className = "cardsConsul";
		nameSlot.className = "nameConsul";
		imageSlot.className = "divImgConsul";
		btnSlot.className = "btnDivConsul";
		editBtn.className = "btnConsul";		
		
		
		linkEditBtn.href = "editPrev.php?qual=" + linkPraEdit;
		
		
		editBtn.innerHTML = "<img src='../../imgs/edit.png'>";
		nameSlot.innerText = Name;
		
		linkEditBtn.append(editBtn)
		btnSlot.append(linkEditBtn);
		
		images.forEach((cada)=>{
			imageSlot.append(cada)
		})
		images.forEach((cadaBtn)=>{
			imageSlot.append(cadaBtn)
		}),
		
		card.append(nameSlot, imageSlot, btnSlot);
		this.elmnts.push(card);		
		
	}
	
	putInScreen(){
		
		this.sec.removeChild(container)	
		
		container = document.createElement('div');
		container.setAttribute("id", 'them')		
		this.sec.append(container)
		
		this.elmnts.forEach((cada) => {
			container.append(cada)
		})
		
	}
	
	
}

async function consulta (){   
	if(busca.value != ""){
		let promessa = new Promise((resolve) => {
			let req = new XMLHttpRequest();
			req.open("GET","phpPrevias/filesHandler.php?q="+busca.value);
			req.onload = () => {resolve(req.responseText)};
			req.send();
		});	
		
		let exemp = await promessa	
		let Dataslan = [];		
		query.elmnts = []
		let oLinkPraEdita;
		exemp = JSON.parse(exemp);			
		// console.log("o servidor retornou: \n"+exemp)
		
		if(Array.isArray(exemp)){		
			console.log(exemp)
			exemp.forEach((iten) 	=> {Dataslan.push(iten[0].split("!-!"))})			
			console.log(Dataslan)
			for(query.x = 0;query.x != Dataslan.length;query.x++){						
				oLinkPraEdita = "!-!"+Dataslan[query.x][1]+"!-!"+Dataslan[query.x][2]+"!-!";
				console.log(oLinkPraEdita)
				query.setEstruPrev(exemp[query.x], Dataslan[query.x][1],oLinkPraEdita);			
			}		
			// console.groupEnd()
			query.putInScreen()
		}
		else{
			console.log("nn foi");
		}
		}else{
		container.remove();
		container = document.createElement('div');
		container.setAttribute("id", 'them')		
		query.sec.append(container)
	}
}
//---------------------------------------------------------------------------
let busca = document.getElementById('buscPrevia'),
query = new queryHandler(),
cronometro1 = null;

busca.addEventListener('input', () => {
	clearTimeout(cronometro1);
	console.clear()
	
	cronometro1 = setTimeout(() =>{
		if(!padroes.test(busca.value)){
			consulta();	
			console.log("consultou")
		}
	}, 500)
})						
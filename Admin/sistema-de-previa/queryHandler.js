let container = document.getElementById("them");
const padroes = /[!]|[-]/;

class queryHandler{
	constructor(){
		this.x = 0;
		this.y = 0;
		
		this.elmnts = [];
		this.sec = container.parentNode;
	}
	
	setEstruPrev(ImgsRoutes, Name){
		let card = document.createElement("div")
		let nameSlot = document.createElement("div")
		let imageSlot = document.createElement("div")
		let btnSlot = document.createElement("div")
		let editBtn = document.createElement("button")
		let btnExclu = document.createElement("button")
		let images = [];
		
		ImgsRoutes.forEach(() => {			
			images.push(document.createElement("img"))
		})
		
		images.forEach((imagi) => {
			imagi.setAttribute("class","imgsConsul")
			imagi.setAttribute("alt", ImgsRoutes[this.y])
			imagi.setAttribute("src", "../arquivos/"+ImgsRoutes[this.y++])
			
		})
		this.y = 0;
		
		
		card.setAttribute("class","cardsConsul");
		nameSlot.setAttribute("class", "nameConsul");
		imageSlot.setAttribute("class","divImgConsul");
		btnSlot.setAttribute("class", "btnDivConsul");
		editBtn.setAttribute("class", "btnConsul");
		btnExclu.setAttribute("class", "btnExclu")
		editBtn.innerHTML = "<img src='../../imgs/edit.png'>";
		btnExclu.innerHTML = "<img src='../../imgs/trash-can.png'>"
		nameSlot.innerText = Name;
		
		btnSlot.append(editBtn);
		images.forEach((cada)=>{
			imageSlot.append(cada)
		})
		btnSlot.append(btnExclu);
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
			req.open("GET","filesHandler.php?q="+busca.value);
			req.onload = () => {resolve(req.responseText)};
			req.send();
		});	
		
		let exemp = await promessa	
		let Dataslan = [];
		
		query.elmnts = []
		exemp = JSON.parse(exemp);			
		// console.log("o servidor retornou: \n"+exemp)
		
		if(Array.isArray(exemp)){		
			exemp.forEach((iten) 	=> {Dataslan.push(iten[0].split("!-!"))})
			// console.group("Dataslan")
			// console.log(Dataslan)
			for(query.x = 0;query.x != Dataslan.length;query.x++){						
				// console.log("O X É "+ query.x)
				// console.log(Dataslan[query.x][1])
				// console.log(exemp[query.x])
				query.setEstruPrev(exemp[query.x], Dataslan[query.x][1]);			
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
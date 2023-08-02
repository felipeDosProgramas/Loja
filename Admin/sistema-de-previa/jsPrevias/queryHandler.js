let container = document.getElementById("them");

class queryHandler{
	constructor(){
		this.x = 0;
		
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
		
		
		if(Array.isArray(ImgsRoutes)){									
			let imagi = document.createElement("img")
			imagi.setAttribute("class","imgsConsul")
			imagi.setAttribute("src", ImgsRoutes[0])															
			imageSlot.append(imagi)
		}
		
		
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

export default queryHandler;
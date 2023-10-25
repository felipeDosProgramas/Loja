function appendIntoIt(ev){
		let data = ev.dataTransfer.getData("text");
		let childs = ev.target.childNodes;
		if(ev.target.type == 'img') return
		if(data == ev.target.id) return;
		for(let x = 0;x != childs.length;x++) if(childs[x].id == data) return;
		ev.target.append(document.getElementById(data).cloneNode(true));
}

export default appendIntoIt
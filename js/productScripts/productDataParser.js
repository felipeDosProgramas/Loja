let getDaUrl = window.location.href; (() =>{if(getDaUrl.includes("?")){getDaUrl = getDaUrl.split('?');getDaUrl = getDaUrl[1].split('=');getDaUrl = getDaUrl[1];return;}getDaUrl = "nao tem";})();
let Nome = document.getElementById('nameAnun');
let Preco = document.getElementById('divPreco');
let descricao = document.getElementById('description');
let putInSaco = document.getElementById('btnSaco');
let divTamanhos = document.getElementById('divSize');
let divPreco = document.getElementById('divPreco');
let todosTamanhos = document.getElementsByClassName('sizeBtn');
let divBtnsCores = document.getElementById('divCores');

class putInFront{
	
	constructor(tudo){
		this.tudo = tudo;

		if(this.tudo != "sem dados"){
			sessionStorage.removeItem('imgs');
			
			this.setTextos();
			this.setImagens();
			this.setPrecosETamanhos();
			this.setCores()
			
			
			console.group("tudo destrinchado")
			console.group("tamanhos")
			console.log(this.tudo.Interface.tamanhos)			
			console.groupEnd()
			console.group("cores")
			console.log(this.tudo.Interface.cores)
			console.groupEnd()
			// calma cara voce consegue
			console.group("preco Por Tamanho")
			console.log(this.tudo.precosPorTamanho)
			console.groupEnd()
			console.groupEnd()
		}
	}
	setTextos(){
		Nome.innerHTML = this.tudo.nome;
		descricao.innerHTML = this.tudo.descricao;
	}
	
	setImagens(){
		let fotos = [];
		this.tudo.fotos.forEach((cada)=>{
			fotos.push("imgs/Produtos/"+getDaUrl+"/"+cada);
		});
		
		sessionStorage.setItem('imgs', JSON.stringify(fotos));
	}
	selecionaEsse(qual){
		let qnts = todosTamanhos.length;
		for(let x = 0;x != qnts;x++){
			todosTamanhos[x].className = 'sizeBtn';
		}
		todosTamanhos[qual].className += ' selectedSizeOption';
		divPreco.innerText = `R$ ${this.tudo.precosPorTamanho[qual][1]}`;
	}
	setCores(){
		this.tudo.Interface.cores.forEach((cada)=>{
			let cor = document.createElement('button');
			cor.className = "bah";
			cor.style.backgroundColor = cada;		
			cor.innerText = "apple";			
			divBtnsCores.append(cor)
		})
	}
	setPrecosETamanhos(){
		let sizes = [];
		let aux = 0;				
		divTamanhos.innerText = "";
		
		this.tudo.Interface.tamanhos.forEach((cada)=>{			
			let aq = aux; /* deixe isso aqui dessa maneira, se colocar na variavel aux diretamente, ele recuperará o último valor de aux toda vez que for clicado o botão*/
			let btn = document.createElement('button');
			btn.className = 'sizeBtn';
			btn.addEventListener('click',() => this.selecionaEsse(aq))
			btn.innerText = cada;			
			divTamanhos.append(btn);
			aux++;
		})
		
		todosTamanhos[0].className += ' selectedSizeOption';
		divPreco.innerText = `R$ ${this.tudo.Secundarios[0][3]}`;
	}	
}

(async () => {
	let response = await fetch("purePhp/produtos.php?oq=especifico&qual="+getDaUrl);
	let tudo = await response.text();		
	tudo = JSON.parse(tudo);	
	tudo = new putInFront(tudo);	
})();


putInSaco.addEventListener('click', async ()=>{
	
	let addEle = await fetch("purePhp/TinyCar.php?oq=addSoEsse&qual="+getDaUrl);
	let foiOuNn = await addEle.text();
	console.log(foiOuNn)
})

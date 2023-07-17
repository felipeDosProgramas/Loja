let getDaUrl = window.location.href.split('?');getDaUrl = getDaUrl[1].split('=');getDaUrl = getDaUrl[1];
let Nome = document.getElementById('nameAnun');
let Preco = document.getElementById('divPreco');
let descricao = document.getElementById('description');
let putInSaco = document.getElementById('btnSaco');
let divTamanhos = document.getElementById('divSize');
let divPreco = document.getElementById('divPreco');
let todosTamanhos = document.getElementsByClassName('sizeBtn');
class putInFront{
	
	constructor(tudo){
		this.tudo = tudo;
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
			todosTamanhos[x].className = 'sizeBtn'
		}
		todosTamanhos[qual].className += ' selectedSizeOption'
	}
	setPrecosETamanhos(){
		let sizes = [];
		let aux = 0;				
		divTamanhos.innerText = "";
		this.tudo.Tamanho.forEach((cada)=>{			
			let aq = aux; /* deixe isso aqui dessa maneira, se colocar na variavel aux diretamente, ele recuperará o último valor de aux toda vez que for clicado o botão*/
			let btn = document.createElement('button');
			btn.className = 'sizeBtn';
			btn.addEventListener('click',() => this.selecionaEsse(aq))
			btn.innerText = this.tudo.Tamanho[aq];
			divTamanhos.append(btn);
			aux++;
		})
		
		todosTamanhos[0].className += ' selectedSizeOption'
	}
}

(async () => {
	let response = await fetch("purePhp/produtos.php?oq=especifico&qual="+getDaUrl);
	let tudo = await response.text();		
	console.log(tudo)
	tudo = JSON.parse(tudo);	
	tudo = new putInFront(tudo);
	tudo.setTextos();
	tudo.setImagens();
	tudo.setPrecosETamanhos();
	
})();


putInSaco.addEventListener('click', async ()=>{

let addEle = await fetch("purePhp/TinyCar.php?oq=addSoEsse&qual="+getDaUrl);
let foiOuNn = await addEle.text();
console.log(foiOuNn)
})

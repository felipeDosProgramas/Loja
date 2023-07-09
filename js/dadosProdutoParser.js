let getDaUrl = window.location.href.split('?');
getDaUrl = getDaUrl[1].split('=');
getDaUrl = getDaUrl[1];

let Nome = document.getElementById('nameAnun');
let Preco = document.getElementById('divPreco');
let descricao = document.getElementById('description');
let putInSaco = document.getElementById('btnSaco');

class putInFront{
	
	constructor(tudo){
		this.tudo = tudo;
	}
	setTextos(){
		Nome.innerHTML = this.tudo.nome;
		Preco.innerHTML = this.tudo.preco[0];
		descricao.innerHTML = this.tudo.descricao;
	}
	
	setImagens(){
		let fotos = [];
		this.tudo.fotos.forEach((cada)=>{
		fotos.push("imgs/Produtos/"+getDaUrl+"/"+cada);
		});
		sessionStorage.setItem('imgs', JSON.stringify(fotos));
	}
	
}

(async () => {
	let response = await fetch("purePhp/produtos.php?oq=especifico&qual="+getDaUrl);
	let tudo = await response.text();		
	tudo = JSON.parse(tudo);	
	tudo = new putInFront(tudo);
	tudo.setTextos();
	tudo.setImagens();
	// console.log(tudo)
})();


putInSaco.addEventListener('click', async ()=>{
	
	let addEle = await fetch("purePhp/TinyCar.php?oq=addSoEsse&qual="+getDaUrl);
	let foiOuNn = await addEle.text();
	
	console.log(foiOuNn)
})

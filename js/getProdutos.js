let container = document.getElementById('containerCard');

class toFront{
	constructor(all){
		this.all = 	JSON.parse(all);
		console.log(this.all);
		this.generateThem();
	}
	card(nome, codProduto, preco, linkImg){
		let cardProdA = document.createElement			('a');
		let cardProdDiv = document.createElement		('div');
		let imgContainerProd = document.createElement	('div');
		let imgProd = document.createElement			('img');
		let nomeProd = document.createElement			('div');
		let precoProd = document.createElement			('div');		
		
		cardProdDiv.setAttribute		('class', 'cards');
		imgProd.setAttribute			('class', 'imgsProduto');
		imgContainerProd.setAttribute	('class', 'imgsCards');
		nomeProd.setAttribute			('class', 'nomeProdutoCards');
		precoProd.setAttribute			('class', 'precoCards');
		
		imgProd.src = "imgs/Produtos/"+codProduto+"/"+linkImg;
		imgContainerProd.append(imgProd);
		
		nomeProd.innerHTML = nome;
		precoProd.innerHTML = preco;
		cardProdA.href = "anuncio.html?qual="+codProduto;
		cardProdDiv.append(imgContainerProd, nomeProd, precoProd);
		cardProdA.append(cardProdDiv);
		container.append(cardProdA);
	}
	
	generateThem(){
		let aux = 0;
		this.all.nomes.forEach(() => {
			this.card(this.all.nomes[aux], this.all.codProdutos[aux], this.all.precos[aux], this.all.linksFotos[aux]);
		});
	}
}



(async ()=>{
	let response = await fetch("purePhp/produtos.php?oq=todos");
	let produtos = await response.text();
	
	produtos = new toFront(produtos);
	
})();
/*
	
	<div id="containerCard">
	
	<a href="anuncio.html">
	<div class="cards">
	<div class="imgsCards"><img src="./imgs/casaco.webp" alt="" class="imgsProduto"></div>
	<div class="nomeProdutoCards">Nome do Produto</div>
	<div class="precoCards">Preço</div>
	</div>
	</a>
	</div>	
	
	
*/
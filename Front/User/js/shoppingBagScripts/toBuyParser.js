
(async ()=>{
	let response = await fetch("purePhp/TinyCar.php?oq=tudao");
	let texto = await response.text();	
	let carrinho = JSON.parse(texto);
	console.log(carrinho)
	
})();


//RANDOM_bytes(); ver dps no php
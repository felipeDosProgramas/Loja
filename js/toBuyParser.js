
(async ()=>{
	let response = await fetch("purePhp/TinyCar.php?oq=tudao");
	let texto = await response.text();
	
console.log(texto)
	
	
})();


//RANDOM_bytes(); ver dps no php
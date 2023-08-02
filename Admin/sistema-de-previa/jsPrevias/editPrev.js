let url = location.href;
let get = url.split("?");get = get[1].split("=");get =  get[1].replace("%20", " ");

let inpuNome = document.getElementById('inputEditarNomePrevia')
let inpuDate = document.getElementById('inputDataPrevia')
let divDosBotoes = document.getElementById('botoesControle');
let excluMarcados = document.getElementById('excluMarcados')
let marcaAtualPraExclu = document.getElementById('marcaAtual');
let imgsBanco = document.getElementById("imgsExistentes");
let mudaImg =  document.getElementById("carroselImgsEdit");
let excluPreviaInteira = document.getElementById("excluPreviaInteira");

let imgsPraEditar = [];
let srcImagensProCarrosel = [];
let Dataslan = [];
let exemp;
let number = 0;

function veSeTem(oque, naOnde){
	let retorno = true;
	naOnde.forEach((cada)=>{
		if(oque === cada){
			retorno = false;
		}
	})
	return retorno;
}

function execCarrosel(arrayImg){
	
	let tamanho = arrayImg.length;
	
	mudaImg.src = arrayImg[number];
	
	if(tamanho != 1 || tamanho != 0){
		divDosBotoes.innerHTML = '<button id="btnEsquerda"> anterior </button><button id="btnDireita"> proximo </button>';
		
		let btnDireita = document.getElementById('btnDireita');
		let btnEsquerda = document.getElementById('btnEsquerda');
		
		btnDireita.addEventListener('click', function (e){
			e.preventDefault()
			
			if (arrayImg[++number]){ 
				mudaImg.src = arrayImg[number];
				}else{
				number = 0;
				mudaImg.src = arrayImg[number];
			}			
		})
		
		btnEsquerda.addEventListener('click', function (e){
			e.preventDefault()
			
			if (arrayImg[--number]){ 
				mudaImg.src = arrayImg[number];
				}else{
				number = arrayImg.length - 1
				mudaImg.src = arrayImg[number];
			}
		})		
	}	
}



(async () =>
{
	let promessa = new Promise((resolve) => 
		{
			let req = new XMLHttpRequest();
			req.open("GET","phpPrevias/filesHandler.php?action=especifico&qual="+get);
			req.onload = () => {resolve(req.responseText)};
			req.send();
		});				
		exemp = await promessa;		
		exemp = JSON.parse(exemp)
		console.log(exemp)
		inpuDate.innerText = exemp.data
		inpuNome.innerText = exemp.nome
})()
/*
	marcaAtualPraExclu.addEventListener('click', (e)=>{
	e.preventDefault();
	if(veSeTem(srcImagensProCarrosel[number], imgsPraEditar)){
	imgsPraEditar.push(srcImagensProCarrosel[number])	
	return;
	}
	imgsPraEditar.splice(imgsPraEditar.indexOf(srcImagensProCarrosel[number]), 1);			
	})
	
	excluMarcados.addEventListener('click', async (e)=>{
	e.preventDefault();
	if(imgsPraEditar.length != 0){
	let imgs = JSON.stringify(imgsPraEditar);	
	let server = await fetch("phpPrevias/filesHandler.php?q="+get+"&sendThem="+imgs);
	let resposta = await server.text();
	console.log(resposta)		
	}
	})
	
	excluPreviaInteira.addEventListener('click', async (e) => {
	
	e.preventDefault();	
	let server = await fetch("phpPrevias/filesHandler.php?q="+get+"&excluEsse=true")
	let resposta = await server.text();
	
	try{
	resposta = json.parse(resposta);
	console.log(resposta)
	resposta.forEach((cada)=>{
	if(!cada){
	throw new Error(resposta.indexOf(cada));
	}
	})
	
	}catch(e){
	console.log(e.message)//gerar msg dizendo que deu um erro e que é pra contatar os devs
	}
	
	})
*/


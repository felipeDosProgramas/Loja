let url = location.href;
let get = url.split("?");get = get[1].split("=");get =  get[1].replace("%20", " ");

let inpuNome = document.getElementsByName("nome");
let inpuDate = document.getElementsByName("date");
let divDosBotoes = document.getElementById('botoesControle');
let excluMarcados = document.getElementById('excluMarcados')
let marcaAtualPraExclu = document.getElementById('marcaAtual');
let imgsBanco = document.getElementById("imgsExistentes");
let mudaImg =  document.getElementById("carroselImgsEdit");

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



async function consulta ()       
{
	let promessa = new Promise((resolve) => 
		{
			let req = new XMLHttpRequest();
			req.open("GET","phpPrevias/filesHandler.php?q="+get+"&edt=true");
			req.onload = () => {resolve(req.responseText)};
			req.send();
		});				
		exemp = await promessa;		
		exemp = JSON.parse(exemp);
		if(Array.isArray(exemp)){
			exemp.forEach((cada) => {Dataslan.push(cada.split("!-!"))})			
			inpuNome[0].value = Dataslan[0][1]
			inpuDate[0].value = Dataslan[0][2]						
			exemp.forEach((cada) => {
				srcImagensProCarrosel.push(cada);
			})		
			execCarrosel(srcImagensProCarrosel)
			return;
		}
		Dataslan = exemp.split("!-!");		
		inpuNome[0].value = Dataslan[1]
		inpuDate[0].value = Dataslan[2]					
}

marcaAtualPraExclu.addEventListener('click', (e)=>{
	e.preventDefault();
	if(veSeTem(srcImagensProCarrosel[number], imgsPraEditar)){
		imgsPraEditar.push(srcImagensProCarrosel[number])	
		return;
	}
	imgsPraEditar.splice(imgsPraEditar.indexOf(srcImagensProCarrosel[number]), 1);			
})

excluMarcados.addEventListener('click', async (e)=>{
	e.preventDefault()
	if(imgsPraEditar.length != 0){
		let imgs = JSON.stringify(imgsPraEditar);	
		let server = await fetch("phpPrevias/filesHandler.php?q="+get+"&sendThem="+imgs);
		let resposta = await server.text();
		console.log(resposta)		
	}
})

consulta()

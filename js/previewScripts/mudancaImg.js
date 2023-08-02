let btnDireita = document.getElementById('btnDireita'),
caixaFotoAnuncio = document.getElementById('caixaFotoAnuncio'),
btnEsquerda = document.getElementById('btnEsquerda'),
mudaImg = document.getElementById('mudaImg'),
nomeAnun = document.getElementById('nameAnun'),
datePre = document.getElementById('datePrevia'),
arrayImg,
number = 0

function getLanc(){
    let semi = window.location.href.split('?');
    let gets = [];    
    semi = semi[1].split('&')
    semi.forEach((cada)=>{
        gets.push(cada.split('='));
		
	})
	// console.log(gets)
	return gets[0][1].replace(/%20/g, " ")
}

async function consulta (){   
    
	let promessa = new Promise((resolve) => {
        let req = new XMLHttpRequest();
        req.open("GET","./Admin/sistema-de-previa/phpPrevias/filesHandler.php?action=especifico&qual="+getLanc());
        req.onload = () => {resolve(req.responseText)};
        req.send();
	});	
	
	let exemp = await promessa	
    exemp = JSON.parse(exemp);
	// qtdImgs = exemp.length;
	// console.log(qtdImgs)
	console.log(exemp)
    console.log(exemp.data)
    console.log(datePre)
    datePre.innerText = exemp.data
    nomeAnun.innerText = exemp.nome
    let arrayImgs = exemp.imagens
    arrayImgs.forEach((eleImg)=>{
        mudaImg.src = '../' + eleImg
        console.log(eleImg)		
	})
    
    
    // arrayImg = exemp[0]
    // exemp.forEach((cada)=>{
        // strInt.push(cada.replace('../', 'Admin/'))
	// })    
    // console.log(strInt)
    // arrayImg = strInt
    // strInt.forEach((cada)=>{
        // NomDat = cada.split('!-!');
	// })
	
	
    // console.log(NomDat)
    // mudaImg.src = arrayImg[number]
    // nomeAnun.innerText = NomDat[1]
    // dateLan.innerText = 'Data de lançamento: ' + NomDat[2]
}


consulta()

btnDireita.addEventListener('click', function (){
if (arrayImg[++number]){ 
mudaImg.src = arrayImg[number];
}else{
number = 0;
mudaImg.src = arrayImg[number];
}

})

btnEsquerda.addEventListener('click', function () {
if (arrayImg[--number]){ 
mudaImg.src = arrayImg[number];
}else{
number = arrayImg.length - 1
console.log(arrayImg.length - 1)
mudaImg.src = arrayImg[number];
}
})

function ativeSetas() {
btnDireita.style.visibility = 'visible'
btnEsquerda.style.visibility = 'visible'
}

function desativeSetas() {
btnDireita.style.visibility = 'hidden'
btnEsquerda.style.visibility = 'hidden'
}

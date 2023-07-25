let fotosAnuncio = document.getElementById('fotosAnuncio'),
btnDireita = document.getElementById('btnDireita'),
btnEsquerda = document.getElementById('btnEsquerda'),
mudaImg = document.getElementById('mudaImg'),
nomeAnun = document.getElementById('nameAnun'),
dateLan = document.getElementById('dateLancamento'),
arrayImg,
number = 0,
strInt = [],
NomDat,
qtdImgs;

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
        req.open("GET","./Admin/sistema-de-previa/phpPrevias/filesHandler.php");
		req.setRequestHeader('X-AllPreviews', '0');				
		req.setRequestHeader('X-AllPreviewImages', '1');				
		req.setRequestHeader('X-whichPreview', getLanc());
        req.onload = () => {resolve(req.responseText)};
        req.send();
	});	
	
	let exemp = await promessa	
    exemp = JSON.parse(exemp);
	// qtdImgs = exemp.length;
	// console.log(qtdImgs)
	// console.log(exemp)
	
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

let btnDireita = document.getElementById('btnDireita'),
caixaFotoAnuncio = document.getElementById('caixaFotoAnuncio'),
btnEsquerda = document.getElementById('btnEsquerda'),
mudaImg = document.getElementById('mudaImg'),
nomeAnun = document.getElementById('nameAnun'),
datePre = document.getElementById('datePrevia'),
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
	mudaImg.src = arrayImgs[0]
    /*arrayImgs.forEach((eleImg)=>{
        /*mudaImg.src = eleImg
        console.log(eleImg)		
	})*/
    btnDireita.addEventListener('click', function (){
        if (arrayImgs) {
            if (number < arrayImgs.length - 1) {
                mudaImg.src = arrayImgs[++number];
            } else {
                number = 0;
                mudaImg.src = arrayImgs[number];
            }
            console.log(arrayImgs[number]);
        } else {
            number = 0;
            mudaImg.src = arrayImgs[number];
        }
    })
        
    btnEsquerda.addEventListener('click', function () {
        if (arrayImgs) {
            if (number > 0) {
                mudaImg.src = arrayImgs[--number];
            } else {
                number = arrayImgs.length - 1;
                mudaImg.src = arrayImgs[number];
            }
            console.log(arrayImgs[number]);
        } else {
            number = 0;
            mudaImg.src = arrayImgs[number];
        }
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

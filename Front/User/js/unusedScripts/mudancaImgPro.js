let fotosAnuncio = document.getElementById('fotosAnuncio')
let btnDireita = document.getElementById('btnDireita')
let btnEsquerda = document.getElementById('btnEsquerda')
let mudaImg = document.getElementById('mudaImg')
let arrayImg = ['./imgs/casaco.webp','./imgs/fundo.jpg','./imgs/imagens.png']
let number = 0;

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
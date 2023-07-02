const caixa = document.getElementById('caixa')
var fotos = ["gfjhf","kjhglgkhj","gfdcgfhdhfhg"];




class Produtos {
    constructor(nome, foto){
        this.nome = nome;
        this.foto = [];
    }
    mostra(imagi){
        caixa.innerHTML = imagi + caixa.innerHTML
    }
}
 
const product = new Produtos('Caio', 'dsdfdsddddsddddd');

for(x = 0;x != fotos.length ;x++){
    product.mostra(fotos[x])
}


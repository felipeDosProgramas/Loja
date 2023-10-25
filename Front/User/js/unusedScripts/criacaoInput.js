/*const btnAdi = document.getElementById('btnAdi')
const mostra = document.getElementById('mostraInput')

btnAdi.addEventListener('click', function () {

    let numberAle = Math.floor(Math.random() * 1000)

    let inputFile = document.createElement('input')
    inputFile.type = 'file'
    inputFile.name = 'foto-' + numberAle
    inputFile.classList.add('file')

    let btnExclu = document.createElement('div')
    btnExclu.innerText = 'Excluir'
    btnExclu.id = 'btn-' + numberAle
    btnExclu.classList.add('excluir') 

    let divInput = document.createElement('div')
    divInput.id = 'divInput-' + numberAle
    divInput.style.display = 'flex'
    divInput.style.justifyContent = 'center'
    divInput.style.alignItems = 'center'

    btnExclu.onclick = function () {
        divInput.removeChild(inputFile)
        divInput.removeChild(btnExclu)
    }

    console.log('Adicionou')
    divInput.append(inputFile, btnExclu)
    mostra.appendChild(divInput)
})
*/
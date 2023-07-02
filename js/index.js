const btnMenu = document.getElementById('btnMenu');
const btnMenu2 = document.getElementById('btnMenu2');

btnMenu.addEventListener('click', function () {
    const navigation = document.getElementById('navegacao')
    navigation.classList.toggle('active')
    navigation.classList.remove('desative')
    const divUl = document.getElementById('divUl');
    divUl.classList.add('activeUl')
    console.log(divUl)
})

btnMenu2.addEventListener('click', function () {
    const navigation = document.getElementById('navegacao')
    navigation.classList.add('desative')
    navigation.classList.remove('active')
})

function getCookies(){
    let cookies = [];
    let rawCookies = decodeURIComponent(document.cookie);
    rawCookies = rawCookies.split(";");
    rawCookies.forEach((cada) => {cookies.push(cada.split('='))})
    //sessionID => cookies[0][1]
}

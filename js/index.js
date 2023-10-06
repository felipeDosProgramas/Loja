//<li class="li" id="logouOuNao"><a href="entre.php">Entre</a></li>
let coo = document.cookie;
let temOuNaoElemento = !!document.getElementById("logouOuNao");	
let ulMenu = document.getElementById("ulMenu");
let elemento;

function criarLinkParaDeslogar(elementoPai){
	
	let linkDeslogar = document.createElement("li");	
	linkDeslogar.className = "li";
	linkDeslogar.onclick = () => {
		document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	}	
	linkDeslogar.innerHTML = "<a href=''>deslogar</a>";
	elementoPai.append(linkDeslogar)	
}

function caminhoParaPerfilUsuario(){
	let url = location.pathname.split('/');
	let atual = url.length - 2;
	let retorno;
	switch(url[atual]){
		case "Loja":
		retorno = "User/perfilUser.php";
		break;
		
		case "User":
		retorno =  "";
		break;
		
		case "Admin":
		retorno = "index.php";
		break;
		
		case "sistema-de-previa":
		retorno = "../";
		break;
		
		default:		
		retorno = ""
	}
	
	return retorno;
}


if(coo != ""){	
	coo = coo.split('=');
	if(coo[0] == "sessionId"){	
		
		let pathTo = caminhoParaPerfilUsuario();
		let linkProPerfil = `<a href='${pathTo}'>Perfil</a>`;
		
		if(!temOuNaoElemento){
			elemento = document.createElement('li');
			elemento.id = "logouOuNao";
			elemento.className = "li";
			elemento.innerHTML = linkProPerfil;
			ulMenu.append(elemento);
			}else{	
			elemento = document.getElementById("logouOuNao");
			elemento.innerHTML = linkProPerfil;				
		}
		criarLinkParaDeslogar(ulMenu)
	}
	}else{
	if(!temOuNaoElemento){
		let url = location.pathname.split('/');
		let atual = url.length - 2;
		let pathTo = url[atual] == "Loja" ? "entre.php" : "../"
		elemento = document.createElement('li');
		elemento.id = "logouOuNao";
		elemento.className = "li";
		elemento.innerHTML = `<a href="${pathTo}">Entre</a>`
		ulMenu.append(elemento);
	}	
}

let addMenu = document.getElementById('addMenu')
let removeMenu = document.getElementById('removeMenu')
let nav = document.querySelector('nav')
addMenu.addEventListener('click', ()=> {
	nav.classList.add('navMenu')
	console.log(nav)
})

removeMenu.addEventListener('click', ()=> {
	nav.classList.remove('navMenu')
})


// Animação scroll ,
window.sr - ScrollReveal({reset: true})
ScrollReveal().reveal('.cardsProdu', {delay: 400});

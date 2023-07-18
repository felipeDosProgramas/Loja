
let coo = document.cookie;
coo = coo.split('=');
if(coo[0] == "sessionId"){	
	let elemento = document.getElementById("logouOuNao");
	let ulMenu = document.getElementById("ulMenu");
	
	let linkDeslogar = document.createElement("li");	
	linkDeslogar.className = "li";
	linkDeslogar.onclick = () => {
	document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	}
	
	linkDeslogar.innerHTML = "<a href=''>deslogar</a>";
	elemento.innerHTML = "<a href='User/perfilUser.php'>Perfil</a>";
	
	ulMenu.append(linkDeslogar)	
}
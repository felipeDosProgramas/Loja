
let coo = document.cookie;
coo = coo.split('=');
if(coo[0] == "sessionId"){	
	let elemento = document.getElementById("logouOuNao");
	elemento.innerHTML = "<a href='User/perfilUser.php'>Perfil</a>"
}
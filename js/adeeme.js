let email = document.getElementById('email');
let senha = document.getElementById('senha');

function getDados(){    
	
	let dados = {				
		email:email.value,
		senha:senha.value,
	}
    return dados
}
async function sendDados(oque){
	let promessa = new Promise((resolve) => {
	xhttp = new XMLHttpRequest();	
	xhttp.open("POST","purePhp/User.php");
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		        
	xhttp.onload = () => {resolve(xhttp.responseText)};
	xhttp.send("ele="+oque+"&praq=Login");
	})
	let resposta = await promessa;
	console.log(resposta)
}

function envio(){
	let x = sendDados(
		JSON.stringify(
			getDados()
		)
	);	
	
}

console.log(document.cookie)


document.getElementById('butao').addEventListener("click",envio)

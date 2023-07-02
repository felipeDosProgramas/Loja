let inputs = document.getElementsByTagName('input');
let Nome 	= inputs[0];
let Email 	= inputs[1];
let Idade 	= inputs[4];
let Senha 	= inputs[2];
let confSenha=inputs[3];
let Telefone= inputs[5];

function sanitizeIt(){
	if(Senha.value === confSenha.value){
		Senha = Senha.value;
	}
	console.log(0)
}


function getDados(){
    sanitizeIt();
	
	let dados = {
		nome:Nome.value,
		idade:Idade.value,
		email:Email.value,
		senha:Senha,
		telefone:Telefone.value,
	}
    return dados
}
async function sendDados(oque){
	let promessa = new Promise((resolve) => {
	xhttp = new XMLHttpRequest();	
	xhttp.open("POST","purePhp/User.php");
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		        
	xhttp.onload = () => {resolve(xhttp.responseText)};
	xhttp.send("ele="+oque+"&praq=Registro");
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




document.getElementById('butao').addEventListener("click",envio)

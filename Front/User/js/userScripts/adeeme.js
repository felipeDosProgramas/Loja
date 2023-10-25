let email = document.getElementById('email');
let senha = document.getElementById('senha');
let entrarBotao = document.getElementById('butao');
if(navigator.cookieEnabled){
	


function getDados(){    
	
	let dados = {				
		email:email.value,
		senha:senha.value,
	}
    return dados
}
function verificaTipoLogin(resposta){
	resposta = resposta.trim()
	switch(resposta){
		case "false":
		mudaCorBordaInput("red");
		break;
		case "true":
		mudaCorBordaInput("green");
		window.location.reload(true);
		break;
		case "éadm":
		mudaCorBordaInput("olive");
		window.location.reload(true);
		break;
		default:
		mudaCorBordaInput("red")
		mudaCorBordaInput("green")
		mudaCorBordaInput("blue")
	}	
}

function mudaCorBordaInput(cor){
	email.style.border = `4px solid ${cor}`;
	senha.style.border = `4px solid ${cor}`;		
	setTimeout(()=>{
		email.style.border = "none";
		senha.style.border = "none";
	}, 500)
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
	verificaTipoLogin(resposta);
}

function envio(){
	let dados = getDados();
	dados = JSON.stringify(dados);
	sendDados(dados);
}


cronometro1 = null;

senha.addEventListener('input', () => {
	clearTimeout(cronometro1);
	// console.clear()
	
	cronometro1 = setTimeout(() =>{
		if(senha.value != ""){
			envio();	
			console.log("consultou")
		}
	}, 1200)
})										



entrarBotao.addEventListener("click",envio);
// senha.addEventListener('input', teclouEnter)
}else{
	console.log("ativa os cookie")
	
	// fazer mensagem para ativar os cookies
}
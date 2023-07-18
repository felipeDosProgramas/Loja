let email = document.getElementById('email');
let senha = document.getElementById('senha');
let entrarBotao = document.getElementById('butao');


function getDados(){    
	
	let dados = {				
		email:email.value,
		senha:senha.value,
	}
    return dados
}
function verificaTipoLogin(resposta){
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


function teclouEnter(e) {
	e.preventDefault()
    e = e || window.event;
    var code = e.which || e.keyCode;
	
    if(code == "13"){
		envio();
	}
};



entrarBotao.addEventListener("click",envio);
senha.addEventListener('keydown', teclouEnter)
email.addEventListener('keydown',teclouEnter);
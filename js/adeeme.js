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
async function sendDados(oque){
	let promessa = new Promise((resolve) => {
		xhttp = new XMLHttpRequest();	
		xhttp.open("POST","purePhp/User.php");
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		        
		xhttp.onload = () => {resolve(xhttp.responseText)};
		xhttp.send("ele="+oque+"&praq=Login");
	})
	let resposta = await promessa;
	if(resposta == "false"){
		email.style.border = "2.5px solid red";
		senha.style.border = "2.5px solid red";		
		setTimeout(()=>{
			email.style.border = "none";
			senha.style.border = "none";
		}, 500)
	}
}

function envio(){
	let x = sendDados(
		JSON.stringify(
			getDados()
		)
	);	
	
}
function teclouEnter(e) {
    e = e || window.event;
    var code = e.which || e.keyCode;

    if(code == "13"){
		envio();
	}
};



entrarBotao.addEventListener("click",envio);
senha.addEventListener('keydown', teclouEnter)
email.addEventListener('keydown',teclouEnter);
import queryHandler from "./classes/queryHandler.js";

let container = document.getElementById("them");
const padroes = /[!]|[-]/;


async function consulta(query){   
	if(busca.value != ""){
		let promessa = new Promise((resolve) => {
			let req = new XMLHttpRequest();
			req.open("GET","phpPrevias/filesHandler.php?action=returnClosier&qual="+busca.value);
			req.onload = () => {resolve(req.responseText)};
			req.send();
		});	
		
		let exemp = await promessa	;		
		query.elmnts = [];		
		exemp = JSON.parse(exemp);							
		if(Array.isArray(exemp)){		
			console.log(exemp)	
			exemp.forEach((cada) => {
				query.setEstruPrev(cada.rota, cada.nome, cada.raw );
			})
			
			query.putInScreen()
		}
		else{
			console.log("nn foi");
		}
		}else{
		container.remove();
		container = document.createElement('div');
		container.setAttribute("id", 'them')		
		query.sec.append(container)
	}
}
//---------------------------------------------------------------------------
let busca = document.getElementById('buscPrevia'),
classe = new queryHandler(),
cronometro1 = null;

busca.addEventListener('input', () => {
	clearTimeout(cronometro1);
	console.clear()
	
	cronometro1 = setTimeout(() =>{
		if(!padroes.test(busca.value)){
			consulta(classe);	
			console.log("consultou")
		}
	}, 500)
});					

let url = location.href;
let get = url.split("?");
get = get[1].split("=");
let Dataslan = [];
let inpuNome = document.getElementsByName("nome");
let inpuDate = document.getElementsByName("date");
let imgsBanco = document.getElementById("imgsExistentes");

async function consulta ()       
{
	let promessa = new Promise((resolve) => 
		{
			let req = new XMLHttpRequest();
			req.open("GET","filesHandler.php?q="+get[1]+"&edt=true");
			req.onload = () => {resolve(req.responseText)};
			req.send();
		});				
		let exemp = await promessa					+
		console.log("ce mandou \n"+get[1]+"\n e o servidor retornou: \n"+exemp);
		exemp = JSON.parse(exemp);
		if(Array.isArray(exemp)){exemp.forEach((cada) => {Dataslan.push(cada.split("!-!"))})}
		inpuNome[0].value = Dataslan[0][1]
		inpuDate[0].value = Dataslan[0][2]
		
		console.log(exemp)
		let imgs = [];
		let img
		exemp.forEach((cada) => {
			img = document.createElement('img')
			img.src = cada;
			img.setAttribute("class", "imgsBancoEditar")
			imgsBanco.append(img)
			
		})
		
}

consulta()

class requestsHandler{
	constructor(parsedGet){		
		this.get = parsedGet;
	}
	setInputs(inputData, inputNome){
		this.inpuDate = inputData;
		this.inpuNome = inputNome;
	}	
	veSeTem(oque,naOnde){
		let retorno = true;
		naOnde.forEach((cada)=>{
			if(oque === cada){
				retorno = false;
			}
		})
		return retorno;
	}		
	
	async consultaInicial(){		
		let promessa = new Promise((resolve) => 
			{
				let req = new XMLHttpRequest();				
				
				req.open("GET","phpPrevias/filesHandler.php?action=especifico&qual="+this.get);
				req.onload = () => {resolve(req.responseText)};
				req.send();
			});				
			exemp = await promessa;		
			exemp = JSON.parse(exemp)
			exemp = JSON.stringify(exemp.imagens)
			sessionStorage.setItem('imagensProCarrosel',exemp)			
			this.inpuDate.innerText = exemp.data
			this.inpuNome.innerText = exemp.nome
	}
	
	async excluPrevInteira(){
		let server = await fetch("phpPrevias/filesHandler.php?action=excluEsse&qual="+this.get)
		let resposta = await server.text();				
		console.log(resposta)
	}	
}

export default requestsHandler;
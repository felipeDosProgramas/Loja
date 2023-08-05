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
			let exemp = await promessa;									
			exemp = JSON.parse(exemp);				
			let data = exemp.data.split("-");
			this.imagens = exemp.imagens;
			this.inpuDate.value = `${data[2]}-${data[1]}-${data[0]}`;
			this.inpuNome.value = exemp.nome;			
			return true;				
	}
	async mudaDados(){
		let dados = JSON.stringify([this.inpuDate.value, this.inpuNome.value])
		let server = await fetch("phpPrevias/filesHandler.php?action=alteraDados&paraQuais="+dados+"&deQual="+this.get)
		let resposta = await server.text();
		resposta = JSON.parse(resposta)
		if(resposta[0] && resposta[1]) location.href = `editPrev.php?qual=!-!${this.inpuNome.value}!-!${this.inpuDate.value}!-!`
		console.log(resposta);
	}
	
	
	async excluSoUmaFoto(qual){
		let server = await fetch("phpPrevias/filesHandler.php?action=excluEssaFoto&qual="+qual+"&daPrev="+this.get);
		let resposta = await server.text();
		console.log(resposta)
	}
	
	async excluPrevInteira(e){
		e.preventDefault();
		let server = await fetch("phpPrevias/filesHandler.php?action=excluEsse&qual="+this.get)
		let resposta = await server.text();				
		console.log(resposta)
	}	
}

export default requestsHandler;
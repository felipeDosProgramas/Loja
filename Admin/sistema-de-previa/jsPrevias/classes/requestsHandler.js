class requestsHandler{
	constructor(inputData, inputNome){
		this.inpuDate = inputData;
		this.inpuNome = inputNome;
		this.imgsPraEdita = [];
		
		this.consultaInicial()
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
				req.open("GET","phpPrevias/filesHandler.php?action=especifico&qual="+get);
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
	
}
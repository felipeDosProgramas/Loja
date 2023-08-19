class sideElementsCreator{
	constructor(){}
	
	createOptions(wit){
		let opts = []
		wit.forEach((cada) => {
			let option = document.createElement('option')
			option.innerText = cada
			option.value = cada
			
			opts.push(option)
		})
		console.log(opts)
		return opts
	}
	
	cleanSelectChilds(select){
		while(select.firstChild){
			select.firstChild.remove()
		}
		return select
	}
	createSizeOptions(stringWithSizes){
		let tamanhos = stringWithSizes.split(',') 
		tamanhos.forEach((cada, um) => tamanhos[um] = cada.trim())
		
		tamanhos = this.createOptions(tamanhos)
		
		return tamanhos
	}
}

export default sideElementsCreator
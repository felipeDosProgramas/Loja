
class Preview{
	constructor(rawNameDate){
		this.rawPreview = rawNameDate;
	}
	
	parseThem(){
		let raw = this.rawPreview.split('!-!');
		
		this.nome = raw[1];
		this.date = raw[2];
	}	
}


export default Preview;
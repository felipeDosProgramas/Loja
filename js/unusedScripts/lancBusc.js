
function getLanc(){
    let semi = window.location.href.split('?');
    let gets = [];    
    semi = semi[1].split('&')
    semi.forEach((cada)=>{
        gets.push(cada.split('='));

    })
console.log(gets)
return gets[0][1]
}

async function consulta (){   
    
	let promessa = new Promise((resolve) => {
        let req = new XMLHttpRequest();
        req.open("GET","./Admin/sistema-de-previa/filesHandler.php?q="+getLanc());
        req.onload = () => {resolve(req.responseText)};
        req.send();
    });	

	let exemp = await promessa	
    console.log(exemp)
}


consulta()

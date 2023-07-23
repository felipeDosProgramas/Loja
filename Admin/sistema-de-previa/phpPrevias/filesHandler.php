<?php	
	if(isset($_GET['q'])){	
		
		if(isset($_GET['edt'])){			
			// $hand = new filesHandler("../../arquivos", $_GET['q'], true);		
			exit();
		}
		if(isset($_GET['sendThem'])){
			// $hand = new filesHandler('../../arquivos',  $_GET['q'], false, true);
			exit();
		}
		if(isset($_GET['excluEsse'])){
			// $hand = new filesHandler('../../arquivos', $_GET['q'], false, true, true);
			exit();
		}
		
	}
	require_once "classes/JustReturn/ReturnAllOfIt.php";
	$hand = new ReturnAllOfIt();				
	
	
	
	
	/*
		USADO EM :
		Loja\Admin\sistema-de-previa\jsPrevias\editPrev.js
		retornar todos os dados de apenas a especificada
		
		Loja\Admin\sistema-de-previa\jsPrevias\queryHandler.js
		retornar apenas os que baterem com a busca
		
		Loja\js\previewScripts\anunPrevias.js 
		retornar todas as prévias
		
		Loja\js\previewScripts\mudancaImg.js
		retornar apenas a especificada 
	*/
	
?>					
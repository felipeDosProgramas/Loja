<?php		
	if(isset($_GET['action'])){		
		switch($_GET['action']){
			case "returnClosier":
				require_once "classes/JustReturn/ReturnClosier.php";
				$hand = new returnClosier($_GET['qual']);
			break;
			
			case "returnAll":
				require_once "classes/JustReturn/ReturnAllOfIt.php";
				$hand = new ReturnAllOfIt();		
			break;
			
			case "especifico":
				require_once "classes/JustReturn/ReturnEspecific.php";
				$hand = new ReturnEspecific($_GET['qual']);
			break;
			
			default:
			echo "ta hackeando né safado";
		}
		
		$hand->getResponse();
	}		
	/*
		USADO EM :
		Loja\Admin\sistema-de-previa\jsPrevias\editPrev.js
		retornar todos os dados de apenas a especificada
		req.setRequestHeader('X-AllPreviews', '0');	
		req.setRequestHeader('X-AllPreviewImages', '1');			
		req.setRequestHeader('X-whichPreview', getLanc()));
		----------------------------
		editSomeThing{
		Remover fotos específicas		
		req.setRequestHeader('X-AllPreviews', '0');					
		req.setRequestHeader('X-RemovePics', "json falando quais"));
		
		alterar dados especificos
		req.setRequestHeader('X-AllPreviews', '0');					
		req.setRequestHeader('X-alterData', "json falando qual e pra que"));
		adicionar fotos 
		req.setRequestHeader('X-AllPreviews', '0');					
		req.setRequestHeader('X-addPics', json quais);					
		transferir da prévia para uma cor especifica de produto
		req.setRequestHeader('X-AllPreviews', '0');					
		req.setRequestHeader('X-transferpics', json quais);					
		req.setRequestHeader('X-pra onde ', qualproduto);					
		}
		justReturn{
		Loja\Admin\sistema-de-previa\jsPrevias\queryHandler.js
		retornar apenas os que baterem com a busca
		req.setRequestHeader('X-AllPreviews', '0');	
		req.setRequestHeader('X-AllPreviewImages', '0');			
		req.setRequestHeader('X-whichPreview', busca.value));
		
		Loja\js\previewScripts\anunPrevias.js 
		retornar todas as prévias
		action= returnAll
		
		Loja\js\previewScripts\mudancaImg.js
		retornar apenas a especificada 		
		req.setRequestHeader('X-AllPreviews', '0');				
		req.setRequestHeader('X-AllPreviewImages', '1');				
		req.setRequestHeader('X-whichPreview', getLanc());
		}
	*/
	
?>						
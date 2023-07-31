<?php	
	if($_SERVER['HTTP_X_ALLPREVIEWS']){		
		require_once "classes/JustReturn/ReturnAllOfIt.php";
		// $hand = new ReturnAllOfIt();		
	}
	// $size = count($_SERVER);
	$pattern = 'HTTP_X_';
	foreach($_SERVER as $inde => $cada){
		
		$foi = stripos($inde, $pattern);
		if($foi !== false){
			echo $inde."\n";
			echo $cada;
		}
	}
		// var_dump($_SERVER);	
		
		
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
			req.setRequestHeader('X-AllPreviewImages', '0');
		req.setRequestHeader('X-AllPreviews', '1');			
		
		Loja\js\previewScripts\mudancaImg.js
		retornar apenas a especificada 		
		req.setRequestHeader('X-AllPreviews', '0');				
		req.setRequestHeader('X-AllPreviewImages', '1');				
		req.setRequestHeader('X-whichPreview', getLanc());
		}
	*/
	
?>					
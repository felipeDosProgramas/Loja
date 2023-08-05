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
			
			case "excluEsse":
				require_once "classes/movePreviews/deletePreview.php";
				$hand = new deletePreview($_GET['qual']);
			break;
			
			case "excluMarcados":
				require_once "classes/movePreviews/deletePreviewImages.php";
				
			break;
			default:
				echo "ta hackeando né safado";
		}
		if(isset($hand)) $hand->getResponse();							
	}
?>						
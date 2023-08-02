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
?>						
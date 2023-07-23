<?php	
	class fileSysManager{
		private string $forWho;	
		static array $centralDir;
		
		function __construct(){
			fileSysManager::$centralDir = $this->getDirSequenc("../../arquivos");		
		}
		
		protected function getDirSequenc(string $qual) :array{			
			if(!is_dir($qual)){echo "$qual is an invaliDir";exit();}
			return array_diff(scandir($qual), [".",".."]);									
		}
		protected function sendToFront($what){			
			echo json_encode($what, JSON_UNESCAPED_UNICODE);
			exit();
		}

		
		// $this->getDirSequenc($dirTo);			
		// $this->doing = $this->URLDecoder($toSearch);
		// $this->chosenDirDecoder();
	}	
	
?>
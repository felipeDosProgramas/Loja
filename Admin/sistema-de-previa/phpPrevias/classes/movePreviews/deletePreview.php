<?php
	require_once "classes/fileSysManager.php";
	
	class deletePreviews extends fileSysManager{
		private string $centralDir;
		
		function __construct($dirCentral){
			parent::__construct();
			
			$this->centralDir = $dirCentral;
			$this->prevExclu();
		}
		
		
		private function prevExclu(){
			$pathToOld = "../../arquivos/$this->centralDir";				
			$pathToNew = "../../lixeira/previas/";
			$arqvs = parent::getDirSequenc($pathToOld);
			
			$encodedResponse["chmodToNew"] = chmod($pathToNew, 0777);
			$encodedResponse["chmodToOld"] = chmod($pathToOld, 0777);						
			
			$trashBin = parent::getDirSequenc($pathToNew);				
			
			if(array_search($this->centralDir, $trashBin) === false){
				$encodedResponse["mkdir"] = mkdir("../../lixeira/$this->centralDir");					
			}
			foreach($arqvs as $cada) {
				if(array_search($cada, $trashBin) === false){						
					$encodedResponse["rename"] = rename($pathToOld."/".$cada,$pathToNew."/".$this->centralDir."/".$cada);
					continue;
				}
				$encodedResponse["unlink"] = unlink($pathToOld."/".$cada);											
			}
			$encodedResponse["rmdir"] = rmdir($pathToOld);				
			
			parent::setResponse($encodedResponse);
		}
		
		
	}
?>
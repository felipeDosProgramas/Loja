<?php
	require_once "classes/fileSysManager.php";
	
	class deletePreview extends fileSysManager{
		private string $PrevPraExclu;
		
		function __construct($dirCentral){
			parent::__construct();
			
			$this->PrevPraExclu = $dirCentral;
			$this->prevExclu();
		}
		
		
		private function prevExclu(){
			$pathToOld = "../../arquivos/$this->PrevPraExclu";				
			$pathToNew = "../../lixeira/";
			$arqvs = parent::getDirSequenc($pathToOld);
			
			$encodedResponse["chmodToNew"] = chmod($pathToNew, 0777);
			$encodedResponse["chmodToOld"] = chmod($pathToOld, 0777);						
			
			$trashBin = parent::getDirSequenc($pathToNew);				
			
			if(array_search($this->PrevPraExclu, $trashBin) === false){
				$encodedResponse["mkdir"] = mkdir("../../lixeira/$this->PrevPraExclu");					
			}
			foreach($arqvs as $cada) {
				if(array_search($cada, $trashBin) === false){						
					$encodedResponse["rename"] = rename($pathToOld."/".$cada,$pathToNew."/".$this->PrevPraExclu."/".$cada);
					continue;
				}
				$encodedResponse["unlink"] = unlink($pathToOld."/".$cada);											
			}
			$encodedResponse["rmdir"] = rmdir($pathToOld);				
			
			parent::setResponse($encodedResponse);
		}
		
		
	}
?>
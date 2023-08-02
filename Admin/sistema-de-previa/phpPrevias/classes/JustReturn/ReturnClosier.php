<?php
	require_once "classes/fileSysManager.php";
	require_once "classes/returnTypeObj.php";
	
	class ReturnClosier extends fileSysManager{		
		use returnObj;
		private string $toSearch;
		private specificReturnType $returnType;
		private ?array $founded;
		
		function __construct($toSearch){
			parent::__construct();
			$this->returnType = $this->getReturnTypeObj();
			$this->toSearch = $toSearch;	
			$this->search();			
			$this->parseFounded();
		}
		
		private function search(){
			$aux = 0;
			foreach(parent::$centralDir as $i){
				$toSea = 	explode("!-!", $i);
				$founded = 	stripos($toSea[1], $this->toSearch); 
				
				if($founded !== false){								
					$res[$aux]["file"] = $i;
					$res[$aux][] = parent::getDirSequenc("../../arquivos/".$i);										
					$aux++;
				}
				unset($founded);					
			}
			$this->founded = $res;			
		}
		
		private function parseFounded(){
			$aux = 0;			
			foreach($this->founded as $cada){
				foreach($cada[0] as $index => $imgs){
					$cad[$aux][] =  "../arquivos/{$cada['file']}/$imgs";
				}		
				$aux++;
			}			
			unset($cada);
			$aux = 0;
			foreach($cad as $cada){				
				$raws = explode("!-!", $this->founded[$aux]["file"]);				
				$this->returnType->setFullFilledRow($cada, $raws[1], $raws[2], $this->founded[$aux]["file"]);
			}
			parent::setResponse($this->returnType->getAllRows());
		}
	}
	
?>
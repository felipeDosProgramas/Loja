<?php
	require_once "classes/fileSysManager.php";
	require_once "classes/returnTypeObj.php";
	
	class ReturnClosier extends fileSysManager{		
		use returnObj;
		private string $toSearch;
		function __construct($toSearch){
		parent::__construct();
			$this->toSearch = $toSearch;	
			$this->search();
		}
		private function search(){
		
			foreach(parent::$centralDir as $i){
				$toSea = explode("!-!", $i);
				$founded =stripos($toSea[1], $this->toSearch); 
				
				if($founded !== false){										
					$res[] = parent::getDirSequenc("../../arquivos/".$i);
				}
				unset($founded);
			}
			parent::setResponse($res);
		}
	}
	
?>
<?php
	require_once "classes/justReturn/returnTypeObj.php";
	require_once "classes/fileSysManager.php";
	
	class allDirData extends fileSysManager{
		use returnObj;
		
		private specificReturnType $forFront;
		private array $allPreviews;
		
		function __construct(){
			parent::__construct();
			$this->forFront = $this->getReturnTypeObj();			
			$this->getAll();
		}
		
		private function getAll(){
			(array) $allDirs = parent::getDirSequenc("../../arquivos");
			
			foreach($allDirs as $cada){			
				(array) $each = explode("!-!", $cada);
				$this->forFront->setFullFilledRow("",$each[1],$each[2], $cada);
			}
			parent::setResponse($this->forFront->getAllRows());
		}
	}
?>
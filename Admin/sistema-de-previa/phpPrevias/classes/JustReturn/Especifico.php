<?php
	require_once "classes/fileSysManager.php";
	require_once "classes/returnTypeObj.php";
	
	class Especifico extends fileSysManager{
		use returnObj;
		
		private string $prevToGet;
		
		function __construct(string $prevToGet){
			$this->prevToGet = $prevToGet;
		}
		
		private function aceessDirectory(){
			array $imgs = parent::getDirSequenc($this->prevToGet);
		}
	}
?>
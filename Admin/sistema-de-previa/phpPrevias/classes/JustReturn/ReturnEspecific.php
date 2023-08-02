<?php
	require_once "classes/fileSysManager.php";
	
	class ReturnEspecific extends fileSysManager{
		
		private string $rawPrevName;
		private string $routeToPrevByBack = "../../arquivos/";
		private string $routeToPrevByFront = "Admin/arquivos/";
		
		function __construct(string $prevToGet){
			$this->rawPrevName = $prevToGet;
			$this->routeToPrevByBack .= $prevToGet;			
			$this->aceessDirectory();
		}
		
		private function aceessDirectory(){
			$imgs = parent::getDirSequenc($this->routeToPrevByBack);	
			$retorno = [];
			// print_r($imgs);
			foreach($imgs as $imgInde => $imgName){
				$retorno[] = $this->routeToPrevByFront.$this->rawPrevName."/".$imgName;								
			}
			(array) $rawData = explode("!-!", $this->rawPrevName);
			$rawData[2] = explode("-", $rawData[2]);
			// print_r($rawData[][]);
			$rawData[2] = "{$rawData[2][2]}-{$rawData[2][1]}-{$rawData[2][0]}";
			parent::setResponse(
			[
			"nome"		=>	$rawData[1],
			"data"		=>	$rawData[2],
			"imagens"	=>	$retorno
			]
			);
		}
	}
?>
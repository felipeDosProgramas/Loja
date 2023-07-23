<?php
	require_once "classes/fileSysManager.php";
	require_once "classes/traits.php";
	
	class ReturnAllOfIt extends fileSysManager{	
		use returnObj;
		
		private string $pathToArquivos = "Admin/arquivos/";
		
		
		function __construct(){
			parent::__construct();
			$toSent = $this->getReturnTypeObj();
			$this->URLDecoder($toSent);
		}						
		
		private function prepareUrl(&$value, $chave, $nome){
			$value = $this->pathToArquivos.$nome. DIRECTORY_SEPARATOR. $value;
		}
		private function URLDecoder(specificReturnType $toSent){
			if($_SERVER['HTTP_X_ALLPREVIEWIMAGES']){
				foreach(parent::$centralDir as $i){
					(array) $rawData = explode("!-!", $i);										
					(array) $rotas = parent::getDirSequenc("../../arquivos/$i");
					
					array_walk($rotas, [$this, "prepareUrl"],$i);
					$toSent->setFullFilledRow($rotas, $rawData[1], $rawData[2], $i);
				}
				parent::sendToFront($toSent->getAllRows());
			}					
			foreach(parent::$centralDir as $i){
				(array) $rawData = explode("!-!", $i);										
				(array) $rotas = parent::getDirSequenc("../../arquivos/$i");
				
				$this->prepareUrl($rota,"",$i);
				
				$toSent->setFullFilledRow($rota.$rotas[2], $rawData[1], $rawData[2], $i);
				unset($rota);
			}
			parent::sendToFront($toSent->getAllRows());
		}
	}
	
?>	
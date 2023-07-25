<?php
	require_once "classes/fileSysManager.php";
	require_once "classes/traits.php";
	
	class ReturnAllOfIt extends fileSysManager{	
		use returnObj;
		
		private string $pathToArquivosFromUser = "Admin/arquivos/";
		private string $pathToArquivosFromScript = "../../arquivos";		
		private string $todasAsFotos;		
		
		function __construct(){
			parent::__construct();
			$toSent = $this->getReturnTypeObj();
			$this->URLDecoder($toSent);
		}						
		
		private function prepareUrl(&$value, $chave, $nome){
			$value = $this->pathToArquivosFromUser.$nome. DIRECTORY_SEPARATOR. $value;
		}
		public function setConfigs(string $confs, string $values){
			$this->$$confs = $values;
		}
		public function getResponse(){			
			parent::sendToFront($this->toSentForFront);
		}
		
		private function URLDecoder(specificReturnType $toSent){
			if($todasAsFotos){
				
			}					
			foreach(parent::$centralDir as $i){
				(array) $rawData = explode("!-!", $i);										
				(array) $rotas = parent::getDirSequenc("$this->pathToArquivosFromScript/$i");
				
				$this->prepareUrl($rota,"",$i);
				
				$toSent->setFullFilledRow($rota.$rotas[2], $rawData[1], $rawData[2], $i);
				unset($rota);
			}
			parent::sendToFront($toSent->getAllRows());
		}
		private function getAllPreviwImages(specificReturnType $toSent){
			foreach(parent::$centralDir as $i){
				(array) $rawData = explode("!-!", $i);										
				(array) $rotas = parent::getDirSequenc("$this->pathToArquivosFromScript/$i");
				
				array_walk($rotas, [$this, "prepareUrl"],$i);
				$toSent->setFullFilledRow($rotas, $rawData[1], $rawData[2], $i);
			}
			
		}
	}
	
?>	
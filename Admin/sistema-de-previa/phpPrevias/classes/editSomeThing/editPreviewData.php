<?php
	require_once "classes/fileSysManager.php";
	
	class editPreviewData extends fileSysManager{
		private string $deQual;
		private $paraQuais;
		
		function __construct(string $_deQual, string $_paraQuais){
			parent::__construct();
			$this->deQual = $_deQual;
			$this->paraQuais = json_decode($_paraQuais);
			$this->paraQuais = "!-!{$this->paraQuais[1]}!-!{$this->paraQuais[0]}!-!";
			
			$this->changeDirName();
		}
		
		private function changeDirName(){
			$pathToDir = "../../arquivos/";
			$response[] = chmod($pathToDir.$this->deQual, 0777);
			$response[] = rename($pathToDir.$this->deQual, $pathToDir.$this->paraQuais);
			
			parent::setResponse($response);
		}
	}
?>
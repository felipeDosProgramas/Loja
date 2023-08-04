<?php
	require_once "classes/fileSysManager.php";
	
	class deletePreviewImages extends fileSysManager{
		private string $quaisImgs;
		function __construct($quaisImgs){
			parent::__construct(); 
			
			$this->quaisImgs = $quaisImgs;
		}
		
		private function deletePics(){
		$praExcluir = json_decode($this->quaisImgs);	
			if(!is_dir("../../lixeira/$this->nomePrevia")){
				chdir("../../lixeira");
				mkdir($this->nomePrevia);
				chdir("../sistema-de-previa/phpPrevias");
			}
			foreach($praExcluir as $cada){
				$old = "../".$cada;
				$new = "../";
				$new .= str_replace("/arquivos","/lixeira", $cada);
				chmod($old, 0777);
				rename($old, $new);
			} 	
			
		}
	}	
?>
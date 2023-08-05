<?php
	require_once "classes/fileSysManager.php";
	
	class deletePreviewImages extends fileSysManager{
		private string $quaisImgs;
		private array $response;
		
		function __construct(string $quaisImgs, string $nomePrev){
			parent::__construct(); 
			
			$this->nomePrevia = $nomePrev;
			$this->quaisImgs = $quaisImgs;			
			
			$this->howMuchPics();
			parent::setResponse($this->response);
		}
		
		private function doesItExistInTrash(){
			if(!is_dir("../../lixeira/$this->nomePrevia")){
				$this->response[] = chdir("../../lixeira");
				$this->response[] = mkdir($this->nomePrevia);
				$this->response[] = chdir("../sistema-de-previa/phpPrevias");
			}
		}
		
		private function howMuchPics(){
			$praExcluir = json_decode($this->quaisImgs);			
			if(is_null($praExcluir)){ 
				$this->deletePic();
				return;
			};
			$this->deletePics();
		}
		
		private function deletePics(){
			$this->doesItExistInTrash();
			
			foreach($this->quaisImgs as $cada){
				$old = "../".$cada;
				$new = "../";
				$new .= str_replace("/arquivos","/lixeira", $cada);
				$this->response[] = chmod($old, 0777);
				$this->response[] = rename($old, $new);
			} 							
		}
		
		private function deletePic(){
			$this->doesItExistInTrash();
			
			$old = "../../arquivos/{$this->nomePrevia}/{$this->quaisImgs}";
			$new = "../../lixeira/{$this->nomePrevia}";			
			
			$this->response[] = chmod($old, 0777);
			$this->response[] = chmod($new, 0777);
			$this->response[] = rename($old, "$new/{$this->quaisImgs}");
		}
	}	
?>
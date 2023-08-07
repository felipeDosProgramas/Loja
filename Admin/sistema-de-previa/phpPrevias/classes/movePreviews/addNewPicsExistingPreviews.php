<?php
	class addNewPicsExistingPreviews{
		private string $qualPrev;
		
		function __construct($_qualPrev){
			$this->qualPrev = $_qualPrev;
			$this->addPics();
		}
		
		private function addPics(){
			foreach($_FILES as $cadaPic){
				move_uploaded_file($cadaPic["tmp_name"], "../../arquivos/{$this->qualPrev}/{$cadaPic['name']}");
			}			
		}
	}
?>
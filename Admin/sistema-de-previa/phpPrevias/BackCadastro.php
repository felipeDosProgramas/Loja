<?php
	class Previa{
		private $toWork;
		private $answer;
		
		function __construct($dirTo){
			$this->aninha($dirTo);			
			$this->testa();
			header('location:formPrevia.php'.$this->redirec());
		}
		 function redirec(){
			return "?response=".$this->answer;
		}

		private function aninha($qm){
			$this->toWork = "../arquivos/!-!".$qm."!-!".$_POST['date']."!-!";
		}	
		
		private function testa(){
			if(is_dir($this->toWork)){
				$this->answer = "existe";
				//CASO EXISTA	
				}else{
				if(mkdir($this->toWork)){
					$this->answer = "cadastrado";
					//CASO O DIRETÓRIO NÃO EXISTA 
					
					for ($x = 0; $x != count($_FILES["fotos"]['name']); $x++) {
						move_uploaded_file($_FILES["fotos"]['tmp_name'][$x],$this->toWork."/" . $_FILES["fotos"]['name'][$x]);
					}
				}else{
					$this->answer = "nFoi";
				}
			}
		}
	}
	
	$x = new Previa($_POST['nome']);
	
	

	
?>

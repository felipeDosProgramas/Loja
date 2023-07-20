<?php
	class filesHandler{
		private $centralDir;				
		private $doing;
		private $dirsHandled = [];
		private $editar;
		
		function __construct($dirTo, $toSearch, $editar = false, $sendEditados = false){
			$this->editar = $editar;		
			if(!$sendEditados){				
				$this->centralDir = $this->getDirSequenc($dirTo);			
				$this->doing = $this->URLDecoder($toSearch);
				$this->chosenDirDecoder();
				return;
			}
			$this->doing = $toSearch;
			$this->dataEdit();
		}
		
		private function getDirSequenc($qual){
			return array_diff(scandir($qual), [".",".."]);			
		}		
		
		
		function URLDecoder($URL_Get){
			if($this->editar){
				$this->dirsHandled = $URL_Get;
				return $this->getDirSequenc("../../arquivos/".$URL_Get);
			}
			$aux = 0;			
			
			foreach($this->centralDir as $i){
				$toSea = explode("!-!", $i);
				
				$founded =stripos($toSea[1], $URL_Get); 
				
				if($founded !== false){										
					$res[] = $this->getDirSequenc("../../arquivos/".$i);
					$this->dirsHandled[] = $i;
				}
				unset($founded);
			}
			
			if(isset($res)){
				return $res;
			}
			$this->sendToFront("não existe");
		}
		function chosenDirDecoder(){
			if($this->editar){				
				$semiAns = "../arquivos/".$this->dirsHandled."/";								
				foreach($this->doing as $cada){
					$answer[] = $semiAns.$cada;	
				}
				if(isset($answer)){
					$this->sendToFront($answer);
				}
				$this->sendToFront($this->dirsHandled);
			}
			
			foreach($this->dirsHandled as $eachOne){				
				$semiAns[] = "../arquivos/$eachOne/";				
			}
			$zz = 0;			
			foreach($this->doing as $images){

				foreach($images as $imaged){
					
					$preAnswer[] = $semiAns[$zz].$imaged;
				}
				if(isset($preAnswer)){
					$answer[] = $preAnswer;
					unset($preAnswer);
					$zz++;
					continue;
				}				
				$answer[] = $this->dirsHandled[$zz++];
			}
			$this->sendToFront($answer);
		}
		
		function dataEdit(){
			$praExcluir = json_decode($_GET['sendThem']);	
			if(!is_dir("../../lixeira/$this->doing")){
				chdir("../../lixeira");
				mkdir($this->doing);
				chdir("../sistema-de-previa/phpPrevias");
			}
			foreach($praExcluir as $cada){
			$old = "../".$cada;
			$new = "../";
			$new .= str_replace("/arquivos","/lixeira", $cada);
			print_r($old);
			// echo "<hr>";
			chmod($old, 0777);
			// chmod($new, 0777);
			rename($old, $new);
			} 	
			$this->sendToFront("certin");
			}
			
			
			
			function sendToFront($what){			
			echo json_encode($what, JSON_UNESCAPED_UNICODE);
			exit();
			}
			
			
			}
			
			
			
			if(isset($_GET['q'])){		
			if(isset($_GET['edt'])){			
			$hand = new filesHandler("../../arquivos", $_GET['q'], true);		
			exit();
			}
			if(isset($_GET['sendThem'])){
			$hand = new filesHandler('../arquivos',  $_GET['q'], false, true);
			exit();
			}
			$hand = new filesHandler("../../arquivos", $_GET['q']);		
			
			}
			
			
			?>					
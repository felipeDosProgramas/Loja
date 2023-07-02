<?php
	class filesHandler{
		private $centralDir;				
		private $doing;
		private $dirsHandled = [];
		private $editar;
		
		function __construct($dirTo, $toSearch, $editar = false){
			$this->editar = $editar;
			$this->centralDir = $this->getDirSequenc($dirTo);
			$this->doing = $this->URLDecoder($toSearch);
			$this->chosenDirDecoder();
			
		}
		
		private function getDirSequenc($qual){
			return array_diff(scandir($qual), [".",".."]);			
		}		
		
		
		function URLDecoder($URL_Get){
			if($this->editar){
				$this->dirsHandled = $URL_Get;
				return $this->getDirSequenc("../arquivos/".$URL_Get);
			}
			$aux = 0;			
			
			foreach($this->centralDir as $i){
				$toSea = explode("!-!", $i);
				
				$founded =stripos($toSea[1], $URL_Get); 
				
				if($founded !== false){										
					$res[] = $this->getDirSequenc("../arquivos/".$i);
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
				$this->sendToFront($answer);
			}
			$zz = 0;
			foreach($this->dirsHandled as $eachOne){
				
				$semiAns[] = "../arquivos/$eachOne/";
			}
			foreach($this->doing as $images){
				
				foreach($images as $imaged){
					
					$preAnswer[] = $semiAns[$zz].$imaged;
				}
				$answer[] = $preAnswer;
				unset($preAnswer);
				$zz++;
			}
			$this->sendToFront($answer);
		}
		
		function sendToFront($what){			
			echo json_encode($what, JSON_UNESCAPED_UNICODE);
			exit();
		}
		
		
	}
	
	
	
	if(isset($_GET['q'])){		
		if(isset($_GET['edt'])){
			
			$hand = new filesHandler("../arquivos", $_GET['q'], true);		
			
			}else{
			$hand = new filesHandler("../arquivos", $_GET['q']);		
		}
	}
	
	
?>
<?php
	interface specificReturnType{		
		function getNomes()				:array;		
		function getDataLancamentos()	:array;		
		function getimgsRoutes()  		:array;
	}
	
	trait returnObj
	{
		function getReturnTypeObj(){
			return new class implements specificReturnType{
				private array $fullFilledRows;
				private int $rowId = 0;
				
				function getNomes(int|string $qual = "ele memo") :array{
					if(!is_string($qual)){
						return $this->fullFilledRows[$qual]["nome"];
					}
					foreach($this->fullFilledRows as $cada){
						$nomes[] = $cada["nome"];
					}					
					return $nomes;
				}
				function getDataLancamentos(int|string $qual = "ele memo") :array{
					if(!is_string($qual)){
						return $this->fullFilledRows[$qual]["data"];
					}
					foreach($this->fullFilledRows as $cada){
						$datas[] = $cada["data"];
					}					
					return $datas;
				}
				
				function getimgsRoutes(int|string $qual = "ele memo") :array{
					if(!is_string($qual)){
						return $this->fullFilledRows[$qual]["rota"];
					}
					foreach($this->fullFilledRows as $cada){
						$datas[] = $cada["rota"];
					}					
					return $datas;
				}		
				
				function getRaws(int|string $qual = "ele memo") :array{
					if(!is_string($qual)){
						return $this->fullFilledRows[$qual]["raw"];
					}
					foreach($this->fullFilledRows as $cada){
						$raw[] = $cada["raw"];
					}					
					return $raw;
				}			
				
				function setFullFilledRow(string|array $rota, string $nome, string $dataLancamento, string $raw){					
					$this->fullFilledRows[$this->rowId++] = array(					
					"nome" => $nome,
					"data" => $dataLancamento,
					"rota" => $rota,
					"raw" => $raw
					);
				}				
				function getRow(int $qual){
					return $this->fullFilledRows[$qual];
				}
				function getAllRows(){
					return $this->fullFilledRows;
				}
			};
			
		}
	}
?>
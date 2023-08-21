<?php
	interface specificReturnType{		
		function getData(int|string $qual, string $paraChar):array;		
	}
	
	trait returnObj
	{
		function getReturnTypeObj(){
			return new class implements specificReturnType{
				private array $fullFilledRows;
				private int $rowId = 0;
				// nome, data, rota ou raw
				function getData(int|string $qual = "ele memo", string $paraChar) :array{
					if(!is_string($qual)){
						return $this->fullFilledRows[$qual][$paraChar];
					}
					foreach($this->fullFilledRows as $cada){
						$nomes[] = $cada[$paraChar];
					}					
					return $nomes;
				}
				function setFullFilledRow
					(string|array $rota		,string $nome,
					string $dataLancamento	,?string $raw = null)
				{
					$this->fullFilledRows[$this->rowId++] = 
					array(					
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
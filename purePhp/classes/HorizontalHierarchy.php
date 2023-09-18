<?php
	interface usuarios{
		public function prepare($ar1,$ar2,$ar3,$ar4,$ar5);
		public function execQuery();
	}	
	
	trait connection{
		function saveErrorsInLogFile($errors){
			$logFile = fopen("../Admin/errors.csv", "a");
			fputcsv($logFile, $errors);
		}
		
		function connect(){
			try{
				$Connection = new PDO('mysql:dbname=loja;host=localhost;charset=UTF8','root','');
				 return $Connection;
			}
			catch(PDOException $Exception){
				$this->saveErrorsInLogFile(array("in Connection",$Exception->getCode(), $Exception->getMessage()));
				return false;
			}
			
			
		}
	}
?>	

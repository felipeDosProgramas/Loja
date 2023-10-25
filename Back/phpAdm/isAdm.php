<?php	
	$Connection = new PDO('mysql:dbname=loja;host=localhost;charset=UTF8','root','');	
	if(isset($_COOKIE['sessionId'])){
		$coo = $_COOKIE['sessionId'];
		foreach($Connection->query("select UserType, Name, Email from usuarios where codAcess = '$coo'") as $cada){
			$toReturn[] = $cada;
		}	
		return $toReturn;
		
	}
?>
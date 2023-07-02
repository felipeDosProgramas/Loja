<?php
	require_once "classUser.php";
	
	$y = json_decode($_POST['ele']);	
	// print_r($_POST['ele']);
	switch($_POST['praq']){	
		case "Registro":		
		$x = new ClassUsuario("Regis");
		
		$x->prepare($y->nome, $y->telefone, $y->email, $y->senha, $y->idade);										
		echo json_encode($x->execQuery());
		
		break;	
		
		case "Login":		
		$x = new ClassUsuario("LogarNe");
		$x->prepare($y->email, $y->senha);
		
		$resposta = $x->execQuery();
		if($resposta){			
			// print_r($resposta);
			setcookie("sessionId",$resposta,strtotime('+30 days'),"/");
			echo "true";
			exit();
		}
		echo "false";		
		break;
	}
	
	
	
?>
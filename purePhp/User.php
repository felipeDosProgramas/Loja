<?php
	require_once "classUser.php";
	
	$y = json_decode($_POST['ele']);	
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
			setcookie("sessionId",$resposta[0],strtotime('+30 days'),"/");						
			if($resposta[1] == 0){
				header("location: ../");
				exit();
			}			
			header("location: ../Admin");
			exit();		
		}
		echo "false";		
		break;
		
		case "Carrinho":
		$x = new ClassUsuario("tinyCar");
		$x->prepare($y->sessionId, $y->what, $y->how);			
		break;
	}
	
	
	/*
		1 parametro -> finalizar compra
		2 parametros -> Login
		3 parametros -> manipulação carrinho	
		4 parametros -> excluir conta
		5 parametros -> Registro
	*/
?>
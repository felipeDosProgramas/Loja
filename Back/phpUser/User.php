<?php
	$y = json_decode($_POST['ele']);	
	require_once "classes/classUser.php";
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
					echo "true";
					exit();
				}			
				echo "éadm";
				exit();		
			}
			echo "false";		
		break;
		
		default:
		echo "ta tentando hackear né??? SAFADO!";		
	}
	
	
	/*
		1 parametro -> finalizar compra
		2 parametros -> Login		
		4 parametros -> excluir conta
		5 parametros -> Registro
	*/
?>
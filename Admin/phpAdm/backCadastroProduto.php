<?php
	require_once "classCadastro.php";
	
	$dados = json_decode($_POST['dados']);	
	print_r($dados->quantidades);
	
	$produtos = new produtos();	
	
	$produtos->setPrimarios($dados->nome, $dados->classificacao, $dados->disponibilidade);
	$produtos->setSecundarios($dados->quantidades);
	
	$produtos->sendThem();
?>
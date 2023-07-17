<?php
	require_once "classCadastro.php";
	if(isset($_POST['dados'])){
		$dados = json_decode($_POST['dados']);		
		// print_r($dados);
		$produtos = new produtos();			
		$produtos->setDescricao($dados->descricao);
		$produtos->setPrimarios($dados->nome, $dados->classificacao, $dados->disponibilidade);
		$produtos->setSecundarios($dados->quantidades);
		
		$produtos->sendThem();
		
		
	}
?>
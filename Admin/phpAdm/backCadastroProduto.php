<?php		
	if(isset($_POST['dados'])){
		require_once "classes/classCadastro.php";
		$dados = json_decode($_POST['dados']);		
		print_r($dados);
		$produtos = new produtos();			
		$produtos->setPrimarios($dados->nome, $dados->classificacao, $dados->disponibilidade, $dados->dataLancamento, $dados->descricao);
		$produtos->setVariacoes($dados->variations);
		$produtos->setDescricao($dados->descricao);		
		
		$produtos->sendThem();
		
		
	}
?>
<?php		
	if(isset($_POST['dados'])){
		require_once "classes/classCadastro.php";
		$dados = json_decode($_POST['dados']);		
		print_r($dados);
		
		$cadastro = new CadastroProduto();			
		$cadastro->setPrimarios($dados->nome, $dados->classificacao, $dados->disponibilidade, $dados->dataLancamento, $dados->descricao);
		$cadastro->setVariacoes($dados->variations);		
		$cadastro->setColorsAndImgs($dados->picsAndColors, $dados->picsIds);
		$cadastro->sendThem();
		
		
	}
?>
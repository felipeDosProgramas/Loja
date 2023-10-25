<?php
	switch($_GET['oq']){
		case "soLer":
		$csv = file_get_contents("../classificacoes.txt");
		
		echo $csv;
		break;
		
		case "criaOutro":
		$arqv = file_get_contents('../classificacoes.txt');
		$dado = $_GET['cmEsse'];
		
		if($arqv == ""){
			file_put_contents('../classificacoes.txt', $dado ,FILE_APPEND);
			echo "foi";
			exit();
		}
		file_put_contents('../classificacoes.txt',",".$dado ,FILE_APPEND);
		echo "foi";
		
		break;
		
		case "tiraEsse":
		$dados = file_get_contents('../classificacoes.txt');
		if($dados != ""){
			$dados = str_replace(",".$_GET['esse'], "", $dados);
			file_put_contents('../classificacoes.txt', $dados);
			echo "foi";
			exit();
		}
		$dados = str_replace($_GET['esse'], "", $dados);
		file_put_contents('../classificacoes.txt', $dados);
		echo "foi";
		
		break;
	}
?>
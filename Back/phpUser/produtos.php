<?php
	require_once "classes/classProdutos.php";
	
	
	switch($_GET['oq']){
		case "todos":
			$produtos = new Produtos("meVeTudao");
		break;
		
		case "especifico":
			$produtos = new Produtos("especifico", $_GET['qual']);
		break;
	}
	
	
?>
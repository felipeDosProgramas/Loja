<?php
	require_once "classes/classTinyCar.php";
	switch($_GET['oq']){
		case "tudao":
			$carrinho = new TinyCar("showCart",null ,$_COOKIE['sessionId']);
		break;
		
		case "addSoEsse":
			$carrinho = new TinyCar("addEsse", $_GET['qual'], $_COOKIE['sessionId']);
		break;
	}
?>
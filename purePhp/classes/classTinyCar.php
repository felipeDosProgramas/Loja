<?php
	require_once "classUser.php";
	
	class TinyCar {
		use connection;
		
		private $AcaoASerExecutada;
		private $QuemQuerExecutar;
		private $ValorParaExecutar;
		
		function __construct($AcaoASerExecutada,$ValorParaExecutar = null, $QuemQuerExecutar = null){
			$this->AcaoASerExecutada = $AcaoASerExecutada;
			$this->QuemQuerExecutar = $QuemQuerExecutar;
			$this->ValorParaExecutar = $ValorParaExecutar;
			
			$conn = $this->connect();
			$this->execIt($conn);
		}
		private function ServerResponse($responderOq){
			if(is_array($responderOq)){
				echo json_encode($responderOq, JSON_FORCE_OBJECT);
			}
			echo $responderOq;
		}
		
		private function getFullCart(PDO $conn){
			
			$codAcess = $conn->quote($this->QuemQuerExecutar);
			
			$resul = $conn->prepare("select carrinho from usuarios where codAcess = $codAcess;");
			$resul->execute();				
			$resul->bindColumn('carrinho', $carrinho);
			
			while($resul->fetch(PDO::FETCH_BOUND)){
				$toReturn[] = $carrinho;
			}
			return $toReturn;			
		}		
		
		private function setCartThatWasEmpty($toSet, $conn){
			$oq = array("items" => [$toSet], "qtds" => ["1"]);
			$preJson = json_encode($oq, JSON_NUMERIC_CHECK);
			$qm = $conn->quote($this->QuemQuerExecutar);
			
			$preJson = $conn->quote($preJson);

			$conn = $conn->prepare("update usuarios set carrinho = $preJson where codAcess = $qm");
			$conn->execute();			

		}
		
		private function setPreProcessesedCart($encodedCartToSet, $whoAreSettingIt, $conn){
			$encodedCartToSet = $conn->quote($encodedCartToSet);
			$whoAreSettingIt = $conn->quote($whoAreSettingIt);
			$conn = $conn->prepare("update usuarios set carrinho = $encodedCartToSet where codAcess = $whoAreSettingIt");
			$conn->execute();
		}
		
		private function searchInCart($encodedCart, $toSearch){
			$decodedCarrinho = json_decode($encodedCart);
			$x = array_search($toSearch, $decodedCarrinho->items);
			if($x === false){
				return false;
			}
			return [$x, $decodedCarrinho];			
		}
		
		private function add1Item($codQual, $conn){
			$encodedCart = $this->getFullCart($conn);
			
			if($encodedCart[0] == ""){
				//SE O CARRINHO ESTIVER VAZIO
				$this->setCartThatWasEmpty($codQual, $conn);	
				return;
			}			
			$decodedCart = $this->searchInCart($encodedCart[0], $codQual);
			//testa se o item especificado existe ou nn no carrinho
			if($decodedCart){				
				// se existir no carrinho, incrementa em 1 a quantidade
				$decodedCart[1]->qtds[$decodedCart[0]]++;				
				$this->setPreProcessesedCart(json_encode($decodedCart[1]), $this->QuemQuerExecutar, $conn);
				return;
			}
			//do contrario, registra no carrinho o codigo do item e põe em "1" a quantidade
			$decodedCart[1]->items[] = $codQual;
			$decodedCart[1]->qtds[] = 1;
			$this->setPreProcessesedCart(json_encode($decodedCart[1], $this->QuemQuerExecutar, $conn));			
			
		}
		
		private function execIt($conn){
			switch($this->AcaoASerExecutada){
				case "showCart":
				$x = $this->getFullCart($conn);
				echo $x[0];
				break;
				
				case "addEsse":
				$this->add1Item($this->ValorParaExecutar, $conn);
				break;
			}
		}
	}		
	
	/*
		colocar 1 item
		verificar se o produto existe na tabela "produtos" e ent adiciona-lo ao campo carrinho na tabela usuarios
		tirar 1 item
		remover o item especificado do campo carrinho na tabela usuarios		
		limpar carrinho		
		limpar o campo carrinho da tabela usuarios
		ver todo o carrinho
		retornar todo o campo carrinho				
		alterar 1 item do carrinho
	retornar todo o carrinho, alterar o item especificado e ent envia-lo.
	finalizar carrinho
	adicionar os dados de envio à tabela "para enviar", mostrar na tela de administrador e ent 
	subtrair em X a qtd desse produto na tabela produtos
	
	*/
	
	
	?>		
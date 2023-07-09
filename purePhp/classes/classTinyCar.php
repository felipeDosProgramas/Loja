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
		
		private function getFullCart($conn){
			
			$codAcess = $conn->quote($this->QuemQuerExecutar);
			
			$resul = $conn->prepare("select carrinho from usuarios where codAcess = $codAcess;");
			$resul->execute();			
			$resul->bindColumn('carrinho', $carrinho);
			
			while($resul->fetch(PDO::FETCH_BOUND)){
				$toReturn[] = $carrinho;
			}
			return $toReturn;
			
		}		
		
		private function add1Item($codQual, $conn){
			$carrinhoAtual = $this->getFullCart($conn);			
			$carrinho = json_decode($carrinhoAtual[0]);
			print_r($carrinho);
		}
		
		private function execIt($conn){
			switch($this->AcaoASerExecutada){
				case "showCart":
				echo $this->getFullCart($conn);
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
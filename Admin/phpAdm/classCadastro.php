<?php
	require_once "../../purePhp/classes/HorizontalHierarchy.php";
	
	class produtos{
		use connection;
		
		private $nome;
		private $classificacao;
		private $disponibilidade;
		private $codProduto;
		private $quantidades;
		
		function __construct(){			
			$this->generateCodProduto();
		}
		
		private function generateCodProduto(){
			$this->codProduto = bin2hex(random_bytes(5));
		}
		
		function setDescricao($descricao){
			$caminho = "../../descricoesProdutos/".$this->codProduto.".txt";
			file_put_contents($caminho,$descricao);
		}
		
		function setPrimarios($nome, $classificacao, $disponibilidade){
			$this->nome = $nome;
			$this->classificacao = $classificacao;
			$this->disponibilidade = $disponibilidade;
		}
		
		function setSecundarios($todasQuantidades){
			$this->quantidades = $todasQuantidades;
		}
		
		private function sendPrimarios($conn){
			$this->nome = $conn->quote($this->nome);
			$this->classificacao = $conn->quote($this->classificacao);
			$this->disponibilidade = $conn->quote($this->disponibilidade);			
			$this->codProduto = $conn->quote($this->codProduto);
			
			$conn = $conn->prepare("INSERT INTO `produtosprimario` 
			(`Name`, `Classificacao`, `Disponivel`, `codProduto`) 
			VALUES
			($this->nome, $this->classificacao, $this->disponibilidade, $this->codProduto)");
			$conn->execute();
		}
		
		private function sendSecundarios($conn){
			foreach($this->quantidades as $cada){
				$forQuery = [];
				
				$forQuery[] = $conn->quote($cada[0]);
				$forQuery[] = $conn->quote($cada[1]);
				$forQuery[] = $conn->quote($cada[2]);
				$forQuery[] = intval($cada[3]);
				
				$query = "INSERT INTO `produtossecundario` 
				(`Cor`, `Tamanho`, `Preco`, `Qtd`, `ParentId`) 
				VALUES 
				($forQuery[1], $forQuery[0], $forQuery[2], $forQuery[3], $this->codProduto);";
				$conn->query($query);
				
				unset($forQuery);
			}				
		}
		
		
		function sendThem(){
			$conn = $this->connect();
			
			$this->sendPrimarios($conn);
			$this->sendSecundarios($conn);
		}
	}	
?>
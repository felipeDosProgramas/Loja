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
		
		function sendRespToFront($oq){
			echo $oq;
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
			return $conn->execute();
		}
		
		private function sendSecundarios($conn){
			$forQuery = [];
			foreach($this->quantidades as $cada){
				$forQuery[] = $conn->quote($cada[0]);
				$forQuery[] = $conn->quote($cada[1]);
				$forQuery[] = $conn->quote($cada[2]);
				$forQuery[] = intval($cada[3]);
				$query = "INSERT INTO `produtossecundario` 
				(`Tamanho`, `Cor`, `Preco`, `Qtd`, `ParentId`) 
				VALUES 
				($forQuery[0], $forQuery[1], $forQuery[2], $forQuery[3], $this->codProduto);";			
				if(!$conn->query($query)){
					return false;
				}					
				$forQuery = array_diff($forQuery, $forQuery);				
			}
			return true;
		}
		private function setPictures(){
			$caminhoDasNovasFotos = "../../imgs/Produtos/$this->codProduto";
			if(mkdir($caminhoDasNovasFotos)){
				for($x = 0;$x != count($_FILES['arquivos']['name']);$x++){
					move_uploaded_file($_FILES['arquivos']['tmp_name'][$x],$caminhoDasNovasFotos."/".$_FILES['arquivos']['name'][$x]);
				}
				return true;
			}
			return false;
		}
		
		function sendThem(){
			$conn = $this->connect();
			
			if($this->setPictures() and $this->sendPrimarios($conn) and $this->sendSecundarios($conn)){
				echo "foiCertin";
				return;
			}
			echo "foiNnMan";
		}
	}	
?>
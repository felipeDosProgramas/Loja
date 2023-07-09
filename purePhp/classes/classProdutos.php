<?php
	require_once "HorizontalHierarchy.php";
	
	class Produtos{
		use connection;
		
		private $aSerManipulado;
		private $acaoASerExecutada;
		
		function __construct($acaoASerExecutada, $aSerManipulado = null){
			$this->acaoASerExecutada = $acaoASerExecutada;
			$this->aSerManipulado = $aSerManipulado;			
			
			$this->execIt();
			
		}
		private function showToFront($what){
			echo json_encode($what);
		}
		
		private function getFotos($deq){
			$diretorio = array_diff(scandir("../imgs/Produtos/$deq"), [".",".."]);			
			return $diretorio;
		}
		
		private function getTudao(){
			$conn = $this->connect();
			$conn = $conn->prepare("select Nome, Classificacao, preco, codProduto from produtos;");
			$conn->execute();
			
			$conn->bindColumn('Nome', $Nome);
			$conn->bindColumn('Classificacao', $Classificacao);
			$conn->bindColumn('preco', $preco);
			$conn->bindColumn('codProduto', $codProduto);
			
			while($conn->fetch(PDO::FETCH_BOUND)){
				$dados['nomes'][] = $Nome;
				$dados['classificacoes'][] = $Classificacao;
				$dados['precos'][] = $preco;
				$dados['codProdutos'][] = $codProduto;
			}
			
			foreach($dados['codProdutos'] as $cod){
				$foto = $this->getFotos($cod);
				$foto = array_pop($foto);
				$dados['linksFotos'][] = $foto;
			}
			$this->showToFront($dados);
			
		}	
		
		private function getOEspecifico(){
			$conn = $this->connect();
			
			$codProd = $conn->quote($this->aSerManipulado);
			
			$conn = $conn->prepare("
				select Nome, preco, Color, Size from produtos where
				codProduto = $codProd
			");
			$conn->execute();
			
			$conn->bindColumn("Nome", $Nome);
			$conn->bindColumn("preco", $Preco);
			$conn->bindColumn("Color",$Cor);
			$conn->bindColumn("Size", $Size);
			
			while($conn->fetch(PDO::FETCH_BOUND)){
				$dados['nome'] = $Nome;
				$dados['preco'][] = $Preco;
				$dados['Color'][] = $Cor;
				$dados['Size'][] = $Size;
			}
			$dados['fotos'] = array_values($this->getFotos($this->aSerManipulado));
			$dados['descricao'] = file_get_contents("../descricoesProdutos/".$this->aSerManipulado.".txt");
			$this->showToFront($dados);
		}
		
		private function execIt(){
			switch($this->acaoASerExecutada){
				case "meVeTudao":
					$this->getTudao();
				break;
				
				case "especifico":
					$this->getOEspecifico();
				break;
			}
		
		}
	}	
?>
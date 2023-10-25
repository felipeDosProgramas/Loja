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
			$conn1 = $conn->prepare("select Name, Classificacao, codProduto from produtosprimario where Disponivel = 1;");
			$conn2 = $conn->prepare("select Preco from produtossecundario where ParentId = ?");
			$conn1->execute();
			
			$conn1->bindColumn('Name', $Nome);
			$conn1->bindColumn('Classificacao', $Classificacao);
			$conn1->bindColumn('codProduto', $codProduto);			
			
			$conn2->bindColumn('Preco', $preco);
			
			while($conn1->fetch(PDO::FETCH_BOUND)){
				$dados['nomes'][] = $Nome;
				$dados['classificacoes'][] = $Classificacao;
				$dados['codProduto'][] = $codProduto;
			}
			
			if(isset($dados)){
				// print_r($dados['codProduto']);
				foreach($dados['codProduto'] as $cod){				
					$foto = $this->getFotos($cod);
					$foto = array_pop($foto);
					$dados['linksFotos'][] = $foto;
					$conn2->execute([$cod]);
					$resultados[] = $conn2->fetchAll();
				}
				$dados['precos'] = $resultados;
				$this->showToFront($dados);
				return;
			}			
			$this->showToFront("0 produtos cadastrados");
		}	
		
		private function getOEspecifico(){
			$conn = $this->connect();						
			$codProd = $conn->quote($this->aSerManipulado);						
			try{
				$Nome = $conn->prepare("select Name from produtosprimario where codProduto = $codProd");
				$Secundarios = $conn->prepare("select ID, Cor, Tamanho, Preco from produtossecundario where ParentId = $codProd");
				$Interface['cores'] = $conn->prepare("select distinct Cor from produtossecundario where ParentId = $codProd");
				$Interface['tamanhos'] = $conn->prepare("select distinct Tamanho from produtossecundario where ParentId = $codProd");
				$Interface['precosPorTamanho'] = $conn->prepare("select distinct Preco from produtossecundario where ParentId = $codProd and Tamanho = ?");
				
				$Nome->execute();
				$Secundarios->execute();
				$Interface['cores']->execute();
				$Interface['tamanhos']->execute();
				
				
				$Nome->bindColumn("Name", $Name);			
				
				$Secundarios->bindColumn("Cor", $cores);
				$Secundarios->bindColumn("Tamanho", $Tamanho);
				$Secundarios->bindColumn("Preco", $Preco);
				$Secundarios->bindColumn("ID", $ids);
				
				$Interface['cores']->bindColumn('Cor', $asCores);
				$Interface['tamanhos']->bindColumn('Tamanho', $osTamanhos);
				$Interface['precosPorTamanho']->bindColumn('Preco', $osPreco);
				
				while($Nome->fetch(PDO::FETCH_BOUND)){
					$dados['nome'] = $Name;				
				}
				
				while($Secundarios->fetch(PDO::FETCH_BOUND)){
					$dados["Secundarios"][] = [$ids, $cores, $Tamanho, $Preco];					
				}				
				
				while($Interface['cores']->fetch(PDO::FETCH_BOUND)){
					$dados['Interface']['cores'][] = $asCores;
				}
				
				while($Interface['tamanhos']->fetch(PDO::FETCH_BOUND)){
					$dados['Interface']['tamanhos'][] = $osTamanhos;
				}
				
				if(!isset($dados)){
					throw new Exception('sem dados');
				}
				
				foreach($dados['Interface']['tamanhos'] as $oTamanho){					
					$Interface['precosPorTamanho']->execute([$oTamanho]);
					$Interface['precosPorTamanho']->bindColumn('Preco', $osPreco);
					while($Interface['precosPorTamanho']->fetch(PDO::FETCH_BOUND)){
						$dados['precosPorTamanho'][] = [$oTamanho, $osPreco];
					}
					
				}
				
				}catch(Exception $e){
				$this->showToFront($e->getMessage());
				return;
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
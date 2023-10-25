<?php
	//
	//class produtos{
	//	use connection;
	//
	//	private $nome;
	//	private $classificacao;
	//	private $disponibilidade;
	//	private $codProduto;
	//	private $quantidades;
	//	private PDO $conn;
	//
	//	function __construct(){
	//		$this->conn = $this->connect();
	//		$this->generateCodProduto();
	//	}
	//
	//	function sendRespToFront($oq){
	//		echo $oq;
	//	}
	//	private function generateCodProduto(){
	//		$this->codProduto = bin2hex(random_bytes(5));
	//	}
	//
	//	function setDescricao($descricao){
	//		$caminho = "../../descricoesProdutos/".$this->codProduto.".txt";
	//		file_put_contents($caminho,$descricao);
	//	}
	//
	//	function setPrimarios($nome, $classificacao, $disponibilidade){
	//		$this->nome = $nome;
	//		$this->classificacao = $classificacao;
	//		$this->disponibilidade = $disponibilidade;
	//	}
	//
	//
	//	private function sendPrimarios($conn){
	//		$this->nome = $conn->quote($this->nome);
	//		$this->classificacao = $conn->quote($this->classificacao);
	//		$this->disponibilidade = $conn->quote($this->disponibilidade);
	//		$this->codProduto = $conn->quote($this->codProduto);
	//
	//		$conn = $conn->prepare("INSERT INTO `produtosprimario`
	//		(`Name`, `Classificacao`, `Disponivel`, `codProduto`)
	//		VALUES
	//		($this->nome, $this->classificacao, $this->disponibilidade, $this->codProduto)");
	//		return $conn->execute();
	//	}
	//	private function sendSecundarios($conn){
	//		$forQuery = [];
	//		foreach($this->quantidades as $cada){
	//			$forQuery[] = $conn->quote($cada[0]);
	//			$forQuery[] = $conn->quote($cada[1]);
	//			$forQuery[] = $conn->quote($cada[2]);
	//			$forQuery[] = intval($cada[3]);
	//			$query = "INSERT INTO `produtossecundario`
	//			(`Tamanho`, `Cor`, `Preco`, `Qtd`, `ParentId`)
	//			VALUES
	//			($forQuery[0], $forQuery[1], $forQuery[2], $forQuery[3], $this->codProduto);";
	//			if(!$conn->query($query)){
	//				return false;
	//			}
	//			$forQuery = array_diff($forQuery, $forQuery);
	//		}
	//		return true;
	//	}
	//	private function setPictures(){
	//		$caminhoDasNovasFotos = "../../imgs/Produtos/$this->codProduto";
	//		if(mkdir($caminhoDasNovasFotos)){
	//			for($x = 0;$x != count($_FILES['arquivos']['name']);$x++){
	//				move_uploaded_file($_FILES['arquivos']['tmp_name'][$x],$caminhoDasNovasFotos."/".$_FILES['arquivos']['name'][$x]);
	//			}
	//			return true;
	//		}
	//		return false;
	//	}
	//
	//	function sendThem(){
	//		$conn = $this->connect();
	//
	//		if($this->setPictures() and $this->sendPrimarios($conn) and $this->sendSecundarios($conn)){
	//			echo "foiCertin";
	//			return;
	//		}
	//		echo "foiNnMan";
	//	}
	//}
	require_once "../../purePhp/classes/HorizontalHierarchy.php";

	class CadastroProduto{
		use connection;
		private PDO $conn;
		private string $descricao;
		private array $dadosPrimarios;
		private array $variacoes;
		private array $imgsIds;
		private array $colorsWithPicsIds;
		private array $picsNamesAndIds;

		function __construct(){
			$this->conn = $this->connect();
		}
		function setPrimarios(string $nome, string $classificacao, string $disponibilidade, string $dataLancamento, string $descricao){
			$this->dadosPrimarios = array(
				":nome"				=>$nome,
				":classificacao"		=>$classificacao,
				":disponibilidade" 	=>$disponibilidade,
				":dataLancamento"	=>$dataLancamento
			);
			$this->descricao = $descricao;
		}
		function setVariacoes(array $variacoes){
			$this->variacoes = $variacoes;
		}
		function setColorsAndImgs(array $colorsWithPicsIds, array $picsNamesAndIds){
			$this->colorsWithPicsIds =	$colorsWithPicsIds;
			$this->picsNamesAndIds =	$picsNamesAndIds;
		}
		function saveThem(){
			$idPrimario = $this->savePrimaryData_GetPrimaryDataId();
			mkdir('../../Produtos/'+$idPrimario);
			
			$this->saveSecundaryData($idPrimario);
			$this->saveDescription	($idPrimario);
			$this->saveColors		($idPrimario);
		}
		private function savePrimaryData_GetPrimaryDataId() :string{
			$query = $this->conn->prepare('insert into `produtosprimario`(`Name`, `Classificacao`, `Disponivel`, `dataLancamento`)values(?,?,?,?)');
			print_r($this->dadosPrimarios);
			$query->execute($this->dadosPrimarios);

			return $this->conn->lastInsertId();
		}
		private function saveSecundaryData(string $primaryId){
			$query = $this->conn->prepare('insert into `produtossecundario` (`Preco`, `Cor`, `Tamanho`, `Qtd`, `ParentId`) values (?,?,?,?,?)');
			foreach($this->variacoes as $variacao){
				$query->execute([...$variacao, $primaryId]);
			}
		}
		private function saveDescription($primaryId){
			$caminho = "../../descricoesProdutos/".$primaryId.".txt";
			file_put_contents($caminho,$this->descricao);
		}
		private function saveColors($idPrimario){
			$path = "../../Produtos/{$idPrimario}/";			
			foreach($this->colorsWithPicsIds as $colors){								
				
			}
		}
	}
?>
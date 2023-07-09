<?php	
	require_once "HorizontalHierarchy.php";
	
	class ClassUsuario implements usuarios{
		use connection;
		
		private $Nome;
		private $Telefone;
		private $Email;
		private $Senha;
		private $Idade;
		private $CodAcess;
		private $praq;
		private $query;
		
		public function __construct($praq){
			$this->praq = $praq;			
		}
		
		private function getNome(){return $this->Nome;}		
		private function getTelefone(){return $this->Telefone;}		
		private function getEmail(){return $this->Email;}		
		private function getSenha(){return $this->Senha;}		
		private function getIdade(){return $this->Idade;}
		private function getCodAcess(){
			return str_shuffle($this->getNome().$this->getEmail().$this->getTelefone().str_shuffle($this->getEmail()));
		}
		

		
		
		private function praRegistra($sql){			
			try{
				$Nome = $sql->quote($this->getNome());
				$Idade = $sql->quote($this->getIdade());			
				$Email =$sql->quote($this->getEmail());
				$Senha =$sql->quote($this->getSenha());
				$Telefone =$sql->quote($this->getTelefone());
				$CodAcess = $sql->quote($this->getCodAcess());
				
				if($Nome and $Idade and $Email and $Senha and $Telefone and $CodAcess){
					return "INSERT into usuarios(Name, YearsOld, Email,Password ,PhoneNumber ,UserType, codAcess)
					values(".$Nome.",".$Idade.", ".$Email.",".$Senha."," .$Telefone.", 0, ".$CodAcess.")";			
				}
				throw new Exception("Error in Regis Process");				
				
				}catch(Exception $c){
				$this->saveErrorsInLogFile(["Registrando",$c]);
			}			
		}										
		private function praLogar($sql){
			try{
				$email = $sql->quote($this->getEmail());
				$senha = $sql->quote($this->getSenha());
				
				if($email and $senha){
					return "select Email, Password, codAcess, UserType from usuarios where Email = $email and Password = $senha";
				}
				throw new Exception("adulterado");
				
				}catch(Exception $c){
				$this->saveErrorsInLogFile(["Login",$c]);
				return false;
			}
		}
		
		public function prepare($arg1 = null,$arg2 = null,$arg3 = null,$arg4 = null,$arg5 = null){
			switch($this->praq){
				case "Regis":								
				$this->Nome = $arg1;
				$this->Telefone = $arg2;
				$this->Email = $arg3;
				$this->Senha = $arg4;
				$this->Idade = $arg5;	
				
				break;
				
				case "LogarNe":
				$this->Email = $arg1;
				$this->Senha = $arg2;
				break;
				
			}
		}
		
		public function ExecQuery(){
			try{				
				if($conn = $this->connect()){
					switch($this->praq){
						case "Regis":									
						$ele = $this->praRegistra($conn);	
						forEach($conn->query($ele) as $cada){
							$x[] = $cada;
						}
						return $x;
						break;
						case "LogarNe":
						$ele = $this->praLogar($conn);
						if($ele){
							$toRe = [];
							forEach($conn->query($ele) as $cada){
								$toRe[] = $cada['codAcess'];
								$toRe[] = $cada['UserType'];
							}						
							return $toRe;												
						}
						break;
						default:
						
						return false;
						break;
					}			
				}
				throw new Exception("falhou na hora de roda tudao");
			}
			catch(Exception $e){
				$this->saveErrorsInLogFile(["principal",$e]);
				return false;
			}
		}
	}	
?>

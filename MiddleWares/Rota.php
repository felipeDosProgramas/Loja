<?php
	namespace MiddleWares;

	use League\Plates\Engine;

	class Rota{
		private Engine $templates;

		function __construct(){
			$this->templates = new Engine("Front");
			$this->templates->setFileExtension(null);
		}		
		protected function renderizar(string $nomeTemplate){
			try{
				echo $this->templates->render($nomeTemplate);
			}
			catch(\Exception $ex){
				echo "não encontrado";
			}
		}
	}
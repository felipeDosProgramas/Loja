<?php
	namespace MiddleWares\RotasUser;
	
	use MiddleWares\Rota;
	
	class RotasUser extends Rota{
		function __construct(){
			parent::__construct();
		}
		function js($data){
			header("Content-type: application/javascript");
			parent::renderizar("User/js/{$data['contexto']}/{$data['nome']}");
		}
		function css($data){
			header("Content-type: text/css");
			parent::renderizar("User/cssUser/style.css");
		}
		function imgs($data){
			parent::renderizar("../imgs/{$data['nome']}");
		}
		function verTodasPrevias($data){
			parent::renderizar("User/pages/anuncioPrevia.html");
		}
		function verEssaPrevia($data){
			parent::renderizar("User/pages/pagePrevia.php");
		}
		function video($data){
			header("Content-type: video/mp4");
			parent::renderizar("User/videos/{$data['nome']}");
		}
		function telaInicial($data){
			header("Content-type: text/html");
			parent::renderizar("User/pages/inicio.html");
		}
		function telaVideo($data){
			parent::renderizar("User/pages/telaInicialVideo.html");
		}
	}
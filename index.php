<?php
	require __DIR__."/vendor/autoload.php";

	$router = new CoffeeCode\Router\Router("http://localhost/pigs/gitHub/Loja");

	$router->namespace("MiddleWares\RotasUser");
	$router->group(null);
	$router->get("/", "RotasUser:telaVideo");
	$router->get("/home", "RotasUser:telaInicial");
	$router->get("/previas","RotasUser:verTodasPrevias");
	$router->get("/previa","RotasUser:verEssaPrevia");
	$router->get("/cssUser", "RotasUser:css");
	$router->get("/video/{nome}", "RotasUser:video");
	$router->get("/js/{contexto}/{nome}", "RotasUser:js");
	$router->get("/imgs/{nome}", "RotasUser:imgs");

	$router->dispatch();
	if($router->error()){
		echo "nn foi dessa vez {$router->error()}";
	}
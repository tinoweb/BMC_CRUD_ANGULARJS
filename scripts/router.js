'use strict';

angular.module('Client', ['ngResource', 'ngRoute'])
	.config(function($routeProvider){
		$routeProvider
		.when('/produtos', {
			templateUrl: 'views/produto/index.html',
			controller: 'IndexProdutoCtrl'
		})
		.when('/produto/novo', {
			templateUrl: 'views/produto/novo.html',
			controller: 'CreateProdutoCtrl'
		})
		.when('/produto/mostrar/:id', {
			templateUrl: 'views/produto/mostrar.html',
			controller: 'MostrarProdutoCtrl'
		})
		.when('/produto/edit/:id', {
			templateUrl: 'views/produto/novo.html',
			controller: 'EditProdutoCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
		
	});

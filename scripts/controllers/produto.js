'use strict';

angular.module('Client')
.controller('IndexProdutoCtrl', function ($scope, ProdutoGet, ProdutoDelete, $timeout, $location) {
	var valor = ProdutoGet.query();
	valor.$promise.then(function() {
		for (var i = 0; i < valor.length; i++) {
			if (valor[i].ativo == 1) {
				valor[i].ativo = 'sim';
			}else{
				valor[i].ativo = 'não';
			}
		}
	});

	$scope.Produtos = valor;

	$scope.removeProduto = function(id) {
		ProdutoDelete.delete({ id: id });
		toastr["success"]("Produto excluido com sucesso!");
		$timeout(function() {
			$location.path('/produtos');
		}, 1000);
	};
})

.controller('CreateProdutoCtrl', function($scope, ProdutoSendImage, ProdutoNew, $timeout, $location) {
	$scope.titulo = "Cadastrar Produto";
	$scope.btnSalvar = "Salvar produto";
	$scope.imgem = false; // show img element or not
	$scope.Produto = {};
	var todos = {};
	$scope.img = null;
	var imObj = {};
		
		$scope.getImageFile = function(argument) {
			var formData = new FormData();
			$scope.img = argument.files['0'];
			formData.append('file', argument.files['0']);
			$scope.$apply();
			ProdutoSendImage.save(formData);
		}
		
	$scope.saveProduto = function() {
	
		imObj = {'imagem': $scope.img.name};
		Object.assign(todos, $scope.Produto, imObj)
		ProdutoNew.save(todos);
		toastr["success"]("Produto criado com sucesso!");
		$timeout(function() {
			$location.path('/produtos');
		}, 1500);

	}

})
.controller('EditProdutoCtrl', function ($scope, ProdutoUpdate, ProdutoSendImage, ProdutoEdit, $timeout, $location, $routeParams) {
	$scope.titulo = "Editar Produto";
	$scope.btnSalvar = "Atualizar produto";
	$scope.img = null;
	$scope.imgem = true; // show image on edit or not
	var imObj = {};
	var todos = {};
	var produtos;

	produtos = ProdutoEdit.get({
		id: $routeParams.id
	});

	produtos.$promise.then(function() {
		if (produtos.ativo == 1) {
			produtos.ativo = true;
		}
	});

	$scope.Produto = produtos;
	var temImagem = false;
		$scope.getImageFile = function(argument) {
			var formData = new FormData();
			$scope.img = argument.files['0'];
			formData.append('file', argument.files['0']);
			$scope.$apply();
			if (ProdutoSendImage.save(formData)) {
				temImagem = true;
			}
			

		}

	$scope.saveProduto = function() {
		if (temImagem) {
			imObj = {'imagem': $scope.img.name};
			Object.assign(todos, $scope.Produto, imObj);
			ProdutoUpdate.update({ id: $scope.Produto.id }, todos);
			toastr["success"]("Produto Atualizado com sucesso!");
			$timeout(function() {
				$location.path('/produtos');
			}, 1500);
		}else{
			ProdutoUpdate.update({ id: $scope.Produto.id }, $scope.Produto);
			toastr["success"]("Produto Atualizado com sucesso!");
			$timeout(function() {
				$location.path('/produtos');
			}, 1500);
		}
	}

})
.controller('MostrarProdutoCtrl', function ($scope, ProdutoMostrar, $routeParams) {
	var retorno;
	retorno = ProdutoMostrar.get({
		id: $routeParams.id
	});
	retorno.$promise.then(function() {
		if (retorno.ativo == 1) {
			retorno.ativo = 'sim';
		}else{
			retorno.ativo = 'não';
		}
	});

	$scope.Produto = retorno;
})

;

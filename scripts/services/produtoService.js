'use strict';

angular.module('Client')
.factory('ProdutoGet',function ($resource) {
	return  $resource("http://localhost:8000/api/produtos");
})
.factory('ProdutoNew',function ($resource) {
	return  $resource("http://localhost:8000/api/produtos");
})
.factory('ProdutoEdit',function ($resource) {
	return  $resource("http://localhost:8000/api/produtos/edit/:id", {id: "@id"});
})
.factory('ProdutoMostrar',function ($resource) {
	return  $resource("http://localhost:8000/api/produtos/show/:id", {id: "@id"});
})
.factory('ProdutoUpdate',function ($resource) {
	return  $resource("http://localhost:8000/api/produtos/update/:id", {id: "@id"}, {'update': { method:'PUT' }});
})
.factory('ProdutoDelete',function ($resource) {
	return  $resource("http://localhost:8000/api/produtos/delete/:id", {id: "@id"});
})
.factory('ProdutoSendImage',function ($resource) {
	return  $resource("http://localhost:8000/api/produtos",{}, {
            save: {
                method: 'POST',
                transformRequest: angular.identity,
                headers: { 
                		'Content-Type': undefined
                	}
            }});
})
;
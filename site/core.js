(function() {
	'use strict';
	
	var app = angular.module('nodegular', []);

	app.controller('mainController', ['$scope', '$http', mainController]);
	
	function mainController($scope, $http)
	{
		$http.get("/api")
			.success(function(data) {				
				$scope.randomData = data;
			})
			.error(function(data) {
				console.log("Error: " + data);
			});
	}	
})();
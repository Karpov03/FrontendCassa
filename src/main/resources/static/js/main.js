var mainApp = angular.module("mainApp", [ 'ngRoute' ]);

mainApp.config([ '$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
} ]);

mainApp.config(function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl : 'views/home.html',
		controller : 'StudentController'
	}).when('/viewStudents', {
		templateUrl : 'views/viewStudents.html',
		controller : 'StudentController'
	}).otherwise({
		redirectTo : '/'
	});
});

var userRepoService = function($http) {

	var getUsers = function(username) {
		return $http
				.get("http://localhost:999/MegatechEnterprise/site/getSite")
				.then(function(response) {
					return response.data;
				});
	};

	return {
		get : getUsers
	};

};

mainApp.factory("userRepoService", userRepoService);

var UsersController = function($scope, userRepoService) {

	var onFetchError = function(message) {
		$scope.error = "Error Fetching Users. Message:" + message;
	};

	var onFetchCompleted = function(data) {
		$scope.users = data;
	};

	var getUsers = function() {
		userRepoService.get().then(onFetchCompleted, onFetchError);
	};

	getUsers();

};

mainApp.controller("UsersController", UsersController);

mainApp.controller('siteCtrl', function($scope, $http) {
	$http.get("http://localhost:999/MegatechEnterprise/site/getSite").then(
			function(response) {
				$scope.sites = response.data; // response data

			});
});
mainApp.controller('areaCtrl', function($scope, $http) {
	$http.get("http://localhost:999/MegatechEnterprise/area/getArea").then(
			function(response) {
				$scope.areas = response.data; // response data

			});
});
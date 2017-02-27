//mainApp.config([ '$locationProvider', function($locationProvider) {
//	$locationProvider.html5Mode(true).hashPrefix("");
//} ]);


mainApp.config(["$stateProvider", "$urlRouterProvider",'$locationProvider',
    function($stateProvider, $urlRouterProvider,$locationProvider){

	$urlRouterProvider.otherwise("/home");
	
	$stateProvider.state("home", {

		url : "/home",
		templateUrl : 'views/content.html',
		controller : 'RouteController',

	}).state("area", {

		url : "/area/:id",
		templateUrl : 'views/content.html',
		controller : 'RouteController',
		// default uri params
		params : {
			id : '1'
		}

	});
	$locationProvider.html5Mode(true);

}]);

/*
 * mainApp.config(function($routeProvider) { $routeProvider.when('/home', {
 * templateUrl : 'views/content.html', controller : 'RouteController'
 * }).when('/area/RM3-A (Floor)', { templateUrl : 'views/content.html',
 * controller : 'RouteController' }).otherwise({ redirectTo : '/' }); });
 */



/*
 * mainApp.controller('ChartController', function($scope, $http) { $scope.config = {
 * title : 'Products', tooltips : true, labels : true, mouseover : function() { },
 * mouseout : function() { }, click : function() { }, legend : { display : true, //
 * could be 'left, right' position : 'right' } };
 * 
 * var chdata = $http.get(
 * "https://megatechenterprise.mybluemix.net/site/getSite").then(
 * function(response) { return response.data.value; // response data },
 * function(error) { alert('Error!'); });
 * 
 * $scope.data = { series : [ 'Sales', 'Income', 'Expense', 'Laptops',
 * 'Keyboards' ], data : [ { x : "Laptops", y : [ 200, 300 ] }, { x :
 * "Desktops", y : [ 300, 100, 100 ] }, { x : "Mobiles", y : [ 351 ] }, { x :
 * "Tablets", y : [ 54, 0, 879 ] } ] }; });
 */

var chartService = function($http) {

	var getDatas = function() {
		return $http.get(
				"https://energyiotcassandra.mybluemix.net/tags/gettimedata")
				.then(function(response) {
					return response.data;
				});
	};

	return {
		get : getDatas
	};

};

mainApp.factory("chartService", chartService);
var chartController = function($scope, chartService) {

	$scope.labels = [];
	// $scope.series = [ 'Series A', 'Series B' ];

	$scope.data = [];

	$scope.colors = [ {
		fillColor : 'rgba(40,0,40, 1)',
		strokeColor : 'rgba(0,40,0, 0.8)',
		highlightFill : 'rgba(40,0,0, 0.8)',
		highlightStroke : 'rgba(0,40,40, 0.8)'
	} ];

	$scope.datasetOverride = [ {
		label : "Bar chart",
		borderWidth : 3,
		hoverBackgroundColor : "rgba(255,99,132,0.4)",
		hoverBorderColor : "rgba(255,99,132,1)",
		backgroundColor : "rgba(0,80,80,0.4)",
		type : 'bar',

	} ];

	var onFetchError = function(message) {
		$scope.error = "Error Fetching Users. Message:" + message;
	};

	var onFetchCompleted = function(data) {
		// $scope.data.push(data[0].value);
		console.log("Hello" + data);

		angular.forEach(data, function(data) {
			$scope.labels.push(data.tagid);
			$scope.data.push(data.value);

		});

	};

	var getDatas = function() {
		chartService.get().then(onFetchCompleted, onFetchError);
	};

	getDatas();

};

mainApp.controller("chartController", chartController);



mainApp
		.controller(
				'RouteController',
				[
						'$scope',
						'$http',
						'$stateParams',
						function($scope, $http, $stateParams) {
							// Make an AJAX call, retrieving the state.

							$http
									.get(
											"https://energyiotcassandra.mybluemix.net/tags/gettimedata")
									.then(function(response) {
										$scope.ClickedList = response.data;// response
										// data

									}, function(error) {
										alert('Error!');
									});
						} ]);

var ListController = function($scope, $http) {

	var $this = this;
	$http.get("https://megatechenterprise.mybluemix.net/site/getSite").then(
			function(response) {
				$this.SiteList = response.data; // response data

			}, function(error) {
				alert('Error!');
			});

	$this.doSomething = function(clickedId, nameId) {

		// alert("Clicked Id is "+clickedId);

		console.log("Clicked Id is " + clickedId + " : " + nameId)

		$http.get(
				"https://energyiotcassandra.mybluemix.net/tags/gettag/10"
						+ clickedId).then(function(response) {
			$this.ClickedList = response.data;// response data

		}, function(error) {
			alert('Error!');
		});

	};

}

mainApp.controller('ListController', ListController);

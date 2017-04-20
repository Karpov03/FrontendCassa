//mainApp.config([ '$locationProvider', function($locationProvider) {
//	$locationProvider.html5Mode(true).hashPrefix("");
//} ]);

mainApp.config([ "$stateProvider", "$urlRouterProvider", '$locationProvider',
		function($stateProvider, $urlRouterProvider, $locationProvider) {

			$urlRouterProvider.otherwise("/home/15");

			$stateProvider.state("home", {

				url : "/home/:id",
				templateUrl : 'views/home-content.html',
				controller : 'RouteController',
				params : {
					id : '15'
				}

			}).state("login", {

				url : "/login",
				templateUrl : 'login.html',
				controller : 'RouteController',

			}).state("area", {

				url : "/area/:id",
				templateUrl : 'views/site-content.html',
				controller : 'RouteController',
				// default uri params
				params : {
					id : '15'
				}

			});
			$locationProvider.html5Mode(true);

		} ]);

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



mainApp
		.controller(
				'RouteController',
				[
						'$scope',
						'$http',
						'$rootScope',
						'$stateParams',
						function($scope, $http, $rootScope, $stateParams) {
							// Make an AJAX call, retrieving the state.

							/*
							 * $http .get(
							 * "https://energyiotbackdev.mybluemix.net/tags/getlist")
							 * .then(function(response) { $scope.ClickedList1 =
							 * response.data;// response // data
							 *  }, function(error) { // alert('Error!'); });
							 */

							
							var resetdate=function(){
								

								$rootScope.myDateRange.startDate = new Date().getTime() - 43200000;
								$rootScope.myDateRange.endDate = new Date().getTime();
								
									
							}
							
							 var id = $stateParams.id;
							
							//console.log("Defined id:" +id);
							
							$scope.gettag15 = function() {
								
								resetdate();
								$http
										.get(
												"https://energyiotbackdev.mybluemix.net/logics/sum/"+id+"/"
														+ $rootScope.myDateRange.startDate
														+ "/"
														+ $rootScope.myDateRange.endDate)
										.then(
												function(response) {
													$rootScope.myDateRange.tagValue15 = response.data;
													$rootScope.myDateRange.tagValue15 = $rootScope.myDateRange.tagValue15 / 36000;
																									
													console.log("Avg Date is "
																	+ $rootScope.myDateRange.tagValue15)
												}, function(error) {
													// alert('Error!');
												});

							};
							
							
							$scope.gettag16 = function() {
								$http
										.get(
												"https://energyiotbackdev.mybluemix.net/logics/sum/16/"
														+ $rootScope.myDateRange.startDate
														+ "/"
														+ $rootScope.myDateRange.endDate)
										.then(
												function(response) {
													$rootScope.myDateRange.tagValue16 = response.data;
													$rootScope.myDateRange.tagValue16 = $rootScope.myDateRange.tagValue16 / 36000;
													console
															.log("Avg Date is "
																	+ $rootScope.myDateRange.tagValue16)
												}, function(error) {
													// alert('Error!');
												});

							};
							
							$scope.gettag17 = function() {
								$http
										.get(
												"https://energyiotbackdev.mybluemix.net/logics/sum/17/"
														+ $rootScope.myDateRange.startDate
														+ "/"
														+ $rootScope.myDateRange.endDate)
										.then(
												function(response) {
													$rootScope.myDateRange.tagValue17 = response.data;
													$rootScope.myDateRange.tagValue17 = $rootScope.myDateRange.tagValue17 / 36000;
													console
															.log("Avg Date is "
																	+ $rootScope.myDateRange.tagValue17)
												}, function(error) {
													// alert('Error!');
												});

							};
							

						}

				]);

var ListController = function($scope, $http) {

	var $this = this;


	$this.doSomething = function(clickedId, nameId) {

		console.log("Clicked Id is " + clickedId + " : " + nameId)

	};

}

mainApp.controller('ListController', ListController);

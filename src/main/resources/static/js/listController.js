mainApp
		.controller('ListController', function($scope, SiteService) {
			$scope.getID = null;
			$scope.Result1 = "";

			SiteService.GetInfo().then(function(d) {
				$scope.SiteList = d.data; // success
			}, function(error) {
				alert('Error!');
			});
			
			
			$scope.ShowArea = function() {
				$scope.Result1 = "Selected Country ID";
			}

		})
		.factory(
				'SiteService',
				function($http) { // factory methos to get data from server.
					var fac = {};
					fac.GetInfo = function() {
						return $http
								.get('http://localhost:999/MegatechEnterprise/site/getSite')
					}

					return fac;
				});


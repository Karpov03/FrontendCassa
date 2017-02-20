

mainApp.controller('ListController', function($scope, $http) {
	$http.get("http://localhost:999/MegatechEnterprise/site/getSite").then(
			function(response) {
				$scope.SiteList = response.data; // response data

			}, function(error) {
				alert('Error!');
			});
	
	  $scope.doSomething = function(clickedId){
//		  alert("Clicked Id is "+clickedId);
		  console.log("Clicked Id is "+clickedId)
		  
		  $http.get("http://localhost:888/energycassiot/tags/gettag/10"+clickedId).then(
					function(response) {
						$scope.ClickedList = response.data; // response data

					}, function(error) {
						alert('Error!');
					});
		  
		  
		  
	  };

});
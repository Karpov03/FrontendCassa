
var ListController= function($scope, $http) {
	
	var $this=this;
	$http.get("https://megatechenterprise.mybluemix.net/site/getSite").then(
			function(response) {
				$this.SiteList = response.data; // response data

			}, function(error) {
				alert('Error!');
			});
	
	$this.doSomething = function(clickedId,nameId){


//		  alert("Clicked Id is "+clickedId);

		  console.log("Clicked Id is "+clickedId+" : "+nameId)
		  
		  $http.get("https://energyiotcassandra.mybluemix.net/tags/gettag/10"+clickedId).then(
					function(response) {
						$this.ClickedList = response.data;// response data
					

					}, function(error) {
						alert('Error!');
					});
		  
		  
		  
	  };
	 
}

mainApp.controller('ListController', ListController);



var ListController= function($scope, $http) {
	
	var $this=this;
	$http.get("http://localhost:999/MegatechEnterprise/site/getSite").then(
			function(response) {
				$this.SiteList = response.data; // response data

			}, function(error) {
				alert('Error!');
			});
	
	$this.doSomething = function(clickedId,nameId){


//		  alert("Clicked Id is "+clickedId);

		  console.log("Clicked Id is "+clickedId+" : "+nameId)
		  
		  $http.get("http://localhost:888/energycassiot/tags/gettag/10"+clickedId).then(
					function(response) {
						$this.ClickedList = response.data;// response data
					

					}, function(error) {
						alert('Error!');
					});
		  
		  
		  
	  };
	  
	  $this.calculateAverage = function(MyData){ 
		 console.log(Mydata.length);
		    var sum = 0; 
		    for(var i = 0; i < MyData.length; i++){
		        sum += parseInt(MyData[i], 10); //don't forget to add the base 
		    }

		    var avg = sum/MyData.length;

		    return avg; 
		};
}

mainApp.controller('ListController', ListController);


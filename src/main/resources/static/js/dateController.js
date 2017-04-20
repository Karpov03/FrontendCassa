mainApp.run(function($rootScope) {

	$rootScope.myDateRange = {};
	$rootScope.myDateRange.startDate = new Date().getTime() - 43200000;
	$rootScope.myDateRange.endDate = new Date().getTime();

});


//Calender Control
mainApp.controller('dateCtrl', function($scope, $rootScope, $http,$stateParams) {

	// $scope.myDateRange
	// $scope.myDateRange= {startDate: "2016-06-05T18:30:00.000Z", endDate:
	// "2017-02-12T18:29:59.999Z"};

	$scope.getDate = function(sDate, eDate) {

		$rootScope.myDateRange.startDate = new Date(sDate).getTime();
		$rootScope.myDateRange.endDate = new Date(eDate).getTime();

		console.log("Selected Date is " + $rootScope.myDateRange.startDate
				+ " : " + $rootScope.myDateRange.endDate)

		$http.get(
				"https://energyiotbackdev.mybluemix.net/logics/sum/15/"
						+ $rootScope.myDateRange.startDate + "/"
						+ $rootScope.myDateRange.endDate).then(
				function(response) {
					$rootScope.myDateRange.tagValue15 = response.data;
					$rootScope.myDateRange.tagValue15 = $rootScope.myDateRange.tagValue15 /36000;
					
					console.log("Avg Date is "
							+ $rootScope.myDateRange.tagValue15)

				}, function(error) {
					// alert('Error!');
				});

	}
	// $scope.datePicker.date = {startDate: null, endDate: null};

	
	
	$scope.getBWeek = function() {

		var today = new Date();
		$rootScope.myDateRange.nextWeek = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7));
		$rootScope.myDateRange.previousWeek = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7));
		

		console.log("Selected Date is " + $rootScope.myDateRange.startDate
				+ " : " + $rootScope.myDateRange.endDate)

		$http.get(
				"https://energyiotbackdev.mybluemix.net/logics/sum/15/"
						+ $rootScope.myDateRange.previousWeek + "/"
						+ $rootScope.myDateRange.nextWeek).then(
				function(response) {
					$rootScope.myDateRange.tagValue15 = response.data;
					$rootScope.myDateRange.tagValue15 = $rootScope.myDateRange.tagValue15 /36000;
					
					console.log("Avg Date is "
							+ $rootScope.myDateRange.tagValue15)

				}, function(error) {
					// alert('Error!');
				});

	}
	
	$scope.getFWeek = function() {

		$rootScope.myDateRange.startWeek = new Date().getTime()*604800000;
		$rootScope.myDateRange.endWeek = new Date().getTime();

		console.log("Selected Date is " + $rootScope.myDateRange.startDate
				+ " : " + $rootScope.myDateRange.endDate)

		$http.get(
				"https://energyiotbackdev.mybluemix.net/logics/sum/15/"
						+ $rootScope.myDateRange.startWeek + "/"
						+ $rootScope.myDateRange.endWeek).then(
				function(response) {
					$rootScope.myDateRange.tagValue15 = response.data;
					$rootScope.myDateRange.tagValue15 = $rootScope.myDateRange.tagValue15 /36000;
					
					console.log("Avg Date is "
							+ $rootScope.myDateRange.tagValue15)

				}, function(error) {
					// alert('Error!');
				});

	}
	
});

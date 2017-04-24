mainApp.run(function($rootScope) {

	$rootScope.myDateRange = {};
	$rootScope.myDateRange.startDate = new Date().getTime() - 43200000;
	$rootScope.myDateRange.endDate = new Date().getTime();

});


//Calender Control
mainApp.controller('dateCtrl', function($scope, $rootScope, $http,$stateParams,$interval) {

	// $scope.myDateRange
	// $scope.myDateRange= {startDate: "2016-06-05T18:30:00.000Z", endDate:
	// "2017-02-12T18:29:59.999Z"};
	
	var today=new Date().getTime();
	var yesterday=new Date().getTime() - 43200000;
	
	console.log(today+" : "+yesterday);
	
	$scope.ranges= {
        "Today": [
            "2017-04-21T08:16:38.824Z",
            "2017-04-21T08:16:38.824Z"
        ],
        "Yesterday": [
            "2017-04-20T08:16:38.824Z",
            "2017-04-20T08:16:38.824Z"
        ],
        "Last 7 Days": [
            "2017-04-15T08:16:38.824Z",
            "2017-04-21T08:16:38.824Z"
        ],
        "Last 30 Days": [
            "2017-03-23T08:16:38.824Z",
            "2017-04-21T08:16:38.824Z"
        ],
        "This Month": [
            "2017-03-31T18:30:00.000Z",
            "2017-04-30T18:29:59.999Z"
        ],
        "Last Month": [
            "2017-02-28T18:30:00.000Z",
            "2017-03-31T18:29:59.999Z"
        ]
    };
	
	
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
					$rootScope.myDateRange.tagValue15 = $rootScope.myDateRange.tagValue15;
					
					//console.log("Avg Date is "	+ $rootScope.myDateRange.tagValue15)

				}, function(error) {
					// alert('Error!');
				});

	}
	// $scope.datePicker.date = {startDate: null, endDate: null};

	
});

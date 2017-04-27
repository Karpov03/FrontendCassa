mainApp.run(function($rootScope) {

    $rootScope.myDateRange = {};
    $rootScope.myDateRange.startDate = new Date().getTime() - 43200000;
    $rootScope.myDateRange.endDate = new Date().getTime();

});





mainApp
    .controller(
        'SiteController', [
            '$scope',
            '$http',
            '$rootScope',
            '$stateParams',
            '$interval',
            function($scope, $http, $rootScope, $stateParams,
                $interval) {

                var today = new Date().getTime();
                var sixhours = new Date().getTime() -  21600000;
                var twelve_hours = new Date().getTime() -  43200000;
                var twofourhours = new Date().getTime() -  86400000;
                var sevendays = new Date().getTime() -  604800000;
                var thirtydays = new Date().getTime() -  2592000000;
                $scope.startDate = new Date().getTime() - 14400000;
                $scope.endDate = new Date().getTime();

                console.log(today + " : " + sixhours);
                
                var sid = $stateParams.id;
                var sid1 = parseInt(sid) + parseInt(1);
                var sid2 = parseInt(sid) + parseInt(2);

                console.log("Defined id:" + sid1);

                $scope.ranges = {
                	"Last 6 Hours": [
                                 sixhours,today
                        ],
                		"Last 12 Hours": [
                			twelve_hours,today
                    ],
                    "Last 24 Hours": [
                    	twofourhours,today
                    ],
                    "Last 7 Days": [
                    	sevendays,today
                    ],
                    "Last 30 Days": [
                    	thirtydays,today
                    ]
                };



                $scope.getDate = function(sDate, eDate) {

                	
                	   console.log("Defined id:" + sid);
                	$scope.startDate = new Date(sDate).getTime();
                	$scope.endDate = new Date(eDate).getTime();

                    console.log("Selected Date is " + startDate +
                        " : " + endDate)
                        
                        
                        $scope.getAreaCharts($scope.startDate,$scope.endDate);

                    $http.get(
                        "https://energyiotbackdev.mybluemix.net/logics/sum/15,16,17/" +
                        $scope.startDate + "/" +
                        $scope.endDate).then(
                        function(response) {
                          $scope.tagValue15 = response.data;
                          

                            //console.log("Avg Date is "	+ $rootScope.myDateRange.tagValue15)

                        },
                        function(error) {
                            // alert('Error!');
                        });

                }
                // $scope.datePicker.date = {startDate: null, endDate: null};




                function addZero(i) {
                    if (i < 10) {
                        i = "0" + i;
                    }
                    return i;
                }



                $scope.getAreaCharts = function(sDate, eDate) {
					
					
					
					$scope.chart1_label = [];
                var chart1_area1 = [];
				var chart1_area2 = [];
				var chart1_area3 = [];
                $scope.chart1_series = [ 'AL WAHDAH', 'AL ROWDAH', 'AL MUSHRIF' ];
                $scope.chart1_data = [];

                $scope.chart1_colours = [{ // default
                        "fillColor": "rgba(253,180,74,.6)",
                        "strokeColor": "rgba(253,180,94,.7)",
                        "pointColor": "rgba(253,180,104,.2)",
                        "pointStrokeColor": "rgba(253,180,124,.3)",
                        "pointHighlightFill": "rgba(253,180,174,.5)",
                        "pointHighlightStroke": "rgba(253,180,174,.7)"
                },{ // default
                    "fillColor": "rgba(53,162,203,.6)",
                    "strokeColor": "rgba(53,162,228,.7)",
                    "pointColor": "rgba(53,162,248,.2)",
                    "pointStrokeColor": "rgba(53,162,278,.3)",
                    "pointHighlightFill": "rgba(53,162,288,.5)",
                    "pointHighlightStroke": "rgba(53,162,288,.7)"
                },{ // default
                	   "fillColor": "rgba(151,211,78,.6)",
                       "strokeColor": "rgba(151,211,98,.7)",
                       "pointColor": "rgba(151,211,58,.2)",
                       "pointStrokeColor": "rgba(151,211,108,.3)",
                       "pointHighlightFill": "rgba(151,211,128,.5)",
                       "pointHighlightStroke": "rgba(151,211,128,.7)"
                }];

                $scope.options = {
                   
                    legend: {
                        display: true
                    },
                    responsive: false
                }


                    startCDate = new Date(sDate).getTime();
                    endCDate = new Date(eDate).getTime();
                    $scope.chart1_label.length=0;
                    $scope.chart1_data.length=0;

					//getting area 1 data
                    $http.get(
                        "https://energyiotbackdev.mybluemix.net/tags/gettag/15/" +
                       startCDate + "/" +
                      endCDate).then(function(response) {

                        angular.forEach(response.data, function(data) {
                            var d = new Date(data.timestamps);
                            var h = addZero(d.getHours());
                            var m = addZero(d.getMinutes());
                            var s = addZero(d.getSeconds());
                            var t = h + ":" + m + ":" + s;

                            $scope.chart1_label.push(t);

                            // $scope.labels.push(data.timestamps);
                            chart1_area1.push(data.value);
                            // console.log("Timestamps : " + data.timestamps+ "\nValues : " +
                            // data.value);

                        });

                        $scope.chart1_data.push(chart1_area1);
                    });
					
					
					//getting area 2 data
                    $http.get(
                        "https://energyiotbackdev.mybluemix.net/tags/gettag/16/" +
                       startCDate + "/" +
                      endCDate).then(function(response) {

                        angular.forEach(response.data, function(data) {
                           
                            chart1_area2.push(data.value);
                           
                        });

                        $scope.chart1_data.push(chart1_area2);
                    });
					
					//getting area 2 data
                    $http.get(
                        "https://energyiotbackdev.mybluemix.net/tags/gettag/17/" +
                       startCDate + "/" +
                      endCDate).then(function(response) {

                        angular.forEach(response.data, function(data) {
                           
                            chart1_area3.push(data.value);
                           
                        });

                        $scope.chart1_data.push(chart1_area3);
                    });

					
					
					
					
					
					
                }//getAreaCharts finished
				
				
				
                
                //getBarCharts Starts
                $scope.getBarCharts = function(sDate, eDate) {
					
                	
				$scope.chart2_series = ['Actual Consumption' , 'Areawise Plan'];	
                
                $scope.chart2_label = ['AL WAHDAH', 'AL ROWDAH', 'AL MUSHRIF'];
                var chart2_bardata = [];
                var chart2_bardata1 = [];

                $scope.chart2_data = [];
                

                $scope.chart2_colours = [{ // default
                    "fillColor": "rgba(151,211,78,.8)",
                    "strokeColor": "rgba(151,211,98,.7)"
                }, { // default
                    "fillColor": "rgba(53,162,203,.8)",
                    "strokeColor": "rgba(53,162,273,.7)"
                }];
                	
                	
                     $scope.chart2_data.length=0;

					 
                
                     $http.get( "https://energyiotbackdev.mybluemix.net/logics/sum/15/" +
                    		 $scope.startDate + "/" +
                             $scope.endDate).then(function(response) {

                            	 console.log("Bar"+$scope.startDate);
                            	 console.log("Bar"+$scope.endDate);
                        chart2_bardata1.push(response.data);

                       
                     });
                     chart2_bardata.push(3000);

                     
                     $http.get( "https://energyiotbackdev.mybluemix.net/logics/sum/16/" +
                             $scope.startDate + "/" +
                             $scope.endDate).then(function(response) {

                     	console.log("bar1 called");
                        chart2_bardata1.push(response.data);

                       
                     });chart2_bardata.push(3500);

                     
                    
                     $http.get( "https://energyiotbackdev.mybluemix.net/logics/sum/17/" +
                             $scope.startDate + "/" +
                             $scope.endDate).then(function(response) {

                     	console.log("bar1 called");
                        chart2_bardata1.push(response.data);

                       
                     }); chart2_bardata.push(2500);

                 
                     $scope.chart2_data.push(chart2_bardata1);
                     $scope.chart2_data.push(chart2_bardata);
                    
             
             
                }

                var resetdate = function() {

                   startDate = new Date()
                        .getTime() - 43200000;
                  endDate = new Date()
                        .getTime();

                }

                $scope.counter = 0;
                $scope.incrementCounter = function() {
                    $scope.counter += 1;
                }



                $scope.refreshTag = function() {
                    $scope.gettag15();
                   
                   }
                var promise;
                var promise1;


                // starts the interval
                $scope.start = function() {
                    $scope.stop();

                    promise = $interval($scope.refreshTag, 1000);
                    promise1 = $interval($scope.incrementCounter, 500);
                };

                $scope.stop = function() {
                    $interval.cancel(promise);
                    $interval.cancel(promise1);
                };

                $scope.start();

                $scope.$on('$destroy', function() {
                    $scope.stop();
                });

                $scope.gettag15 = function() {

                    resetdate();
                    $http
                        .get(
                            "https://energyiotbackdev.mybluemix.net/logics/sum/15,16,17/"+
                           $scope.startDate +
                            "/" +
                            $scope.endDate)
                        .then(
                            function(response) {
                              $scope.tagValue15 = response.data;
                                

                                //console.log("Avg Date is "+ $rootScope.myDateRange.tagValue15)
                            },
                            function(error) {
                                // alert('Error!');
                            });

                };


            }

        ]); //End of AreaController

var ListController = function($scope, $http) {

    var $this = this;

    $this.doSomething = function(clickedId, nameId) {

        console.log("Clicked Id is " + clickedId + " : " + nameId)

    };

}

mainApp.controller('ListController', ListController);
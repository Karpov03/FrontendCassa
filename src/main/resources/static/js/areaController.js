mainApp.run(function($rootScope) {

    $rootScope.myDateRange = {};
    $rootScope.myDateRange.startDate = new Date().getTime() - 43200000;
    $rootScope.myDateRange.endDate = new Date().getTime();

});





mainApp
    .controller(
        'AreaController', [
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


                
                
                var $this = this;

                $this.doSomething = function(clickedId, nameId) {

                    console.log("Clicked Id is " + clickedId + " : " + nameId)
                    
                    $scope.getAreaCharts($scope.startDate,$scope.endDate);
                    $scope.getBarCharts();

                };
                
                
                

                $scope.getDate = function(sDate, eDate) {

                	
                	   console.log("Defined id:" + sid);
                	$scope.startDate = new Date(sDate).getTime();
                	$scope.endDate = new Date(eDate).getTime();

                    console.log("Selected Date is " + startDate +
                        " : " + endDate)
                        
                        
                        $scope.getAreaCharts($scope.startDate,$scope.endDate);
                    $scope.getBarCharts($scope.startDate,$scope.endDate);

                    $http.get(
                        "https://energyiotbackdev.mybluemix.net/logics/sum/"+sid+"/" +
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



                $scope.chart1_label = [];
                var chart1_tempdata = [];
                //$scope.chart1_series = [ 'Series A', 'SeriesB' ];
                $scope.chart1_data = [];

                $scope.chart1_colours = [{ // default
                    "fillColor": "rgba(151,211,78,.6)",
                    "strokeColor": "rgba(151,211,98,.7)",
                    "pointColor": "rgba(151,211,58,.2)",
                    "pointStrokeColor": "rgba(151,211,108,.3)",
                    "pointHighlightFill": "rgba(151,211,128,.5)",
                    "pointHighlightStroke": "rgba(151,211,128,.7)"
                }];

                $scope.chart1_options = {
                    scales: {
                        yAxes: [{
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        }]
                    },
                    legend: {
                        display: false
                    },
                    responsive: false
                }

                $scope.chart2_label = [];
                var chart2_light = [];
                var chart2_ac = [];

                $scope.chart2_data = [];
                $scope.chart2_series = ['Light' , 'A/C'];

                $scope.chart2_colours = [{ // default
                    "fillColor": "rgba(151,211,78,.6)",
                    "strokeColor": "rgba(151,211,98,.7)"
                }, { // default
                    "fillColor": "rgba(53,162,203,.6)",
                    "strokeColor": "rgba(53,162,273,.7)"
                }];
				
				$scope.chart2_options = {
                    scales: {
                        yAxes: [{
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        }]
                    },
                    legend: {
                        display: false
                    },
                    responsive: false
                }

                function addZero(i) {
                    if (i < 10) {
                        i = "0" + i;
                    }
                    return i;
                }



                $scope.getAreaCharts = function(sDate, eDate) {

                    startCDate = new Date(sDate).getTime();
                    endCDate = new Date(eDate).getTime();
                    $scope.chart1_label.length=0;
                    $scope.chart1_data.length=0;

                    $http.get(
                        "https://energyiotbackdev.mybluemix.net/tags/gettag/" + sid + "/" +
                      $scope.startDate + "/" +
                      $scope.endDate).then(function(response) {

                        angular.forEach(response.data, function(data) {
                            var d = new Date(data.timestamps);
                            var h = addZero(d.getHours());
                            var m = addZero(d.getMinutes());
                            var s = addZero(d.getSeconds());
                            var t = h + ":" + m + ":" + s;

                            $scope.chart1_label.push(t);

                            // $scope.labels.push(data.timestamps);
                            chart1_tempdata.push(data.value);
                            // console.log("Timestamps : " + data.timestamps+ "\nValues : " +
                            // data.value);

                        });

                        $scope.chart1_data.push(chart1_tempdata);
                    });

                }
                
                
                $scope.getBarCharts = function(sDate, eDate) {

                    startCDate = new Date(sDate).getTime();
                    endCDate = new Date(eDate).getTime();
                    $scope.chart2_label.length=0;
                    $scope.chart2_data.length=0;
                $http.get( "https://energyiotbackdev.mybluemix.net/tags/gettag/" + sid + "/" +
                       $scope.startDate + "/" +
                      $scope.endDate).then(function(response) {

                    	console.log("bar1 called"+sid);
                        angular.forEach(response.data, function(data) {
                        	
                            var d = new Date(data.timestamps);
                            var h = addZero(d.getHours());
                            var m = addZero(d.getMinutes());
                            var s = addZero(d.getSeconds());
                            var t = h + ":" + m + ":" + s;

                            $scope.chart2_label.push(t);

                            // $scope.labels.push(data.timestamps);
                            chart2_light.push(data.value*.23);
							 chart2_ac.push(data.value*.38);

                        });

                       $scope.chart2_data.push(chart2_ac);
						 $scope.chart2_data.push(chart2_light);
                    });

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
                    $scope.gettag16();
                    $scope.gettag17();
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
                            "https://energyiotbackdev.mybluemix.net/logics/sum/" +
                            sid +
                            "/" +
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

                $scope.gettag16 = function() {
                    $http
                        .get(
                            "https://energyiotbackdev.mybluemix.net/logics/sum/16/" +
                            $scope.startDate +
                            "/" +
                            $scope.endDate)
                        .then(
                            function(response) {
                            	 $scope.tagValue16 = response.data;
                                  //console.log("Avg Date is "	+ $rootScope.myDateRange.tagValue16)
                            },
                            function(error) {
                                // alert('Error!');
                            });

                };

                $scope.gettag17 = function() {
                    $http
                        .get(
                            "https://energyiotbackdev.mybluemix.net/logics/sum/17/" +
                            $scope.startDate +
                            "/" +
                            $scope.endDate)
                        .then(
                            function(response) {
                            	 $scope.tagValue17 = response.data;
                                  //console.log("Avg Date is "+ $rootScope.myDateRange.tagValue17)
                            },
                            function(error) {
                                // alert('Error!');
                            });

                };

            }

        ]); //End of AreaController


mainApp.run(function($rootScope) {

    $rootScope.myDateRange = {};
    $rootScope.myDateRange.startDate = new Date().getTime() - 43200000;
    $rootScope.myDateRange.endDate = new Date().getTime();

});



mainApp.config(["$stateProvider", "$urlRouterProvider", '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise("/home/15");

        $stateProvider.state("home", {

            url: "/home/:id",
            templateUrl: 'views/home-content.html',
            controller: 'RouteController',
            params: {
                id: '15'
            }

        }).state("login", {

            url: "/login",
            templateUrl: 'login.html',
            controller: 'RouteController',

        }).state("area", {

            url: "/area/:id",
            templateUrl: 'views/site-content.html',
            controller: 'RouteController',
            // default uri params
            params: {
                id: '15'
            }

        });
        $locationProvider.html5Mode(true);

    }
]);

mainApp
    .controller(
        'RouteController', [
            '$scope',
            '$http',
            '$rootScope',
            '$stateParams',
            '$interval',
            function($scope, $http, $rootScope, $stateParams,
                $interval) {

                var today = new Date().getTime();
                var yesterday = new Date().getTime() - 43200000;
                $scope.startDate = new Date().getTime() - 43200000;
                $scope.endDate = new Date().getTime();

                console.log(today + " : " + yesterday);
                
                var sid = $stateParams.id;
                var sid1 = parseInt(sid) + parseInt(1);
                var sid2 = parseInt(sid) + parseInt(2);

                console.log("Defined id:" + sid1);

                $scope.ranges = {
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

                	
                	   console.log("Defined id:" + sid);
                	$scope.startDate = new Date(sDate).getTime();
                	$scope.endDate = new Date(eDate).getTime();

                    console.log("Selected Date is " + startDate +
                        " : " + endDate)
                        
                        
                        $scope.getAreaCharts($scope.startDate,$scope.endDate);

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

                $scope.options = {
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

                $scope.chart2_label = ['AL WAHDAH', 'AL ROWDAH', 'AL MUSHRIF'];
                var chart2_tempdata = [];
                var chart2_tempdata1 = [];

                $scope.chart2_data = [];
                

                $scope.chart2_colours = [{ // default
                    "fillColor": "rgba(151,211,78,.8)",
                    "strokeColor": "rgba(151,211,98,.7)"
                }, { // default
                    "fillColor": "rgba(53,162,203,.8)",
                    "strokeColor": "rgba(53,162,273,.7)"
                }];

                function addZero(i) {
                    if (i < 10) {
                        i = "0" + i;
                    }
                    return i;
                }



                $scope.getAreaCharts = function(sDate, eDate) {

                    startCDate = new Date(sDate).getTime();
                    endCDate = new Date(eDate).getTime();
                    $scope.chart1_label=[];
                    $scope.chart1_data=[];

                    $http.get(
                        "https://energyiotbackdev.mybluemix.net/tags/gettag/" + sid + "/" +
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
                            chart1_tempdata.push(data.value);
                            // console.log("Timestamps : " + data.timestamps+ "\nValues : " +
                            // data.value);

                        });

                        $scope.chart1_data.push(chart1_tempdata);
                    });

                }
                
                
                $scope.getBarCharts = function() {
                	
                	
                     $scope.chart2_data=[];

                $http.get("https://energyiotbackdev.mybluemix.net/tags/gettag/" + sid1)
                    .then(function(response) {

                    	console.log("bar1 called");
                        angular.forEach(response.data, function(data) {
                        	
                            var d = new Date(data.timestamps);
                            var h = addZero(d.getHours());
                            var m = addZero(d.getMinutes());
                            var s = addZero(d.getSeconds());
                            var t = h + ":" + m + ":" + s;

                            // $scope.chart2_label.push(t);

                            // $scope.labels.push(data.timestamps);
                            chart2_tempdata.push(data.value);

                        });

                        $scope.chart2_data.push(chart2_tempdata);
                    });

                $http.get("https://energyiotbackdev.mybluemix.net/tags/gettag/" + sid2)
                    .then(function(response) {
                    	console.log("bar2 called");
                        angular.forEach(response.data, function(data) {

                            chart2_tempdata1.push(data.value);

                        });

                        $scope.chart2_data.push(chart2_tempdata1);
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

        ]); //End of RouteController

var ListController = function($scope, $http) {

    var $this = this;

    $this.doSomething = function(clickedId, nameId) {

        console.log("Clicked Id is " + clickedId + " : " + nameId)

    };

}

mainApp.controller('ListController', ListController);
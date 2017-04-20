mainApp.controller('chartCtrl', function($scope, $rootScope, $http,$stateParams) {

	var id = $stateParams.id;
	var id1=parseInt(id)+parseInt(1);
	var id2=parseInt(id)+parseInt(2);
	
	console.log("Defined id:" +id1);
	
	
	$scope.chart1_label = [];
	var chart1_tempdata = [];

	$scope.chart1_data = [];

	$scope.chart1_colours = [ { // default
		"fillColor" : "rgba(151,211,78,.6)",
		"strokeColor" : "rgba(151,211,98,.7)",
		"pointColor" : "rgba(151,211,58,.2)",
		"pointStrokeColor" : "rgba(151,211,108,.3)",
		"pointHighlightFill" : "rgba(151,211,128,.5)",
		"pointHighlightStroke" : "rgba(151,211,128,.7)"
	} ];

	$scope.chart2_label = ['Area1','Area2','Area3','Area4','Area5','Area6','Area7','Area8','Area9','Area10'];
	var chart2_tempdata = [];
	var chart2_tempdata1 = [];

	$scope.chart2_data = [];

	$scope.chart2_colours = [ { // default
		"fillColor" : "rgba(151,211,78,.8)",
		"strokeColor" : "rgba(151,211,98,.7)"
	}, { // default
		"fillColor" : "rgba(53,162,203,.8)",
		"strokeColor" : "rgba(53,162,273,.7)"
	} ];

	function addZero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}

	$http.get("https://energyiotbackdev.mybluemix.net/tags/gettag/"+id).then(
			function(response) {

				angular.forEach(response.data, function(data) {
					var d = new Date(data.timestamps);
					var h = addZero(d.getHours());
					var m = addZero(d.getMinutes());
					var s = addZero(d.getSeconds());
					var t = h + ":" + m + ":" + s;

					$scope.chart1_label.push(t);

					// $scope.labels.push(data.timestamps);
					chart1_tempdata.push(data.value);
				//	console.log("Timestamps  :  " + data.timestamps+ "\nValues :  " + data.value);

				});

				$scope.chart1_data.push(chart1_tempdata);
			});

	$http.get("https://energyiotbackdev.mybluemix.net/tags/gettag/"+id1).then(
			function(response) {

				angular.forEach(response.data, function(data) {
					var d = new Date(data.timestamps);
					var h = addZero(d.getHours());
					var m = addZero(d.getMinutes());
					var s = addZero(d.getSeconds());
					var t = h + ":" + m + ":" + s;

					//$scope.chart2_label.push(t);

					// $scope.labels.push(data.timestamps);
					chart2_tempdata.push(data.value);
					

				});

				$scope.chart2_data.push(chart2_tempdata);
			});

	$http.get("https://energyiotbackdev.mybluemix.net/tags/gettag/"+id2).then(
			function(response) {

				angular.forEach(response.data, function(data) {

					chart2_tempdata1.push(data.value);

				});

				$scope.chart2_data.push(chart2_tempdata1);
			});

});

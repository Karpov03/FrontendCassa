var mainApp = angular.module('MainApp', [ 'daterangepicker']);

mainApp.controller('TestCtrl', function ($scope) {
	$scope.datePicker.date1 = {startDate: null, endDate: null};
});
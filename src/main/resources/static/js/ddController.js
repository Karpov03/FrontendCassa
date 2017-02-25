mainApp
		.controller(
				'DropdownController',
				function($scope, StateService) {
					// create a angular controller
					// expained about controller in Part2 // Here
					// LocationService (Service) Injected

					$scope.CountryID = null;
					$scope.StateID = null;
					$scope.CityID = null;
					$scope.CountryList = null;
					$scope.StateList = null;
					$scope.CityList = null;

					$scope.StateTextToShow = "Select State";
					$scope.CityTextToShow = "Select City";
					$scope.Result = "";

					// Populate Country list using GetCountry()
					StateService.GetCountry().then(function(d) {
						// assign countries to $scope.CountryList
						$scope.CountryList = d.data; // success
					}, function(error) {
						alert('Error!'); // throws error for failure
					});
					// This function to Populate State
					// it is called after selecting country from dropdownlist
					$scope.GetState = function() {
						$scope.StateID = null; // Clear Selected State if any
						$scope.StateList = null; // Clear previously loaded
													// state list
						$scope.StateTextToShow = "Please Wait..."; // this will
																	// show
																	// until
																	// load
																	// states
																	// from
																	// database
						$scope.CityID = null; // Clear Selected city if any
						$scope.CityList = null; // Clear previously loaded city
												// list
						$scope.CityTextToShow = "Please Wait..."; // this will
																	// show
																	// until
																	// load
																	// states
																	// from
																	// database

						// Load State
						StateService.GetState($scope.CountryID).then(
								function(d) {
									$scope.StateList = d.data[0].area;
									$scope.StateTextToShow = "Select State";
								}, function(error) {
									alert('Error!');
								});

					}

					// This function to Populate City
					// it is called after selecting state from dropdownlist
					$scope.GetCity = function() {
						$scope.CityID = null; // Clear Selected city if any
						$scope.CityList = null; // Clear previously loaded city
												// list
						$scope.CityTextToShow = "Please Wait..."; // this will
																	// show
																	// until
																	// load
																	// states
																	// from
																	// database

						// Load State
						StateService.GetCity($scope.StateID).then(function(d) {
							$scope.CityList = d.data[0].asset;
							$scope.CityTextToShow = "Select City";
						}, function(error) {
							alert('Error!');
						});

					}

					// Function for show result
					// it will be displayed after clicking on button
					$scope.ShowResult = function() {
						$scope.Result = "Selected Country ID : "
								+ $scope.CountryID + " State ID : "
								+ $scope.StateID + " City ID : "
								+ $scope.CityID;
					}

				})
		.factory(
				'StateService',
				function($http) { // factory methos to get data from server.
					var fac = {};
					fac.GetCountry = function() {
						return $http
								.get('http://localhost:999/MegatechEnterprise/site/getSite')
					}
					fac.GetState = function(countryID) {
						return $http
								.get('http://localhost:999/MegatechEnterprise/site/getSite/'
										+ countryID)
					}
					fac.GetCity = function(stateID) {
						return $http
								.get('http://localhost:999/MegatechEnterprise/area/getArea/'
										+ stateID)
					}

					return fac;
				});
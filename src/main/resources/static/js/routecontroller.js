mainApp.config(["$stateProvider", "$urlRouterProvider", '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise("/home/15");

        $stateProvider.state("home", {

            url: "/home/:id",
            templateUrl: 'views/home-content.html',
            controller: 'AreaController',
            params: {
                id: '15'
            }

        }).state("login", {

            url: "/login",
            templateUrl: 'login.html',
            

        }).state("logout", {

            url: "/login",
            templateUrl: 'login.html',
            

        }).state("area", {

            url: "/area/:id",
            templateUrl: 'views/area-content.html',
            controller: 'AreaController',
            // default uri params
            params: {
                id: '15'
            }

        }).state("site", {

            url: "/site/:id",
            templateUrl: 'views/site-content.html',
            controller: 'SiteController',
            // default uri params
            params: {
                id: '15'
            }

        });
        $locationProvider.html5Mode(true);

    }
]);


var ListController = function($scope, $http) {

   

}

mainApp.controller('ListController', ListController);
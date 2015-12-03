module App {
    angular.module("app").config(function ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {
        $routeProvider
            .when('/Example/:Id', {
            templateUrl: 'app/views/viewExample.html',
            //controller: 'ctrlExample',
        })
            .otherwise(<ng.route.IRoute>{
            templateUrl: 'app/views/viewExample.html',
            //controller: 'ctrlExample',
        });
        

        // configure html5 to get links working on jsfiddle
        //$locationProvider.html5Mode(true);
    });
} 
// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
module App {
    "use strict";

    interface IctrlMainScope extends ng.IScope {
        title: string;
        $route: ng.route.IRouteService;
        $routeParams: ng.route.IRouteParamsService;
        $location: ng.ILocationService;
    }

    interface IctrlMain {
        activate: () => void;
    }

    class ctrlMain implements IctrlMain {
        static $inject: string[] = ["$scope", "$route" , "$routeParams" , "$location" ];

        constructor($scope: IctrlMainScope,$route:ng.route.IRouteService,$routeParams:ng.route.IRouteParamsService,$location:ng.ILocationService) {
            $scope.title = "ctrlMain";
            $scope.$route = $route;
            $scope.$location = $location;
            $scope.$routeParams = $routeParams;

            this.activate();
        }

        activate() {

        }
    }

    angular.module("app").controller("ctrlMain", ctrlMain);
}
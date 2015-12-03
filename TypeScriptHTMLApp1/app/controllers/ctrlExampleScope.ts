// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
module App {
    "use strict";

    interface IctrlExampleScopeScope extends ng.IScope {
        title: string;
    }

    interface IctrlExampleScope {
        activate: () => void;
    }

    class ctrlExampleScope implements IctrlExampleScope {
        static $inject: string[] = ["$scope"];
        
        constructor(private $scope: IctrlExampleScopeScope) {
            $scope.title = "ctrlExampleScope";

            this.activate();
        }

        activate() {

        }
    }

    angular.module("app").controller("ctrlExampleScope", ctrlExampleScope);
}
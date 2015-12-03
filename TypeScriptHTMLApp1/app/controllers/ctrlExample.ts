// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
module App {
    "use strict";

    interface IctrlExample {
        title: string;
        activate: () => void;
    }

    class ctrlExample implements IctrlExample {
        title: string = "ctrlExample";

        static $inject: string[] = ["$scope"];

        constructor(private $scope: ng.IScope) {
            this.activate();
        }

        activate() {

        }
    }

    angular.module("app").controller("ctrlExample", ctrlExample);
}
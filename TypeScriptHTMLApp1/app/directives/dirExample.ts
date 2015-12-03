// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
module App {
    "use strict";

    interface IdirExample extends ng.IDirective {
    }

    interface IdirExampleScope extends ng.IScope {
    }

    interface IdirExampleAttributes extends ng.IAttributes {
    }

    dirExample.$inject = ["$window"];
    function dirExample($window: ng.IWindowService): IdirExample {
        return {
            restrict: "EA",
            link: link,
            templateUrl:"app/views/viewExample.html" 
        }

        function link(scope: IdirExampleScope, element: ng.IAugmentedJQuery, attrs: IdirExampleAttributes) {

        }
    }

    angular.module("app").directive("dirExample", dirExample);
}
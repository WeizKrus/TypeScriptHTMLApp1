// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
module App {
    "use strict";

    interface IsvcExample {
        getData: () => string;
    }
    
    class svcExample implements IsvcExample {
        static $inject: string[] = ["$http"];

        constructor(private $http: ng.IHttpService) {
        }

        getData() {
            return "";
        }
    }

    angular.module("app").service("svcExample", svcExample);
}
'use strict';

angular.module('main.board', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/edit', {
            templateUrl: 'board/edit/edit.html',
            controller: 'editCtrl'
        })

    }])
    .controller('editCtrl', function($rootScope,$scope, $http, $window) {
        if($rootScope.panel !== ""){
            $rootScope.changePanel("");
        }
        /*console.log($window.location.protocol);
         if($window.location.protocol !== "https"){
         $window.location.protocol = "https";
         }*/
        $http.get('http://localhost/',{tocken: $rootScope.currentTocken})


            .error(function (data){
                $window.location.href = "#/login";
            })
            .success(function (data) {
            })



    })
;
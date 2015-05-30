'use strict';

angular.module('main.board', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'board/login/login.html',
            controller: 'loginCtrl'
        })

    }])
    .controller('loginCtrl', function($rootScope,$scope, $http, $window) {
        if($rootScope.panel !== ""){
            $rootScope.changePanel("");
        }
        /*console.log($window.location.protocol);
         if($window.location.protocol !== "https"){
         $window.location.protocol = "https";
         }*/
        $scope.signin = true;

        if(localStorage['mail'] && localStorage['pass']){
            $scope.registredUser={
                mail:localStorage['mail'],
                password:localStorage['pass'],
                remember:true
            };


        }

        $scope.toSignUp= function (){
            $scope.signin = false;
        }

        $scope.toSignIn= function (){
            $scope.signin = true;
        }
        $scope.checkCredentials = function (iform){
            console.log(iform);
            // alert(iform.mail+" "+iform.password);
            if(iform.remember){
                //alert(iform.mail+" "+iform.password);
                localStorage['mail'] = iform.mail;
                localStorage['pass'] = iform.password;
            }
            else {
                localStorage['mail'] = null;
                localStorage['pass'] = null;
            }

            $http.get('http://localhost').
                success(function (data){
                    $rootScope.currentTocken = 'AHHKDIC4548djy41FGGHJ';
                    $window.location.href = "#/board";
                }).
                error(function (data){
                    $scope.serverError = 'some Server Error';
                });
        }

        $scope.subscribe = function (iform){
            console.log(iform);
            // alert(iform.mail+" "+iform.password);
            if(iform.cgu){
                //alert(iform.mail+" "+iform.password);
                $http.put('http://localhost', {user: "userinfo"}).
                    success(function (data){
                        $scope.toSignIn();
                        $scope.serverError = "Vous êtes enregistré, vous pouvez vous connecter."
                    }).
                    error(function (data){
                        $scope.serverError = 'some Server Error';
                    });
            }

        }

    })
;
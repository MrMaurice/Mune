'use strict';

angular.module('main.board', ['ngRoute','main.board.edit'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/board', {
                templateUrl: 'board/board.html',
                controller: 'boardCtrl'
            })
        .when('/login', {
            templateUrl: 'board/login/login.html',
            controller: 'loginCtrl'
        });

    }])
    .controller('loginCtrl', function($rootScope,$scope, $http, $window) {
        if($rootScope.panel !== "" && $rootScope.changePanel ){
            $rootScope.changePanel("");
        }
        console.log($window.location.protocol);
        /* if($window.location.protocol !== "https"){
         $window.location.protocol = "https";
         }*/
        var protocol = "http:";
        if($rootScope.usereId != undefined){
            $window.location.href = "#/board";
        }
        $scope.signin = true;

        if(localStorage['email'] && localStorage['pass']){
            $scope.registredUser={
                email:localStorage['email'],
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
                localStorage['email'] = iform.email;
                localStorage['pass'] = iform.password;
            }
            else {
                localStorage['email'] = null;
                localStorage['pass'] = null;
            }

            $http.put(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/users/login',{"password":iform.password,"email":iform.email}).
                success(function (data,st,h,c){
                    console.log(data);
                    $rootScope.usereId = data.id;
                    $rootScope.currentTocken = data.salt;

                    $window.location.href = "#/board";

                }).
                error(function (data,st,h,c){


                    $scope.serverError = 'Erreur : '+data.error;
                    console.log(data);
                });
        }

        $scope.subscribe = function (iform){
            console.log(iform);
            console.log($scope.registringUser);
            // alert(iform.mail+" "+iform.password);

                //alert(iform.mail+" "+iform.password);
                iform.username = iform.name+" "+iform.surname;

                $http.post(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/users', iform).
                    success(function (data){
                        $scope.toSignIn();
                        $scope.serverError = "Vous êtes enregistré, vous pouvez vous connecter."
                    }).
                    error(function (data,st,h,c){
                        if(st === 500){
                            $scope.serverError = 'Un compte avec cet email existe déjà.';
                        }
                        else {
                            $scope.serverError = 'Erreur : '+data.error;
                        }

                    });


        }

    })

    .controller('boardCtrl', function($rootScope,$scope, $http, $window) {
        console.log($window.location.protocol);
         /*if($window.location.protocol !== "https"){
         $window.location.protocol = "https";
         }*/

        if($rootScope.usereId == undefined){
            $window.location.href = "#/login";
        }

        else {
                if($rootScope.panel !== "" && $rootScope.changePanel ){
                    $rootScope.changePanel("");
                }
                var protocol = "http:";
                $http.get(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/users/'+$rootScope.usereId).
                    success (function (data){
                        $scope.user = data;
                    }).
                    error(function (data){
                        $window.location.href = "#/login";
                    });


                $scope.supprArticle = function (item){
                    if($window.confirm('Vous allez supprimer définitivement cet article.')){
                        $http.delete(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/users/'+$rootScope.usereId+"/articles/"+item.id)
                            .success(function(data){
                                $scope.user = data;

                            })
                            .error(function (data){
                                $scope.error = data.error;
                            })
                    }

                }






            };


    });
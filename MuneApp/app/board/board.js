'use strict';

angular.module('main.board', ['ngRoute'])

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

            $http.put('http://localhost/MuneJDR/MuneServ/web/app_dev.php/users/login',{"password":iform.password,"email":iform.mail}).
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

    .controller('boardCtrl', function($rootScope,$scope, $http, $window) {
        /*console.log($window.location.protocol);
         if($window.location.protocol !== "https"){
         $window.location.protocol = "https";
         }*/
        $http.get('http://localhost/',{tocken: $rootScope.currentTocken})


            .error(function (data){
                $window.location.href = "#/login";
            })
            .success(function (data){
                if($rootScope.panel !== ""){
                    $rootScope.changePanel("");
                }
                $scope.user = data;

                $scope.supprArticle = function (item){
                    $http.get('http://localhost/',{tocken: $rootScope.currentTocken, article: item.id})
                        .success(function(){
                            for(var i in $scope.user.articles){
                                if($scope.user.articles[i] == item){
                                    $scope.user.articles.slice(i,1);
                                    break;
                                }
                            }
                        })
                }






            });


    });
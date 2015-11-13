'use strict';

angular.module('main.board', ['ngRoute','main.board.edit','main.utils'])

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
    .controller('loginCtrl', ['$rootScope','$scope','$http','$window','resourceManager',function($rootScope,$scope, $http, $window,resourceManager) {
        if($rootScope.panel !== "" && $rootScope.changePanel ){
            $rootScope.changePanel("");
        }
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

            $rootScope.loading = true;
            $http.put(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/users/login',{"password":iform.password,"email":iform.email}).
                success(function (data,st,h,c){
                    $rootScope.loading = false;
                    $rootScope.usereId = data.id;
                    $rootScope.currentTocken = data.salt;

                    $window.location.href = "#/board";

                }).
                error(function (data,st,h,c){


                    $scope.serverError = 'Erreur : '+data.error;
                });
        }

        $scope.subscribe = function (iform){

            // alert(iform.mail+" "+iform.password);

                //alert(iform.mail+" "+iform.password);
                iform.username = iform.name+" "+iform.surname;

                /*$http.post(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/users', iform).
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

                    });*/

                resourceManager.User.save(iform,function (data){
                    $scope.toSignIn();
                    $scope.serverError = "Vous êtes enregistré, vous pouvez vous connecter."
                },function (data,st,h,c){
                    if(st === 500){
                        $scope.serverError = 'Un compte avec cet email existe déjà.';
                    }
                    else {
                        $scope.serverError = 'Erreur : '+data.error;
                    }

                });


        }

    }])

    .controller('boardCtrl', ['$rootScope','$scope','$http','$window','resourceManager',function($rootScope,$scope, $http, $window,resourceManager) {
         /*if($window.location.protocol !== "https"){
         $window.location.protocol = "https";
         }*/

        if($rootScope.usereId == undefined){
            $window.location.href = "#/login";
            return false;
        }

        else {
                if($rootScope.panel !== "" && $rootScope.changePanel ){
                    $rootScope.changePanel("");
                }

                var protocol = "http:";
                //$http.get(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/users/'+$rootScope.usereId).
                $rootScope.loading = true;
                var user = resourceManager.User.get({id:$rootScope.usereId},
                   function(data){
                       $scope.user = data;
                       $rootScope.loading = false;
                   },
                   function (data){
                       $window.location.href = "#/login";
                       $rootScope.loading = false;
                       return false;
                   });
                //$scope.user = user;


                $scope.supprArticle = function (item){
                    if($window.confirm('Vous allez supprimer définitivement cet article.')){
                        /*$http.delete(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/users/'+$rootScope.usereId+"/articles/"+item.id)
                            .success(function(data){
                                $scope.user = data;

                            })
                            .error(function (data){
                                $scope.error = data.error;
                            });*/
                        $rootScope.loading = true;
                        resourceManager.UserArticle.remove({authorId:$rootScope.usereId,id:item.id},function(data){
                            $rootScope.loading = false;
                            resourceManager.User.clearCached({id:$rootScope.usereId});
                            $scope.user = data;

                        },function (data){
                            $scope.error = data.error;
                        });
                    }

                };
            /*$http.get(protocol+"//"+$window.location.host+"/MuneJDR/MuneServ/web/app_dev.php/articles/roots/full").success(function (data, status, headers, config){

                $scope.allArticles = data;

            });*/
            $rootScope.loading = true;
            var allArticles = resourceManager.FullRootArticles.query(function (data){
                $rootScope.loading = false;
                $scope.allArticles = data;
            });
            //$scope.allArticles = allArticles;
            $scope.articleList = "mine";
            $scope.seeMine = function (){
                $scope.articleList = "mine";
            };
            $scope.seeAll = function (){
                $scope.articleList = "all";
            };





            }


    }])
    .directive('articleLine', ['$compile',function($compile) {
        return {
            templateUrl: "board/articleline.html",
            restrict: 'E',
            replace:true,
            scope: {
                source:"="
            },
            link: function($scope, $element) {

                    if($scope.source.childrens != undefined){
                        var c = $compile(' <ul > <li  ng-cloak="" ng-repeat="item in source.childrens" ><article-line source="item"/></li> </ul>');
                        c($scope, function(cloned, $scope){
                            $element.append(cloned);
                        });


                    }


            }
        }
    }])

;
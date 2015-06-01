'use strict';

angular.module('main.board.edit', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/edit/:id', {
            templateUrl: 'board/edit/edit.html',
            controller: 'editCtrl'
        })

    }])
    .controller('editCtrl', function($rootScope,$scope, $http, $window,$routeParams) {
        if($rootScope.panel !== ""){
            $rootScope.changePanel("");
        }
        console.log($window.location.protocol);
         /*if($window.location.protocol !== "https"){
         $window.location.protocol = "https";
         }*/
        if($rootScope.usereId == undefined){
            $window.location.href = "#/login";
        }

        else {
            if ($rootScope.panel !== "") {
                $rootScope.changePanel("");
            }

            var protocol = "http:";

            $http.get(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/users/' + $rootScope.usereId).
                success(function (data) {
                    $scope.user = data;

                    $http.get(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/articles').
                        success(function (data){
                            $rootScope.allarticles = data;
                        });

                    if($routeParams.id !== "new"){

                        $http.get(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/articles/' + $routeParams.id).
                            success(function (data) {
                                $scope.Edarticle = data;
                                for (var p in $scope.Edarticle.parents){
                                    var tid = $scope.Edarticle.parents[p].id;
                                    $scope.Edarticle.parents[p] = tid.toString();

                                }
                                console.log($scope.Edarticle);
                            });
                    }

                    var getById = function(array,lid){
                        for(var i in array){
                            if(array[i].id==lid){
                                return array[i];
                            }
                        }
                        return null;
                    }
                    var getIndexById = function(array,lid){
                        for(var i in array){
                            if(array[i].id==lid){
                                return i;
                            }
                        }
                        return null;
                    }

                    $scope.edit = function (iform){
                        console.log(iform);
                        if($routeParams.id === "new"){
                            //$scope.user.articles.push(iform);

                            $http.post(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/users/'+$scope.user.id+'/articles',iform).
                                success(function (data) {
                                    $scope.Edarticle = data;
                                    $window.location.href = "#/board";
                                }).
                                error(function (data,st){
                                    if(st == 500){
                                        $scope.error = "Un article avec ce nom existe déjà";

                                    } else {
                                        $scope.error = data.error;
                                    }
                                });
                        } else {
                            $http.put(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/users/'+$scope.user.id+'/articles/'+$routeParams.id,iform).
                                success(function (data) {
                                    $scope.Edarticle = data;
                                    $window.location.href = "#/board";
                                }).
                                error(function (data,st){
                                    $scope.error = data.error;

                                });
                        }


                    }

                }).
                error(function (data) {
                    $window.location.href = "#/login";
                });
        }



        })
;
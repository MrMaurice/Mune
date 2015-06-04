'use strict';

angular.module('main.article', ['ngRoute','ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/article/:id', {
      templateUrl: 'article/article.html',
      controller: 'articleCtrl'
  })

}])

.controller('articleCtrl', function($rootScope,$scope, $routeParams, $http, $window, $compile) {
    if($rootScope.panel != "mainmenu" && $rootScope.changePanel ){
        $rootScope.changePanel("mainmenu");
    }
        if($rootScope.article === undefined){
            var protocol = $window.location.protocol;
            $http.get(protocol+"//"+$window.location.host+"/MuneJDR/MuneServ/web/app_dev.php/articles/"+$routeParams.id)
                .success(function (data, status, headers, config){

                    $rootScope.article = data;
                    $rootScope.name = data.title;


                });
        }

});
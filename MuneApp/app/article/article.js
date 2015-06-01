'use strict';

angular.module('main.article', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/article/:id', {
      templateUrl: 'article/article.html',
      controller: 'articleCtrl'
  })
  .when('/articles', {
    templateUrl: 'article/articles.html',
    controller: 'articlesCtrl'
  });
}])

.controller('articleCtrl', function($rootScope,$scope, $routeParams, $http, $window) {
    if($rootScope.panel != "mainmenu" && $rootScope.changePanel ){
        $rootScope.changePanel("mainmenu");
    }
        var protocol = $window.location.protocol;
    $http.get(protocol+"//"+$window.location.host+"/MuneJDR/MuneServ/web/app_dev.php/articles/"+$routeParams.id).success(function (data, status, headers, config){
        $rootScope.article = data;
        $rootScope.name = data.title;

    });

});
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

.controller('articleCtrl', function($rootScope,$scope, $routeParams, $http) {
    if($rootScope.panel != "mainmenu"){
        $rootScope.changePanel("mainmenu");
    }
    $http.get("database/article/"+$routeParams.id+".json").success(function (data, status, headers, config){
        $rootScope.article = data;
        $rootScope.name = data.title;

    });

});
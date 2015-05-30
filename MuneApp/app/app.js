'use strict';

// Declare app level module which depends on views, and components
angular.module('main', [
    'ngRoute',
    'main.home',
    'main.article',
    'main.board',
    'main.components.top',
    'main.components.main',
    'main.components.panel'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);

'use strict';

// Declare app level module which depends on views, and components
angular.module('main', [
    'ngResource',
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'main.home',
    'main.article',
    'main.board',
    'main.components.top',
    'main.components.main',
    'main.components.panel'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])
    .animation('.slide', [function() {
        return {

            enter: function(element, doneFn) {
                jQuery(element).show(500, doneFn);


            },
            leave: function(element, doneFn) {
                jQuery(element).hide(300, doneFn);
            }
        }
    }])
    .animation('.fade', [function() {
        return {

            enter: function(element, doneFn) {
                jQuery(element).fadeIn(500, doneFn);


            },
            leave: function(element, doneFn) {
                jQuery(element).fadeOut(300, doneFn);
            }
        }
    }]);

'use strict';

angular.module('main.components.top', [])
.directive('topmenu', [function() {
    return {
        templateUrl:"components/topmenu/topmenu.html",
        restrict: 'E',

        scope: {},
        controller: function($scope, $element, $http, $window) {
            var protocol = $window.location.protocol;
            var links = $scope.links = [];
            $http.get(protocol+"//"+$window.location.host+"/MuneJDR/MuneServ/web/app_dev.php/articles/roots").success(function (data, status, headers, config){
                links = $scope.links = data;
            });


        }
    };
}]);
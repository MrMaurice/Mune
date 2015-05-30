'use strict';

angular.module('main.components.top', [])
.directive('topmenu', [function() {
    return {
        templateUrl:"components/topmenu/topmenu.html",
        restrict: 'E',

        scope: {},
        controller: function($scope, $element, $http) {
            var links = $scope.links = [];
            $http.get("database/menu/top.json").success(function (data, status, headers, config){
                links = $scope.links = data;
            });


        }
    };
}]);
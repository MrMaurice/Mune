/**
 * Created by Lord BELLOT on 16/04/2015.
 */
'use strict';

angular.module('main.components.panel', [])
    .directive('panel', [function() {
        return {
            templateUrl:"components/panel/panel.html",
            restrict: 'E',
            //transclude: true,
            scope: {},
            controller: function($rootScope, $scope) {

                $scope.panes = {mainmenu:false};

                var sco = $rootScope;

                sco.changePanel = function(stuff){
                    for(var i in $scope.panes){
                        $scope.panes[i] = false;
                    };
                   // alert(stuff);
                    sco.panel = stuff;
                    if(stuff){
                        $scope.panes[stuff] = true;
                    }

                };


            }//,

            // replace: true
        };
    }]);
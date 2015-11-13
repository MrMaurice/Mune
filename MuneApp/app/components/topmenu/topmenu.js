'use strict';

angular.module('main.components.top', ['main.utils'])
.directive('topmenu', ['resourceManager',function(resourceManager) {
    return {
        templateUrl:"components/topmenu/topmenu.html",
        restrict: 'E',

        scope: {},
        controller: function($rootScope, $scope, $element, $http, $window) {
            var protocol = $window.location.protocol;
            var links = $scope.links = [];
           // $http.get(protocol+"//"+$window.location.host+"/MuneJDR/MuneServ/web/app_dev.php/articles/roots")
             //   .success(function (data, status, headers, config){
            resourceManager.RootArticles.query(function (data, status, headers, config){
                links = $scope.links = data;

                $scope.select = function($event){

                    $event.preventDefault();

                    //console.log($event.target.attributes);
                    //$http.get(protocol+"//"+$window.location.host+"/MuneJDR/MuneServ/web/app_dev.php/articles/"+$event.target.attributes.route.value)
                    //    .success(function (data, status, headers, config){
                    $rootScope.loading = true;
                    resourceManager.Article.get({id:$event.target.attributes.route.value},function (data, status, headers, config){
                            $rootScope.loading = false;
                            $rootScope.article = data;
                            $rootScope.name = data.title;

                            /*if (data.title != $scope.jinks.title){
                                //alert($scope.jinks.child);
                                var v = $scope.getElByName($scope.jinks.childrens,data.title);
                                if(!v){
                                    v = $scope.getElByName(allmenu,data.title);
                                }
                                if(v.childrens){
                                    $scope.jinks = v;
                                }
                            }*/

                            $window.location.href = $event.target.attributes['ng-href'].value;
                            //$compile('article/article.html')($scope);
                        });


                };

            });


        }
    };
}]);
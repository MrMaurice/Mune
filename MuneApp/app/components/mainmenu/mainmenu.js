'use strict';

angular.module('main.components.main', [])
.directive('mainmenu', [function() {
    return {
        templateUrl:"components/mainmenu/mainmenu.html",
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($rootScope, $scope, $element, $http, $window) {

            var protocol = $window.location.protocol;
            var allmenu = $scope.jinks = [];
            $scope.getElByName = function (_tab,_name){
                var r = [];
                for(var i in _tab){
                    if(_tab[i].title == _name){
                        return _tab[i];
                    } else if(_tab[i].childrens.length > 0) {
                        r.push((function(){
                            var t= _tab[i];
                            return $scope.getElByName(t.childrens,_name);
                        })());
                    }
                }
                for (var t in r ){
                    if (r[t] !== null){
                        return r[t];
                    }
                }
                return null;
            };
            $scope.getParentElByName = function (_tab,_name){
                var r = [];
                var rparent = [];
                for(var i in _tab){
                    if(_tab[i].title == _name){

                        return {title:"Home",childrens:_tab};
                    } else if(_tab[i].childrens.length > 0) {
                        rparent.push(_tab[i]);
                        r.push((function(){
                            var t= _tab[i];
                            return $scope.getElByName(t.childrens,_name);
                        })());
                    }
                }
                for (var t in r ){
                    if (r[t] !== null){
                        return rparent[t];
                    }
                }
                return null;
            };
            $http.get(protocol+"//"+$window.location.host+"/MuneJDR/MuneServ/web/app_dev.php/articles/roots").success(function (data, status, headers, config){
                $scope.jinks.title = "Home";
                allmenu = $scope.jinks.childrens = data;

            });
            var sco = $rootScope;
            sco.watch('name',function (newV,oldV){


                if(typeof sco.article.title !== "undefined"){
                    //alert($scope.jinks.child);
                    var v = $scope.getElByName($scope.jinks.childrens,sco.article.title);
                    if(!v){
                        v = $scope.getElByName(allmenu,sco.article.title);
                    }

                    if(v){
                        if(v.childrens.length > 0){
                            $scope.jinks = v;
                        }

                    }
                    else {
                        $scope.jinks.title = "Home";
                        $scope.jinks.childrens = allmenu;
                    }

                }

            });

            $scope.selectParent = function(e){
                //alert("Ouai");
                if($scope.jinks.title !== "Home"){
                    var v = $scope.getParentElByName(allmenu,$scope.jinks.title);//$scope.getElByName(allmenu,sco.article.title).parents[0];//

                    $scope.jinks = v;
                }

            };

            $scope.select = function(e){
                //alert("Ouai");
                if (sco.article.title != $scope.jinks.title){
                    //alert($scope.jinks.child);
                    var v = $scope.getElByName($scope.jinks.childrens,sco.article.title);
                    if(!v){
                        v = $scope.getElByName(allmenu,sco.article.title);
                    }
                    if(v.childrens){
                        $scope.jinks = v;
                    }
                }

            };


        }
       //,
        //replace: true
    };
}])

;
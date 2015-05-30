'use strict';

angular.module('main.components.main', [])
.directive('mainmenu', [function() {
    return {
        templateUrl:"components/mainmenu/mainmenu.html",
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($rootScope, $scope, $element, $http) {


            var allmenu = $scope.jinks = [];
            $scope.getElByName = function (_tab,_name){
                var r = [];
                for(var i in _tab){
                    if(_tab[i].title == _name){
                        return _tab[i];
                    } else if(_tab[i].child.length > 0) {
                        r.push((function(){
                            var t= _tab[i];
                            return $scope.getElByName(t.child,_name);
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

                        return {title:"home",child:_tab};
                    } else if(_tab[i].child.length > 0) {
                        rparent.push(_tab[i]);
                        r.push((function(){
                            var t= _tab[i];
                            return $scope.getElByName(t.child,_name);
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
            $http.get("database/menu/main.json").success(function (data, status, headers, config){
                $scope.jinks.title = "home";
                allmenu = $scope.jinks.child = data;

            });
            var sco = $rootScope;
            sco.watch('name',function (newV,oldV){


                if(typeof sco.article.title !== "undefined"){
                    //alert($scope.jinks.child);
                    var v = $scope.getElByName($scope.jinks.child,sco.article.title);
                    if(!v){
                        v = $scope.getElByName(allmenu,sco.article.title);
                    }
                    else if(v.child){
                        $scope.jinks = v;
                    }

                }

            });

            $scope.selectParent = function(e){
                //alert("Ouai");
                if($scope.jinks.title !== "home"){
                    var v = $scope.getParentElByName(allmenu,$scope.jinks.title);

                    $scope.jinks = v;
                }

            };

            $scope.select = function(e){
                //alert("Ouai");
                if (sco.article.title != $scope.jinks.title){
                    //alert($scope.jinks.child);
                    var v = $scope.getElByName($scope.jinks.child,sco.article.title);
                    if(!v){
                        v = $scope.getElByName(allmenu,sco.article.title);
                    }
                    if(v.child){
                        $scope.jinks = v;
                    }
                }

            };


        }
       //,
        //replace: true
    };
}]);
'use strict';

angular.module('main.board.edit', ['ngRoute','main.utils'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/edit/:id', {
            templateUrl: 'board/edit/edit.html',
            controller: 'editCtrl'
        })

    }])
    .controller('editCtrl', ['$rootScope','$scope','$http','$window','$routeParams','resourceManager',function($rootScope,$scope, $http, $window,$routeParams,resourceManager) {
        if($rootScope.panel !== ""){
            $rootScope.changePanel("");
        }
         /*if($window.location.protocol !== "https"){
         $window.location.protocol = "https";
         }*/
        if($rootScope.usereId == undefined){
            $window.location.href = "#/login";
        }

        else {
            if ($rootScope.panel !== "") {
                $rootScope.changePanel("");
            }
            var getById = function(array,lid){
                for(var i in array){
                    if(array[i].id==lid){
                        return array[i];
                    }
                }
                return null;
            };
            var getIndexById = function(array,lid){
                for(var i in array){
                    if(array[i].id==lid){
                        return i;
                    }
                }
                return null;
            };
            var protocol = "http:";
            $scope.getElById = function (_tab,_name){
                var r = [];
                for(var i in _tab){
                    if(_tab[i].id == _name){
                        return _tab[i];
                    } else if(_tab[i].childrens != undefined && _tab[i].childrens.length > 0) {
                        r.push((function(){
                            var t= _tab[i];
                            return $scope.getElById(t.childrens,_name);
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
            $scope.getParentsElById = function (_tab,_name){
                var r = [];
                var rparent = [];
                var out = [];
                for(var i in _tab){
                    if(_tab[i].id == _name){

                        return [];
                    } else if(_tab[i].childrens != undefined && _tab[i].childrens.length > 0 ) {//&& getById(_tab[i].childrens,_name) !== null

                        rparent.push(_tab[i]);
                        var direct =  getById(_tab[i].childrens,_name);
                        var uhqshjsq = (function(){
                            var t= _tab[i];
                            return $scope.getParentsElById(t.childrens,_name);
                        })();
                        if(direct !== null){
                            r.push(_tab[i]);
                            console.log(_tab[i]);
                        }
                        else {
                            for (var w in uhqshjsq){
                                if(uhqshjsq[w] !== null && uhqshjsq[w] !== []){
                                    r.push(uhqshjsq[w]);
                                }
                            }
                        }


                    }
                }
                for (var t in r ){
                    if (r[t] !== null && r[t] !== []){
                       out.push(r[t]);
                    }
                }
                return out;
            };
            var rootArt;


            //$('#tinymce').attr('ng-bindHtml','Edarticle.texte');

            //$http.get(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/users/' + $rootScope.usereId).
            $rootScope.loading = true;
            resourceManager.User.get({id:$rootScope.usereId},
               // success(function (data) {
                function (data){
                    $scope.user = data;

                    /*$http.get(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/articles').
                        success(function (data){
                            $rootScope.allarticles = data;
                        });*/
                    $rootScope.loading = true;
                    resourceManager.Articles.query(function (data){
                        $rootScope.loading = false;
                        $rootScope.allarticles = data;
                    });
                    //$http.get(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/articles/roots').
                    $rootScope.loading = true;
                    resourceManager.RootArticles.query(function (data){
                    //success(function (data){
                            rootArt = data;
                        $rootScope.loading = false;

                            if($routeParams.id !== "new"){

                                //$http.get(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/articles/' + $routeParams.id).
                                    //success(function (data) {
                                $rootScope.loading = true;
                                resourceManager.Article.get({id:$routeParams.id},function (data){
                                    $rootScope.loading = false;
                                        $scope.Edarticle = data;
                                        $scope.Edarticle.parents = [];
                                        var prts = $scope.getParentsElById(rootArt, $scope.Edarticle.id);
                                        for (var p in prts){
                                            var tid = prts[p].id;
                                            $scope.Edarticle.parents[p] = tid.toString();

                                        }

                                        angular.element($('textarea')).ready(function () {
                                            $('textarea').tinymce({plugins: [
                                                "save lists link charmap preview anchor spellchecker",
                                                "searchreplace visualblocks visualchars code fullscreen",
                                                "insertdatetime table contextmenu paste textcolor colorpicker fullpage"
                                            ],
                                                menubar: false,
                                                toolbar_items_size: 'small',

                                                setup: function(editor) {
                                                    editor.on('change', function(e) {
                                                        $scope.Edarticle.texte = e.level.content;
                                                    });
                                                },



                                                toolbar1: "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | forecolor backcolor | formatselect",
                                                toolbar2: "table | bullist numlist | subscript superscript | outdent indent blockquote | link unlink anchor code | insertdatetime",
                                                toolbar3: "cut copy paste |  undo redo | searchreplace | removeformat | charmap | preview fullscreen | spellchecker | visualblocks"
                                            });

                                        });



                                    });
                            } else {
                                angular.element($('textarea')).ready(function () {
                                    $('textarea').tinymce({plugins: [
                                        "save lists link charmap preview anchor spellchecker",
                                        "searchreplace visualblocks visualchars code fullscreen",
                                        "insertdatetime table contextmenu paste textcolor colorpicker fullpage"
                                    ],
                                        menubar: false,
                                        toolbar_items_size: 'small',

                                        setup: function(editor) {
                                            editor.on('change', function(e) {
                                                $scope.Edarticle.texte = e.level.content;
                                            });
                                        },



                                        toolbar1: "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | forecolor backcolor | formatselect",
                                        toolbar2: "table | bullist numlist | subscript superscript | outdent indent blockquote | link unlink anchor code | insertdatetime",
                                        toolbar3: "cut copy paste |  undo redo | searchreplace | removeformat | charmap | preview fullscreen | spellchecker | visualblocks"
                                    });

                                });
                            }
                        });



                    $scope.edit = function (iform){
                        $('textarea').tinymce().save();
                        if($routeParams.id === "new"){
                            //$scope.user.articles.push(iform);

                            //$http.post(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/users/'+$scope.user.id+'/articles',$scope.Edarticle).
                             //   success(function (data) {
                            iform.authorId = $scope.user.id;
                            $rootScope.loading = true;
                            resourceManager.UserArticle.new(iform,function (data){
                                $rootScope.loading = false;
                                    $scope.Edarticle = data;
                                resourceManager.Articles.clearCached();
                                resourceManager.FullRootArticles.clearCached();
                                resourceManager.RootArticles.clearCached();
                                resourceManager.User.clearCached({id:$scope.user.id});
                                //resourceManager.UserArticle.clearCached({authorId:iform.authorId,id:iform.id});

                                $window.location.href = "#/board";

                                },function (data,st){
                                    if(st == 500){
                                        $scope.error = "Un article avec ce nom existe déjà";

                                    } else {
                                        $scope.error = data.error;
                                    }
                                });
                        } else {

                            //$http.put(protocol+'//'+$window.location.host+'/MuneJDR/MuneServ/web/app_dev.php/users/'+$scope.user.id+'/articles/'+$routeParams.id,iform).
                             //   success(function (data) {
                            iform.authorId = $scope.user.id;
                            $rootScope.loading = true;
                            resourceManager.UserArticle.update(iform,function (data){
                                $rootScope.loading = false;
                                    $scope.Edarticle = data;
                                resourceManager.Articles.clearCached();
                                resourceManager.FullRootArticles.clearCached();
                                resourceManager.RootArticles.clearCached();
                                resourceManager.Article.clearCached({id:iform.id});
                                resourceManager.User.clearCached({id: $scope.user.id});

                                //resourceManager.UserArticle.clearCached({authorId:iform.authorId,id:iform.id});
                                    $window.location.href = "#/board";
                                },function (data,st){
                                    $scope.error = data.error;

                                });
                        }


                    }

                },function (data) {
                    $window.location.href = "#/login";
                });
        }



        }])
;
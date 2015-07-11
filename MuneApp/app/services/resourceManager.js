/**
 * Created by Lord BELLOT on 24/06/2015.
 */
'use strict';

angular.module('main.utils', ['ngResource'])
    .factory('resourceManager', ['$resource','$cacheFactory',function ($resource,$cacheFactory){
            return new (function resourceManager(){
                this.Articles = $resource('/MuneJDR/MuneServ/web/app_dev.php/articles',null,{
                    'query': {'cache': true, isArray:true}
                });
                this.Articles.clearCached = function(opt){
                    $cacheFactory.get('$http').remove('/MuneJDR/MuneServ/web/app_dev.php/articles');
                };
                this.FullRootArticles = $resource('/MuneJDR/MuneServ/web/app_dev.php/articles/roots/full',null,{
                    'query': {'cache': true, isArray:true}
                });
                this.FullRootArticles.clearCached = function(opt){
                    $cacheFactory.get('$http').remove('/MuneJDR/MuneServ/web/app_dev.php/articles/roots/full');
                };
                this.RootArticles = $resource('/MuneJDR/MuneServ/web/app_dev.php/articles/roots',null,{
                    'query': {'cache': true, isArray:true}
                });
                this.RootArticles.clearCached = function(opt){
                    $cacheFactory.get('$http').remove('/MuneJDR/MuneServ/web/app_dev.php/articles/roots');
                };
                this.UserArticles = $resource('/MuneJDR/MuneServ/web/app_dev.php/users/:id/articles',null,{
                    'query': {'cache': true, isArray:true}
                });
                this.UserArticles.clearCached = function(opt){
                    $cacheFactory.get('$http').remove('MuneJDR/MuneServ/web/app_dev.php/users/'+opt.id+'/articles');
                };

                this.UserArticle = $resource('/MuneJDR/MuneServ/web/app_dev.php/users/:authorId/articles/:id',null,{
                    'get': {'cache': true},
                    'update': { method:'PUT',params:{authorId:'@authorId',id:'@id'},url:'/MuneJDR/MuneServ/web/app_dev.php/users/:authorId/articles/:id'},
                    'new': {method:'POST',params:{authorId:'@authorId'},url:'/MuneJDR/MuneServ/web/app_dev.php/users/:authorId/articles'}
                });
                this.UserArticle.clearCached = function(opt){
                    $cacheFactory.get('$http').remove('/MuneJDR/MuneServ/web/app_dev.php/users/'+opt.authorId+'/articles/'+opt.id);
                };

                this.User = $resource('/MuneJDR/MuneServ/web/app_dev.php/users/:id',null,{
                    'update': { method:'PUT',params:{id:'@id'} },
                    'get': {'cache': true}
                });
                this.User.clearCached = function(opt){
                    $cacheFactory.get('$http').remove('/MuneJDR/MuneServ/web/app_dev.php/users/'+opt.id);
                };

                this.Article = $resource('/MuneJDR/MuneServ/web/app_dev.php/articles/:id',null,{
                    'update': { method:'PUT' },
                    'get': {'cache':true}
                });
                this.Article.clearCached = function(opt){
                    $cacheFactory.get('$http').remove('/MuneJDR/MuneServ/web/app_dev.php/article/'+opt.id);
                };

            })()
    }]);
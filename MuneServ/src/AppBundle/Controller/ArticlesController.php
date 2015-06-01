<?php

namespace AppBundle\Controller;

use Seld\JsonLint\JsonParser;
use AppBundle\Entity\User;
use AppBundle\Entity\Article;

use Symfony\Component\HttpFoundation\Request,
    Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use FOS\RestBundle\Controller\FOSRestController;
//use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\View\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ArticlesController extends FOSRestController
{



    public function getArticlesAction() {
        $articles = $this->getDoctrine()
            ->getRepository('AppBundle\Entity\Article')
            ->findBy(array("status"=>"published")) ;

        $view = View::create();
        $view->setData($articles);

        return $view;

    }// "get_articles"      [GET] /articles

    public function getArticlesRootsAction() {
        $articles = $this->getDoctrine()
            ->getRepository('AppBundle\Entity\Article')
            ->findBy(array("status"=>"published")) ;
        $outArticles = array();

        foreach ($articles as $art){
            if($art->getParents()->count() < 1){
                $outArticles[] = $art;
            }
        }

        $view = View::create();
        $view->setData($outArticles);

        return $view;

    }// "get_articles_roots"      [GET] /articles/roots


    public function getArticleAction($slug, Request $request)
    {
        $article = $this->getDoctrine()
        ->getRepository('AppBundle\Entity\Article')
        ->findOneBy(array('id'=>$slug)) ;

        if($article->getStatus() !== "published"){
            $user = $this->getDoctrine()
                ->getRepository('AppBundle\Entity\User')
                ->findOneBy(array('id'=>$article->getAuthor()->getId())) ;

            if($sessmail = $request->getSession()->get('mail')) {
                if (isset($user) && $sessmail == $user->getEmail()) {
                    $view = View::create();
                    $view->setData($article);

                    return $view;
                } else {
                    $view = View::create();
                    $view->setStatusCode(401);
                    $view->setData(array("error" => "need authentification"));

                    return $view;
                }
            } else {
                $view = View::create();
                $view->setStatusCode(401);
                $view->setData(array("error" => "need authentification"));

                return $view;
            }

        }
        else {
            $view = View::create();
            $view->setData($article);

            return $view;
        }
    }// "get_article"      [GET] /articles/{slug}


}

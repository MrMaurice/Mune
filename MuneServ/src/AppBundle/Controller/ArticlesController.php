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


    public function getParents(Article $arr){
        $q = $this->getDoctrine()
            ->getRepository('AppBundle\Entity\Article')
            ->createQueryBuilder('a')
            ->join('a.childrens', 'c')
            ->addSelect('a')
            ->where('c.id = :id')
            ->setParameter('id',$arr->getId())
            ->getQuery();

        /*createQuery(
            'SELECT * FROM `truemune_article_truemune_article` as d JOIN truemune_article as p ON p.id = d.truemune_article_source where `truemune_article_target` = :id'
        )->setParameter('id',$arr->getId()) ;*/

        return $q->getResult();
    }

    public function getArticlesAction() {
        $articles = $this->getDoctrine()
            ->getRepository('AppBundle\Entity\Article')
            ->findBy(array("status"=>"published")) ;

        $view = View::create();
        $view->setData($articles);

        return $view;

    }// "get_articles"      [GET] /articles

    public function resetAuthor($article){
        $auth = new User();
        //var_dump($this->author);
        $auth->setEmail($article->getAuthor()->getEmail());
        $auth->setId($article->getAuthor()->getId());
        $auth->setUsername($article->getAuthor()->getUsername());
        $auth->setRole($article->getAuthor()->getRole());
        $article->setAuthor($auth);

        foreach($article->getChildrens()->toArray() as $oneart){
            $this->resetAuthor($oneart);
         }
    }


    public function getArticlesRootsAction() {
        $articles = $this->getDoctrine()
            ->getRepository('AppBundle\Entity\Article')
            ->findBy(array("status"=>"published")) ;
        $outArticles = array();

        foreach ($articles as $art){
            if(sizeOf($this->getParents($art)) < 1){
                $this->resetAuthor($art);
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
                    $this->resetAuthor($article);
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
            $this->resetAuthor($article);

            $view = View::create();
            $view->setData($article);

            return $view;
        }
    }// "get_article"      [GET] /articles/{slug}


}

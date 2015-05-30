<?php

namespace AppBundle\Controller;

use Seld\JsonLint\JsonParser;
use AppBundle\Entity\User;
use Symfony\Component\HttpFoundation\Request,
    Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use FOS\RestBundle\Controller\FOSRestController;
//use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\View\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class UsersController extends FOSRestController
{


    public function putUsersLoginAction(Request $request) {

        $view = View::create();



        /*if(!$request->isSecure()){
            $view->setStatusCode(417);
            $view->setData(array("error"=>"not secured"));
            return $view;
        }*/

        $cred = json_decode($request->getContent());
        if(!isset($cred->password) || !isset($cred->email)){
            $return = array("error"=>"MalformedRequest");
            $code = 422;
        }
        else {
            $user = $this->getDoctrine()
                ->getRepository('AppBundle\Entity\User')
                ->findOneBy(array('email'=>$cred->email)) ;

            if(isset($user) && !empty($user)){
                if($user->getPassword() == $cred->password){

                    $view->setStatusCode(200);
                    $view->setData($user);

                    $session = new Session();
                    $session->start();
                    $session->set('mail',$user->getEmail());
                } else {
                    $view->setStatusCode(412);
                    $view->setData(array("error"=>"Wrong Password"));

                }
            } else {
                $view->setStatusCode(412);
                    $view->setData(array("error"=>"Unknown User"));

            }
        }

        return $view;

    }


    public function getUsersAction() {
        $users = $this->getDoctrine()
            ->getRepository('AppBundle\Entity\User')
            ->findAll() ;

        $view = View::create();
        $view->setData($users);

        return $view;

    }

    public function newUsersAction()
    {} // "new_users"     [GET] /users/new


    public function postUsersAction(Request $request)
    {
        $usr = json_decode($request->getContent());
        /*$user = $this->getDoctrine()
            ->getRepository('AppBundle\Entity\User')
            ->findOneBy(array('id'=>$usr->id)) ;*/
        $user = new User();

        if(!isset($usr->email) || !isset($usr->username) || !isset($usr->password)){
            $return = array('error'=>'MalformedRequest');
            $code = 422;
        }
        else {
            $code = 200;

            $return = $user;
            $user->setEmail($usr->email);
            $user->setUsername($usr->username);
            $user->setPassword($usr->password);
            $user->setRole("REGULAR");
            //$user->setSalt(substr(str_shuffle(MD5(microtime())), 0, 10));
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

        }




        $view = View::create();
        $view->setStatusCode($code);
        $view->setData($return);

        return $view;
    } // "post_users"    [POST] /users

    public function patchUsersAction()
    {} // "patch_users"   [PATCH] /users

    public function getUserAction($slug, Request $request)
    {
        if($sessmail = $request->getSession()->get('mail')){

            $user = $this->getDoctrine()
                ->getRepository('AppBundle\Entity\User')
                ->findOneBy(array('id'=>$slug)) ;

            if($sessmail === $user->getEmail()){
                $view = View::create();
                $view->setData($user);

                return $view;
            } else {
                $view = View::create();
                $view->setStatusCode(401);
                $view->setData(array("error"=>"need authentification"));

                return $view;
            }


        } else {
            $view = View::create();
            $view->setStatusCode(401);
            $view->setData(array("error"=>"need authentification"));

            return $view;
        }


    } // "get_user"      [GET] /users/{slug}

    public function editUserAction($slug)
    {} // "edit_user"     [GET] /users/{slug}/edit

    public function putUserAction($slug, Request $request)
    {
        $usr = json_decode($request->getContent());
        $user = $this->getDoctrine()
            ->getRepository('AppBundle\Entity\User')
            ->findOneBy(array('id'=>$slug)) ;


        if(!isset($usr->email) || !isset($usr->username) || !isset($usr->password)|| $usr->id != $slug ){
            $return = array('error'=>'MalformedRequest', 'objectSend'=>$request->getContent());
            $code = 422;
        }
        else {
            $code = 200;

            $return = $user;
            $user->setEmail($usr->email);
            $user->setUsername($usr->username);
            $user->setPassword($usr->password);
            $user->setRole($usr->role);
            //$user->setSalt(substr(str_shuffle(MD5(microtime())), 0, 10));
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

        }




        $view = View::create();
        $view->setStatusCode($code);
        $view->setData($return);

        return $view;
    } // "put_user"      [PUT] /users/{slug}

    public function patchUserAction($slug)
    {} // "patch_user"    [PATCH] /users/{slug}

    public function removeUserAction($slug)
    {} // "remove_user"   [GET] /users/{slug}/remove

    public function deleteUserAction($slug)
    {} // "delete_user"   [DELETE] /users/{slug}

    public function getUserArticlesAction($slug)
    {} // "get_user_comments"    [GET] /users/{slug}/articles

    public function newUserArticlesAction($slug)
    {} // "new_user_comments"    [GET] /users/{slug}/articles/new

    public function postUserArticlesAction($slug)
    {} // "post_user_comments"   [POST] /users/{slug}/articles

    public function getUserArticleAction($slug, $id)
    {} // "get_user_comment"     [GET] /users/{slug}/articles/{id}

    public function editUserArticleAction($slug, $id)
    {} // "edit_user_comment"    [GET] /users/{slug}/articles/{id}/edit

    public function putUserArticleAction($slug, $id)
    {} // "put_user_comment"     [PUT] /users/{slug}/articles/{id}

    public function removeUserArticleAction($slug, $id)
    {} // "remove_user_comment"  [GET] /users/{slug}/comments/{id}/remove

    public function deleteUserArticleAction($slug, $id)
    {} // "delete_user_comment"  [DELETE] /users/{slug}/comments/{id}




}

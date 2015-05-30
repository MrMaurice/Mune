<?php

namespace AppBundle\Controller;
use AppBundle\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations;

use FOS\RestBundle\View\View;
//use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends FOSRestController
{


    /**
     * @Route("/app/login",name="login")
     */
    public function loginAction(Request $request) {

        $view = View::create();



        if(!$request->isSecure()){
            $view->setStatusCode(417);
            $view->setData(array("error"=>"not secured"));
            return $view;
        }

        $cred = $request->getContent();
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
                    $return = $user;
                    $code = 204;
                } else {
                    $return = array("error"=>"Wrong Password");
                    $code = 412;
                }
            } else {
                $return = array("error"=>"Unknown User");
                $code = 412;
            }
        }
        $view->setStatusCode($code);
        $view->setData($return);
        return $view;

    }


}

<?php
/**
 * Created by IntelliJ IDEA.
 * User: Lord BELLOT
 * Date: 12/01/2015
 * Time: 23:00
 */

namespace AppBundle\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;


/**

 * @ORM\Entity

 * @ORM\Table

 */
class Article
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;



    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="articles")
     */
    private $author;

    /**
     * @ORM\Column(type="string", length=60)
     */
    private $status;

    /**
     * @ORM\Column(type="string", length=6000)
     */
    private $texte;

    /**
     * @ORM\Column(type="string", length=120)
     */
    private $title;

    /**
     * @ORM\ManyToMany(targetEntity="Article", mappedBy="childrens")
     *
    private $parents;*/

    /**
     * @ORM\ManyToMany(targetEntity="Article")
     */
    private $childrens;

    /**
     * @return mixed
     */
    public function getChildrens()
    {
        return $this->childrens;
    }

    /**
     * @param mixed $childrens
     */
    public function setChildrens($childrens)
    {
        $this->childrens = $childrens;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getAuthor()
    {
        /*$auth = new User();
        //var_dump($this->author);
        $auth->setEmail($this->author->id);
        $auth->setId($this->author->email);
        $auth->setUsername($this->author->email);
        $auth->setRole($this->author->email);
*/

        return $this->author;
    }

    /**
     * @param mixed $author
     */
    public function setAuthor($author)
    {
        $this->author = $author;
    }

    /**
     * @return mixed
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param mixed $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
    }

    /**
     * @return mixed
     */
    public function getTexte()
    {
        return $this->texte;
    }

    /**
     * @param mixed $texte
     */
    public function setTexte($texte)
    {
        $this->texte = $texte;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return mixed
     *
    public function getParents()
    {
        return $this->parents;
    }

    /**
     * @param mixed $parents
     *
    public function setParents($parents)
    {
        $this->parents = $parents;
    }


    public function hasParent(Article $article)
    {
        return $this->parents->contains($article);
    }



    /**
     * Add parents
     *
     * @param Article $article
     *

    public function addParent(Article $article)

    {
        $this->parents[] = $article;
    }

    /**
     * Remove parents
     *
     * @param Article $article
     *
    public function removeParent(Article $article)

    {
        $this->parents->removeElement($article);
    }

    public function hasChild(Article $article)
    {
        return $this->childrens->contains($article);
    }*/



    /**
     * Add parents
     *
     * @param Article $article
     */

    public function addChild(Article $article)

    {
        $this->childrens[] = $article;
    }

    /**
     * Remove parents
     *
     * @param Article $article
     */
    public function removeChild(Article $article)

    {
        $this->childrens->removeElement($article);
    }


    public function __construct()
    {
        //$this->parents = new ArrayCollection();
        $this->childrens = new ArrayCollection();
    }

}
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
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Exclude;


/**

 * @ORM\Entity

 * @ORM\Table

 */
class User implements UserInterface, \Serializable, \JsonSerializable
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;



    /**
     * @ORM\Column(type="string", length=25, unique=true)
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=64)
     * @Exclude
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=64)
     */
    private $salt;

    /**
     * @ORM\Column(type="string", length=60, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=60)
     */
    private $role;

    /**
     * @ORM\OneToMany(targetEntity="Article", mappedBy="author")
     */
    private $articles;

    /**
     * @return mixed
     */
    public function getArticles()
    {
        return $this->articles;
    }

    /**
     * @param mixed $articles
     */
    public function setArticles($articles)
    {
        $this->articles = $articles;
    }

    /**
     * @param mixed $articles
     */
    public function getArticlesLighter()
    {
        $articlesLighter = array();
        foreach($this->articles as $anarticle){
            $author = $anarticle->getAuthor();
            $anarticle->setAuthor($author->getId());
            $articlesLighter[] = $anarticle;
        }

        return $articlesLighter;
    }

    /**
     * @return mixed
     */
    public function getIsActive()
    {
        return $this->isActive;
    }

    /**
     * @param mixed $isActive
     */
    public function setIsActive($isActive)
    {
        $this->isActive = $isActive;
    }


    /**
     * @ORM\Column(name="is_active", type="boolean")
     */
    private $isActive;

    public function __construct()
{
    $this->articles = new ArrayCollection();
    $this->isActive = true;
    // may not be needed, see section on salt below
     $this->salt = md5(uniqid(null, true));
}


    /**
     * @inheritDoc
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @inheritDoc
     */
    public function setId($id)
    {
        $this->id = $id;
    }


    /**
     * @inheritDoc
     */
    public function getUsername()
{
    return $this->username;
}

    /**
     * @inheritDoc
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }

    /**
     * @inheritDoc
     */
    public function getSalt()
{
    // you *may* need a real salt depending on your encoder
    // see section on salt below
    return $this->salt;
    //return null;
}

    /**
     * @inheritDoc
     */
    public function getPassword()
{
    return $this->password;
}

    /**
     * @inheritDoc
     */
    public function setPassword($pass)
    {
        //$factory = $this->container->get('security.encoder_factory');
        //$encoder = $factory->getEncoder($this);
        //$encoder->encodePassword($pass, $this->getSalt());
        $this->password = hash_hmac("sha256",$pass,$this->getSalt());
    }

    /**
     * @inheritDoc
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * @inheritDoc
     */
    public function setRole($role)
    {
        $this->role = $role;
    }

    /**
     * @inheritDoc
     */
    public function getEmail()
    {
        return $this->email;
    }


    /**
     * @inheritDoc
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }
    /**
     * @inheritDoc
     */
    public function getRoles()
{
    return array('ROLE_ADMIN');
}

    public function hasArticle(Article $article)
    {
        return $this->articles->contains($article);
    }



    /**
     * Add article
     *
     * @param Article $article
     */

    public function addArticle(Article $article)

    {
        $this->articles[] = $article;
    }

    /**
     * Remove article
     *
     * @param Article $article
     */
    public function removeArticle(Article $article)

    {
        $this->articles->removeElement($article);
    }


    /**
     * @inheritDoc
     */
    public function eraseCredentials()
{
}

    /**
     * @see \Serializable::serialize()
     */
    public function serialize()
{
    return serialize(array(
        $this->id,
        $this->username//,
        //$this->password,
        // see section on salt below
        //$this->salt,
    ));
}

    /**
     * @see \Serializable::unserialize()
     */
    public function unserialize($serialized)
{
    list (
        $this->id,
        $this->username//,
        //$this->password,
        // see section on salt below
        //$this->salt
        ) = unserialize($serialized);
}


    /**
     * (PHP 5 &gt;= 5.4.0)<br/>
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed
     * data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     */
    public function jsonSerialize()
    {
        // TODO: Implement jsonSerialize() method.

        return array(
            "id" => $this->id,
            "username" => $this->username,
            "email" => $this->email,
            "role" => $this->role,
            "articles" => $this->getArticles()
        );

    }
}
<?php
/**
 * Created by IntelliJ IDEA.
 * User: Lord BELLOT
 * Date: 12/01/2015
 * Time: 23:00
 */

namespace AppBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;


/**

 * @ORM\Entity

 * @ORM\Table

 */
class User implements UserInterface, \Serializable
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
     * @ORM\Column(type="string", length=60, unique=true)
     */
    private $role;



    /**
     * @ORM\Column(name="is_active", type="boolean")
     */
    private $isActive;

    public function __construct()
{
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
        $this->password = $pass;
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
        $this->username,
        $this->password,
        // see section on salt below
        $this->salt,
    ));
}

    /**
     * @see \Serializable::unserialize()
     */
    public function unserialize($serialized)
{
    list (
        $this->id,
        $this->username,
        $this->password,
        // see section on salt below
        $this->salt
        ) = unserialize($serialized);
}
}
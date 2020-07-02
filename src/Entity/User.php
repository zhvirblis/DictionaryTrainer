<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Entity\Dictionary;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\Table(name="users")
 */

class User implements UserInterface
{
    /**
     * @ORM\Id
	 * @ORM\Column(type="integer")
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	private $id;
	
	/**
	 * @ORM\Column(name="username", type="string", length=100, nullable=false, unique=true)
	 */
	private $username;

	/**
	 * @ORM\Column(name="password", type="string", length=100, nullable=false)
	 */
	private $password;

	/**
     * @ORM\Column(name="email", type="string", length=100, nullable=false, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(name="roles", type="json")
     */
	private $roles = [];
	
	/**
	* @ORM\OneToMany(targetEntity="Dictionary", mappedBy="author")
	*/
	protected $dictionaries = [];

	public function __construct() {
		$this->dictionaries = new ArrayCollection();
	}

	public function getId(): int
	{
		return $this->id;
	}

	public function getUsername()
	{
		return $this->username;
	}

	public function setUsername(string $username): self
	{
		$this->username = $username;
		return $this;
	}

	public function getPassword()
	{
		return $this->password;
	}

	public function setPassword(string $password): self
	{
		$this->password = $password;
		return $this;
	}

	public function getEmail(): ?string
	{
		return $this->email;
	}

	public function setEmail(string $email): self
	{
		$this->email = $email;
		return $this;
	}

	public function getIsActive(): bool
	{
		return $this->isActive;
	}

	public function setIsActive(bool $isActive): self
	{
		$this->isActive = $isActive;
		return $this;
	}

	public function getRoles(): array
	{
		$roles = $this->roles;

		if (empty($roles)) {
			$roles[] = 'ROLE_USER';
		}

		return array_unique($roles);
	}

    public function setRoles($roles)
	{
		$this->roles = $roles;
		return $this;
	}

	public function getSalt()
	{
	}

	public function eraseCredentials()
	{
	}

	public function addToken(Token $token): self
	{
		$this->tokens[] = $token;
		return $this;
	}

	public function addDictionary(Dictionary $dictionary): void
	{
		$this->dictionaries[] = $dictionary;
	}

	public function getDictionaries()
	{
		return $this->dictionaries;
	}
}

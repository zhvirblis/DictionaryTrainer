<?php
declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\User;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DictionaryRepository")
 * @ORM\Table(name="dictionaries")
 */
class Dictionary
{
    /**
     * @ORM\Id
	 * @ORM\Column(type="integer")
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
    private $id;

    /**
	 * @ORM\Column(name="name", type="string", length=100, nullable=false, unique=false)
	 */
    private $name;
    
    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="dictionaries")
     */
    protected $author;
    
    public function getId(): int
	{
		return $this->id;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }
    
    public function setAuthor(User $author)
    {
        $author->addDictionary($this);
        $this->author = $author;
    }

    public function getAuthor()
    {
        return $this->author;
    }
}
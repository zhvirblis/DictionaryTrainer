<?php
declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\User;
use App\Entity\Term;
use Doctrine\Common\Collections\ArrayCollection;

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

    /**
	* @ORM\OneToMany(targetEntity="Term", mappedBy="dictionary")
	*/
    protected $terms = [];

    public function __construct() {
		$this->terms = new ArrayCollection();
	}
    
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

    public function addTerm(Term $term): void
	{
		$this->terms[] = $term;
    }
    
    public function getTerms()
    {
        return $this->terms;
    }
}
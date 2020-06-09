<?php
declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TermRepository")
 */
class Term
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     */
    private $origin;

    /**
     * @ORM\Column(type="string")
     */
    private $transcription;

    /**
     * @ORM\Column(type="string")
     */
    private $translate;

    /**
     * @ORM\Column(type="string")
     */
    private $helper;

    /**
     * @ORM\Column(type="integer")
     */
    private $listId;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOrigin(): ?string
    {
        return $this->$origin;
    }

    public function getTranscription(): ?string
    {
        return $this->$transcription;
    }
}

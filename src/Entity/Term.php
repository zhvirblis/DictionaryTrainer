<?php
declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\Dictionary;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TermRepository")
 * @ORM\Table(name="term")
 */
class Term
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer", name="id")
     */
    private $id;

    /**
     * @ORM\Column(type="string", name="origin")
     */
    private $origin;

    /**
     * @ORM\Column(type="string", name="transcription", nullable=true)
     */
    private $transcription;

    /**
     * @ORM\Column(type="string", name="translate")
     */
    private $translate;

    /**
     * @ORM\Column(type="string", name="helper", nullable=true)
     */
    private $helper;

    /**
     * @ORM\Column(type="integer")
     */
    private $dictionaryId;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private $rightAnswersCount;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private $wrongAnswersCount;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOrigin(): ?string
    {
        return $this->origin;
    }

    public function setOrigin(string $origin) {
        $this->origin = $origin;
        return $this;
    }

    public function getTranscription(): ?string
    {
        return $this->transcription;
    }

    public function setTranscription(string $transcription)
    {
        $this->transcription = $transcription;
        return $this;
    }

    public function setTranslate(string $translate)
    {
        $this->translate = $translate;
        return $this;
    }

    public function getTranslate()
    {
        return $this->translate;
    }

    public function setHelper(string $helper)
    {
        $this->helper = $helper;
        return $this;
    }

    public function getHelper()
    {
        return $this->helper;
    }

    public function getRightAnswersCount() {
        return $this->rightAnswersCount;
    }

    public function increaseRightAnswers() {
        $this->rightAnswersCount++;
        return $this;
    }

    public function getWrongAnswerCount() {
        return $this->wrongAnswersCount;
    }
    
    public function increaseWrongAnswers() {
        $this->wrongAnswersCount++;
    }

    /**
     * @ORM\ManyToOne(targetEntity="Dictionary", inversedBy="terms")
     */
    protected $dictionary;

    public function setDictionary(Dictionary $dictionary)
    {
        $dictionary->addTerm($this);
        $this->dictionary = $dictionary;
    }

    public function getDictionary()
    {
        return $this->dictionaryId;
    }
}

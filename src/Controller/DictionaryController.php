<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api/dictionary")
 */
class DictionaryController extends AbstractController
{

    /**
     * @Route("/", name="dictionary_index", methods="GET")
     */
    public function index()
    {
        $dictionaries = ["kek", "lol"];
        return new JsonResponse($dictionaries);
    }
}

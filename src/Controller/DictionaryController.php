<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\User;

/**
 * @Route("/api/dictionary")
 */
class DictionaryController extends AbstractController
{

    /**
     * @Route("/", name="dictionary_index", methods="GET")
     
     */
    public function index(Request $request)
    {
        $user = $request->getUser();
        $dictionaries = ["kek", "lol", $user];
        return new JsonResponse($dictionaries);
    }
}

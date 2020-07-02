<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\User;
use App\Entity\Dictionary;
use App\Form\DictionaryType;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * @Route("/api/dictionary")
 */
class DictionaryController extends AbstractController
{

    /**
     * @Route(name="get_dictionary", methods="GET")
     */
    public function index(Request $request)
    {
        $user = $this->getUser();
        $userEntity = new User();
        $dictionaries = $userEntity->getDictionaries();
        return new JsonResponse($dictionaries);
    }

    /**
     * @Route(name="add_dictionary", methods="POST")
     */
    public function add(Request $request)
    {
        $user = $this->getUser();
        $dictionary = new Dictionary();
        $form = $this->createForm(DictionaryType::class, $dictionary);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $dictionary->setAuthor($user);
            $em = $this->getDoctrine()->getManager();
            
            $em->persist($dictionary);
            $em->flush();

            return new JsonResponse(['status' => 'ok']);
        }

        throw new HttpException(400, "Invalid data");
    }
}

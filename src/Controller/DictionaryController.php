<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\User;
use App\Entity\Term;
use App\Entity\Dictionary;
use App\Form\DictionaryType;
use App\Form\TermType;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * @Route("/api/dictionary")
 */
class DictionaryController extends AbstractController
{

    /**
     * @Route(name="get_dictionaries", methods="GET")
     */
    public function index(Request $request)
    {
        $user = $this->getUser();
        
        $repository = $this->getDoctrine()->getRepository(Dictionary::class);
        $dictionaries = $repository->findBy([
            "author" => $user->getId()
        ]);
        $dictionaries = array_map(function($dict){
            return array(
                "id" => $dict->getId(),
                "name" => $dict->getName()
            );
        }, $dictionaries);
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

    /**
     * @Route("/{id}/edit", methods="POST")
     */
    public function edit(Request $request, $id)
    {
        $user = $this->getUser();
        $repository = $this->getDoctrine()->getRepository(Dictionary::class);
        $dictionary = $repository->findOneBy([
            "author" => $user->getId(),
            "id" => $id
        ]);
        $form = $this->createForm(DictionaryType::class, $dictionary);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            
            $em->persist($dictionary);
            $em->flush();

            return new JsonResponse(['status' => 'ok']);
        }
        
        throw new HttpException(400, "Invalid data");
    }
    
    /**
     * @Route("/{id}", methods="GET")
     */
    public function getDictionary(Request $request, $id)
    {
        $user = $this->getUser();
        $repository = $this->getDoctrine()->getRepository(Dictionary::class);
        $repTerm = $this->getDoctrine()->getRepository(Term::class);
        $dictionary = $repository->findOneBy([
            "author" => $user->getId(),
            "id" => $id
        ]);
        $terms = $repTerm->findBy([
            "dictionaryId" => $dictionary->getId()
        ]);
        return new JsonResponse(array(
            "id" => $dictionary->getId(),
            "name" => $dictionary->getName(),
            "terms" => array_map(function($term){
                return array(
                    "id" => $term->getId(),
                    "origin" => $term->getOrigin(),
                    "transcription" => $term->getTranscription(),
                    "translate" => $term->getTranslate(),
                    "helper" => $term->getHelper()
                );
            }, $terms)
        ));
    }

    /**
     * @Route("/{id}", methods="DELETE")
     */
    public function deleteDictionary(Request $request, $id)
    {
        $user = $this->getUser();
        $repository = $this->getDoctrine()->getRepository(Dictionary::class);
        $dictionary = $repository->findOneBy([
            "author" => $user->getId(),
            "id" => $id
        ]);
        $em = $this->getDoctrine()->getManager();
        $em->remove($dictionary);
        $em->flush();
        if($dictionary) {
            return new JsonResponse(['status' => 'ok']);
        } else {
            throw new HttpException(404, "Not Found");
        }
    }

    /**
     * @Route("/{id}/term", methods="POST")
     */
    public function addTerm(Request $request, $id) {
        $user = $this->getUser();
        $repository = $this->getDoctrine()->getRepository(Dictionary::class);
        $dictionary = $repository->findOneBy([
            "author" => $user->getId(),
            "id" => $id
        ]);
        if(!$dictionary) {
            throw new HttpException(404, "Dictionary not found");
        }
        $term = new Term(); 
        $form = $this->createForm(TermType::class, $term);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            //$dictionary->addTerm($term);
            $em = $this->getDoctrine()->getManager();
            $term->setDictionary($dictionary);
            $em->persist($term);
            $em->flush();
        }
        return new JsonResponse(['status' => 'ok']);
    }

    /**
     * @Route("/{dictId}/term/{termId}", methods="DELETE")
     */
    public function deleteTerm(Request $request, $dictId, $termId) {
        $user = $this->getUser();
        $repository = $this->getDoctrine()->getRepository(Dictionary::class);
        $dictionary = $repository->findOneBy([
            "author" => $user->getId(),
            "id" => $dictId
        ]);
        if(!$dictionary) {
            throw new HttpException(404, "Dictionary not found");
        }
        $repTerm = $this->getDoctrine()->getRepository(Term::class);
        $currTerm = $repTerm->findOneBy([
            "id" => $termId,
            "dictionaryId" => $dictionary->getId()
        ]);
        $em = $this->getDoctrine()->getManager();
        $em->remove($currTerm);
        $em->flush();
        if($currTerm) {
            return new JsonResponse(['status' => 'ok']);
        } else {
            throw new HttpException(404, "Not Found");
        }
    }

    /**
     * @Route("/{dictId}/term/{termId}/edit", methods="POST")
     */
    public function editTerm(Request $request, $dictId, $termId) {
        $user = $this->getUser();
        $repository = $this->getDoctrine()->getRepository(Dictionary::class);
        $dictionary = $repository->findOneBy([
            "author" => $user->getId(),
            "id" => $dictId
        ]);

        if(!$dictionary) {
            throw new HttpException(404, "Dictionary not found");
        }

        $repTerm = $this->getDoctrine()->getRepository(Term::class);
        $currTerm = $repTerm->findOneBy([
            "id" => $termId,
            "dictionaryId" => $dictionary->getId()
        ]);

        $form = $this->createForm(TermType::class, $currTerm);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($currTerm);
            $em->flush();
            return new JsonResponse(['status' => 'ok']);
        }
        throw new HttpException(400, "Invalid data");
    }
}

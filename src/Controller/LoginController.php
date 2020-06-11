<?php

namespace App\Controller;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Form\LoginType;

class LoginController extends AbstractFOSRestController {
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * @Route("/api/token", name="token_authentication", methods="POST")
     */
    public function newToken(Request $request, JWTTokenManagerInterface $JWTManager): JsonResponse
    {

        $user = new User();
        $form = $this->createForm(LoginType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $username = $user->getUsername();
            $password = $user->getPassword();

            $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['username' => $username]);
            
            if (!$user) {
                throw new BadCredentialsException();
            }

            $isValid = $this->passwordEncoder->isPasswordValid($user, $password);


            if (!$isValid) {
                throw new BadCredentialsException();
            }

            return new JsonResponse([
                'access_token' => $JWTManager->create($user),
                'exp' => time() + 3600 // 1 hour expiration
            ]);
        }
    }
}
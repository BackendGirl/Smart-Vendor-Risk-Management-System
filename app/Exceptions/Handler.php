<?php

use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

public function render($request, Throwable $exception)
{
    if ($request->inertia()) {

        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {

            if ($exception->getStatusCode() === 403) {
                return inertia('Errors/403', [
                    'status' => 403
                ])->toResponse($request)->setStatusCode(403);
            }
        }

        if ($exception instanceof \Spatie\Permission\Exceptions\UnauthorizedException) {
            return inertia('Errors/403', [
                'status' => 403
            ])->toResponse($request)->setStatusCode(403);
        }
    }

    return parent::render($request, $exception);
}
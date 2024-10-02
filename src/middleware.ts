// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token'); // Vérifiez le cookie 'token'

    // Redirection pour la page d'accueil
    if (!token && (request.nextUrl.pathname === '/accueil' || request.nextUrl.pathname === '/users/verification') ) {
        return NextResponse.redirect(new URL('/users/login', request.url));
    }

    // Redirection pour les pages de connexion et d'inscription
    if (token && (request.nextUrl.pathname === '/users/login' || request.nextUrl.pathname === '/register' || request.nextUrl.pathname === '/users/forgot_password' )) {
        return NextResponse.redirect(new URL('/accueil', request.url));
    }

    return NextResponse.next();
}

// Configurer le matcher pour les routes protégées
export const config = {
    matcher: ['/accueil', '/users/login', '/register', '/users/verification' ,'/users/forgot_password'], // Appliquer le middleware sur ces routes
};
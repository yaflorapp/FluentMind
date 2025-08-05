import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('__session')?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup');
  const isProtected = request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/classroom') || request.nextUrl.pathname.startsWith('/tutor');

  if (!session && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (session) {
    try {
      // Verify the session cookie. If it's invalid, it will throw an error.
      await auth.verifySessionCookie(session, true);
      
      // If the user is authenticated and tries to access login/signup, redirect to dashboard.
      if (isAuthPage) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      // If verification fails, it's an invalid or expired session.
      // Redirect to login and clear the faulty cookie.
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('__session');
      if (isProtected) {
        return response;
      }
    }
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

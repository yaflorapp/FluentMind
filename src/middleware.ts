import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/firebase-admin';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('__session')?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup') || request.nextUrl.pathname.startsWith('/forgot-password');
  const isProtected = request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/classroom') || request.nextUrl.pathname.startsWith('/tutor');

  if (!session && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (session) {
    try {
      // Verify the session cookie. If it's invalid, it will throw an error.
      const decodedClaims = await auth.verifySessionCookie(session, true);
      
      // If the user is authenticated and tries to access an auth page, redirect to dashboard.
      if (isAuthPage) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      // If verification fails, it's an invalid or expired session.
      // Clear the faulty cookie and redirect to login if the page was protected.
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

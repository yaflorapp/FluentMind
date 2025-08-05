
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/firebase-admin';

// By exporting runtime, we are explicitly telling Next.js to run this middleware on the Node.js runtime.
// This is required to use Node.js modules like 'path' which firebase-admin depends on.
export const runtime = 'nodejs'

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
      await auth.verifySessionCookie(session, true);
      
      // If the user is authenticated and tries to access an auth page, redirect to dashboard.
      if (isAuthPage) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      // If verification fails, it's an invalid or expired session.
      // We will clear the cookie and, if the page was protected, redirect to login.
      const response = isProtected 
        ? NextResponse.redirect(new URL('/login', request.url))
        : NextResponse.next();
      
      response.cookies.delete('__session');
      return response;
    }
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

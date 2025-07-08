// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user is trying to access protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/booking/new') ||
      request.nextUrl.pathname.startsWith('/booking/payment')) {
    
    // Since we're using localStorage for token storage, we can't check it in middleware
    // Instead, we'll let the client-side authentication handle redirects
    // The AuthContext in the client will check localStorage and redirect if needed
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/booking/new',
    '/booking/payment/:path*',
  ],
};
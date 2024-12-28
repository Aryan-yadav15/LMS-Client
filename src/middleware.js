import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === 'admin' || token?.role === 'superadmin';
    const isSuperAdmin = token?.role === 'superadmin';
    const pathname = req.nextUrl.pathname;

    // Protect admin routes
    if (pathname.startsWith('/admin') && !isAdmin) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    // Protect superadmin routes
    if (pathname.startsWith('/admin/superadmin') && !isSuperAdmin) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Specify which routes to protect
export const config = {
  matcher: [
    '/admin/:path*',
    '/profile/:path*',
    '/courses/create',
    '/workshops/create',
    '/events/create',
    '/internships/create',
  ],
}; 
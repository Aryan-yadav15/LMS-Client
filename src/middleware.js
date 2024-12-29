import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isSuperAdmin = token?.role === 'superadmin';
    const pathname = req.nextUrl.pathname;

    // Protect admin routes
    if (pathname.startsWith('/admin') && !isSuperAdmin) {
      return NextResponse.redirect(new URL('/', req.url)); // Redirect to homepage if not superadmin
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
  matcher: ['/admin/:path*'], // Protect all admin routes
}; 
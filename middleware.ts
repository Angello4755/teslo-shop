import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {

  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || ''});

  const res = NextResponse.next();
  const requestedPage = req.nextUrl.pathname;

  if(!session) {
    if( requestedPage.includes('/api') ) {
      return new Response( JSON.stringify({ message: 'No autorizado' }),{
        status: 401,
        headers:{
          'Content-Type':'application/json'
        }
        }); 
    }
    return NextResponse.redirect(new URL(`/auth/login?p=${ requestedPage  }`, req.url));
  }

  if( requestedPage.includes('/admin') ) {
      const validRoles = ['admin', 'super-user', 'SEO'];
      if (!validRoles.includes(session.user.role)) {
        return NextResponse.redirect(new URL(`/`, req.url));
      } 
  }

  return res;
}

export const config = {
  matcher: ['/checkout/address', '/checkout/summary', '/admin', '/api/admin/:path*' ]
}
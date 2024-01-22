import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const isAuthenticated = () => {
  const token = cookies().get('token');
  const userId = cookies().get('userId');
  return !!(token && userId);
};

export async function middleware(request) {
  if (!isAuthenticated() && request.nextUrl.pathname.startsWith('/account')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!isAuthenticated() && request.nextUrl.pathname.startsWith('/reservation/')) {
    return NextResponse.redirect(new URL('/reservation', request.url));
  }

  if (isAuthenticated() && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  if (isAuthenticated()) {
    return NextResponse.next();
  }
  return NextResponse.next(new URL('/', request.url));
}

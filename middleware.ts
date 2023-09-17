import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// export default withAuth(
//   async function middleware(req) {
//     const requestHeaders = new Headers(req.headers);
//     requestHeaders.set('x-pathname', req.nextUrl.pathname);
//     const token = await getToken({ req });
//     const isAuth = !!token;
//     const isAuthPage = req.nextUrl.pathname.startsWith('/login');

//     if (isAuthPage) {
//       if (isAuth) {
//         return NextResponse.redirect(new URL('/', req.url));
//       }

//       return null;
//     }

//     if (!isAuth) {
//       let from = req.nextUrl.pathname;
//       if (req.nextUrl.search) {
//         from += req.nextUrl.search;
//       }

//       return NextResponse.redirect(
//         new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
//       );
//     }

//   },
//   {
//     callbacks: {
//       async authorized() {
//         // This is a work-around for handling redirect on auth pages.
//         // We return true here so that the middleware function above
//         // is always called.
//         return true;
//       },
//     },
//   }

// );

// export const config = {
//   matcher: ['/login'],
// };

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

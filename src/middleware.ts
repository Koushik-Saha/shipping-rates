import { withAuth } from 'next-auth/middleware';

export default withAuth(
    function middleware(req) {
        // Middleware can be extended here if needed
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Allow access if user has a valid token
                return !!token;
            },
        },
        pages: {
            signIn: '/auth/signin',
        }
    }
);

export const config = {
    matcher: [
        // '/dashboard/:path*',
        // '/rates/:path*',
        // '/ship/:path*',
        // '/settings/:path*',
        // '/reports/:path*',
        // '/users/:path*'
    ],
};

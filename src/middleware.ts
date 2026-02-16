import { NextRequest, NextResponse } from 'next/server';

const DASHBOARD_AUTH_COOKIE = 'dashboard_access_token';

export function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl;
    const isLoginPage = pathname === '/dashboard/login';
    const isAuthenticated = Boolean(request.cookies.get(DASHBOARD_AUTH_COOKIE)?.value);

    if (!isAuthenticated && !isLoginPage) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = '/dashboard/login';
        loginUrl.searchParams.set('next', `${pathname}${search}`);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthenticated && isLoginPage) {
        const nextPath = request.nextUrl.searchParams.get('next');
        const target =
            nextPath && nextPath.startsWith('/dashboard') && nextPath !== '/dashboard/login'
                ? nextPath
                : '/dashboard';

        const dashboardUrl = request.nextUrl.clone();
        dashboardUrl.pathname = target;
        dashboardUrl.search = '';
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};

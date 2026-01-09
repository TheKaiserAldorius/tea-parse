import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	// Set headers from request.cookies or other source
	// Example: requestHeaders.set('x-custom-header', 'value');

	const response = NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});

	return response;
}

// See "Matching Paths" below to learn more
export const config = {
	// matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
	matcher: '/',
};
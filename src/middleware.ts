// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Lista chronionych ścieżek
  const protectedRoutes = ['/dashboard'];

  // Sprawdzenie, czy użytkownik próbuje wejść na chronioną stronę bez tokenu
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'], // chronione ścieżki
};

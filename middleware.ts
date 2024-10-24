import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware działa, URL:', request.url); // Sprawdź, czy middleware działa

  // Odczytaj ciasteczko 'token'
  const token = request.cookies.get('token');
  console.log('Token:', token); // Sprawdź, czy token jest odczytany

  if (!token) {
    console.log('Brak tokena - przekierowanie na /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/'], // Uruchom middleware na każdej ścieżce, aby upewnić się, że działa
};
import { HeaderPublic } from '@/common/components/header-public';

export const metadata = {
    title: 'Rejestracja',
    description: 'Aplikacja okolicznościowa - Panel Użytkownika',
};
  
  export default function LoginLayout({children}: {children: React.ReactNode}) {
    return (
      <>
        <HeaderPublic />
        {children}
      </>
    );
  }
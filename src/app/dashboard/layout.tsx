import { HeaderPrivate } from '@/common/components/header-private';

export const metadata = {
  title: 'Dashboard',
  description: 'Aplikacja okolicznościowa - Panel Użytkownika',
};

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <HeaderPrivate />
      {children}
    </>
  );
}
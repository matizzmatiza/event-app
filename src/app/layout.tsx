// app/layout.tsx
import '../styles/global.scss';

export const metadata = {
  title: 'Baluj z Nami',
  description: 'Aplikacja okolicznościowa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body style={{ backgroundImage: `url('/img/bg.svg')` }}>
        {children}
      </body>
    </html>
  );
}
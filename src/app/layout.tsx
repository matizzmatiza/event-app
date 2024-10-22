import '../styles/global.scss';
import { HeaderPublic } from '@/common/components/header-public';

export const metadata = {
  title: 'Baluj z Nami',
  description: 'Aplikacja okolicznościowa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body style={{backgroundImage: `url('/img/stars.svg')`}}>
        <HeaderPublic />
        {children}
      </body>
    </html>
  )
}

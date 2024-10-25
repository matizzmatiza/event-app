export const metadata = {
    title: 'Moja osiemnastka',
    description: '',
  };
  
  export default function EventLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="pl">
        <body>
          {children}
        </body>
      </html>
    );
  }
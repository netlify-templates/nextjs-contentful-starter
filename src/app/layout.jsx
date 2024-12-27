import Nav from '../components/Nav';
import '../../styles/globals.css';

export const metadata = {
  title: {
    template: '%s | Losch Guitars',
    default: 'Losch Guitars',
  },
  description: 'Custom guitars made by hand in Illinois',
  metadataBase: new URL('https://loschguitars.com'),
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-cream'>
        <Nav />
        {children}
      </body>
    </html>
  );
}

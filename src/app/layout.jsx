import Nav from '../components/Nav';
import '../../styles/globals.css';

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

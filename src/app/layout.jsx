import Image from 'next/image';
import Link from 'next/link';
import '../../styles/globals.css';

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-cream'>
        <nav className='flex shrink-0 items-center justify-between mb-5 py-8 px-8 font-heading'>
          <div className='flex mx-auto'>
            <Link className='pr-5' href="/">Home</Link>
            <Link className='pr-5' href="/builds">Guitars</Link>
            <Link className='pr-5' href="/other-projects">Not Guitars</Link>
            <Link className='pr-5' href="/about">About</Link>
            <Link className='' href="/contact">Contact</Link>
          </div>

          <Link className='' href="https://instagram.com/losch_guitars" target="_blank">
            <Image
              src='/instagram-icon.png'
              width={24}
              height={24}
              alt='Instagram logo'
            />
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}

'use client'

import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  const navClasses = isOpen ? 'flex flex-col' : 'hidden';

  return (
    <>
      <button
        onClick={handleClick}
        className="lg:hidden flex flex-col justify-center items-center m-5"
      >
        <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}>
        </span>
        <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
        </span>
        <span className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}>
        </span>
      </button>

      <nav className={`${navClasses} lg:flex shrink-0 lg:items-center lg:justify-between mb-5 py-8 px-8 font-heading transition-all transition-discrete`}>
        <div className='flex flex-col lg:flex-row lg:mx-auto'>
          <Link className='pr-5 mb-5 lg:mb-0 no-underline hover:underline hover:transition-all ease-in-out delay-150' href="/">Home</Link>
          <Link className='pr-5 mb-5 lg:mb-0 no-underline hover:underline hover:transition-all ease-in-out delay-150' href="/builds">Guitars</Link>
          <Link className='pr-5 mb-5 lg:mb-0 no-underline hover:underline hover:transition-all ease-in-out delay-150' href="/other-projects">Not Guitars</Link>
          <Link className='pr-5 mb-5 lg:mb-0 no-underline hover:underline hover:transition-all ease-in-out delay-150' href="/about">About</Link>
          <Link className='mb-5 lg:mb-0 hover:underline no-underline hover:transition-all ease-in-out delay-150' href="/contact">Contact</Link>
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
    </>
  );
}

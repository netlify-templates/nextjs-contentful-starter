import Link from 'next/link';
import Image from 'next/image';
import { Button } from './Button.jsx';

const NavLinks = ({ logo, links, button }) => {
  return (
    <div className="flex items-center w-full py-6">
      {logo && <Image src={logo.src} alt="logo" width={150} height={75} className="mr-8" />}
      <nav className="flex justify-between w-full items-center">
        <div className="flex items-center">
          {links
            .filter((link) => !link.floatLeft)
            .map((link) => (
              <Link key={link.id} href={link.url} className="mr-8">
                {link.title}
              </Link>
            ))}
        </div>
        <div className="flex items-center">
          {links
            .filter((link) => link.floatLeft)
            .map((link) => (
              <Link key={link.id} href={link.url} className="mr-8">
                {link.title}
              </Link>
            ))}
            {button && <Button {...button} className="h-[50px]" />}
        </div>
      </nav>
    </div>
  );
};

export default NavLinks;

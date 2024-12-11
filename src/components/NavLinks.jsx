import Link from 'next/link';
import Image from 'next/image';

const NavLinks = ({ logo, links }) => {
  return (
    <div className="flex items-center w-full">
      {logo && <Image src={logo.src} alt="logo" width={200} height={100} />}
      <nav className="flex justify-between w-full">
        <div className="flex">
          {links
            .filter((link) => !link.floatLeft)
            .map((link) => (
              <Link key={link.id} href={link.url} className="mr-4">
                {link.title}
              </Link>
            ))}
        </div>
        <div className="flex">
          {links
            .filter((link) => link.floatLeft)
            .map((link) => (
              <Link key={link.id} href={link.url} className="float-right mr-4">
                {link.title}
              </Link>
            ))}
        </div>
      </nav>
    </div>
  );
};

export default NavLinks;

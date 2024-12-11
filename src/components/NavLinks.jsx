import Link from 'next/link';
import Image from 'next/image';

const NavLinks = ({ logo, links }) => {
  console.log(links);
  return (
    <nav className="flex justify-between w-full">
      {logo && <Image src={logo.src} alt="logo" width={200} height={100} />}
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
            <Link key={link.id} href={link.url} className="ml-4 float-right">
              {link.title}
            </Link>
          ))}
      </div>
    </nav>
  );
};

export default NavLinks;

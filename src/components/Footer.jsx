import Link from 'next/link';

const Footer = ({ items }) => {
  return (
    <nav className="flex justify-between w-full">
      <div className="flex">
        {items
          .filter((link) => !link.floatLeft)
          .map((link) => (
            <Link key={link.id} href={link.url} className="mr-4">
              {link.title}
            </Link>
          ))}
      </div>
      <div className="flex">
        {items
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

export default Footer;

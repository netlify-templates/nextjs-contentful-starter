import Link from 'next/link';

const Footer = ({ items }) => {
  return (
    <footer className="py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left-aligned links */}
          <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
            {items
              .filter((link) => !link.floatLeft)
              .map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="mr-4 mb-2 md:mb-0"
                >
                  {link.title}
                </Link>
              ))}
          </div>

          {/* Right-aligned links */}
          <div className="flex flex-wrap justify-center md:justify-end">
            {items
              .filter((link) => link.floatLeft)
              .map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="text-lg text-gray-300 hover:text-white ml-4 mb-2 md:mb-0"
                >
                  {link.title}
                </Link>
              ))}
          </div>
        </div>
        {/* Optional Footer Text */}
        <div className="text-center text-sm text-gray-400 mt-6">
          <p>&copy; {new Date().getFullYear()} Portia Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

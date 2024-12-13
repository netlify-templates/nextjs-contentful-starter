import '../../styles/globals.css';

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 bg-gray-100">
        {children}
      </body>
    </html>
  );
}

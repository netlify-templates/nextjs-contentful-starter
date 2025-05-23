import '../../styles/globals.css';
import Script from 'next/script';

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-PYS90MHM9WC"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PYS90MHM9WC');
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

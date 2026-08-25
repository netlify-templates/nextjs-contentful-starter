import '../../styles/globals.css';
import { Providers } from '../components/Providers.jsx';
import { Nav } from '../components/Nav.jsx';

export const metadata = {
  title: 'Rappuarvio – kerrostaloarvosteluja asukkailta asukkaille',
  description:
    'Rappuarvio on suomalainen arvostelualusta kerrostaloille. Lue asukkaiden arvioita ja jaa oma kokemuksesi äänieristyksestä, rauhallisuudesta, ympäristöstä ja muusta.',
};

export default async function RootLayout({ children }) {
  return (
    <html lang="fi">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Providers>
          <Nav />
          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
          <footer className="mt-16 border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
            <p>Rappuarvio – kerrostaloarvosteluja asukkailta asukkaille.</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}

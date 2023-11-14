import { Poppins } from 'next/font/google';
import './globals.css';
import Nav from './ui/nav/nav';

const font = Poppins({ weight: ['400'], subsets: ['latin'] });

export const metadata = {
  title: 'Car Rent',
};

export default function RootLayout({ children }) {
  return (
    <html lang='pl'>
      <head>
        <script src='https://kit.fontawesome.com/3be55945c7.js' defer crossOrigin='anonymous'></script>
      </head>
      <body className={font.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}

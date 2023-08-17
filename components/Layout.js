import { Inter } from 'next/font/google';
 
// font settings
//const inter = Inter({ subsets: ['latin'] });

// components
import Nav from '../components/Nav';
import Header from '../components/Header';
import TopLeftImg from '../components/TopLeftImg';

const Layout = ({children}) => {
  return (
    <div 
      className={`page bg-site text-white bg-cover bg-no-repeat font-inter relative`}
    >
      <Nav />
      <Header />
      <TopLeftImg />
      {children}
  </div>
  );
};

export default Layout;

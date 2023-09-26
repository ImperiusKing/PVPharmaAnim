// font settings
//const inter = Inter({ subsets: ['latin'] });
// components
// import Nav from '../components/Nav';
import Header from '../components/Header';

const Layout = ({ children }) => {
  return (
    <div className={`font-inter relative`}>
      <Header />
      {children}
      {/* <Achievement/> */}
    </div>
  );
};

export default Layout;

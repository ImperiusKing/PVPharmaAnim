import Header from "../components/Header.jsx";
import { Footer } from "../components/home/Footer";

const Layout = ({ children }) => {
  return (
    <div className={`font-inter relative`}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

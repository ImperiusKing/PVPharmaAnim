'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Transition from '../components/Transition';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [show, setShown] = useState(false);

  useEffect(() => {
    AOS.init({});

    const timeout = setTimeout(() => setShown(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  // useEffect(() => {
  // }, [show]);

  return (
    <Layout>
      <Transition />
      {show ? <Component {...pageProps} /> : null}
      {/* <Component {...pageProps} /> */}
    </Layout>
  );
}

export default MyApp;

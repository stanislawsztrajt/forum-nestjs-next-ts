import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import 'assets/styles/global.css';
import { Header, Footer } from 'features/ui';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;

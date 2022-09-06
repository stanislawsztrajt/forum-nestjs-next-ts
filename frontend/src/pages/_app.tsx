import React from 'react';
import type { AppProps } from 'next/app';
import 'assets/styles/global.css';
import { Header, Footer } from 'features/ui';
import 'animate.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;

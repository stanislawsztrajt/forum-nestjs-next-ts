import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import 'assets/styles/global.css';
import { Header, Footer } from 'features/ui';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import 'assets/styles/global.css';
import { Header, Footer } from 'features/ui';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { guardRoutes } from 'utils/helpers';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [queryClient] = React.useState(() => new QueryClient());

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    guardRoutes(window.location.pathname, router.push);
  }, [router.route]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>ForumAll - forum about all</title>
          <meta
            name="description"
            content="A meeting or medium where ideas and views on a topic can be exchanged and others can
                be helped. It's all on ForumAll"
          />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

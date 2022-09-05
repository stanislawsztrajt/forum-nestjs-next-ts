import React from 'react'
import type { AppProps } from 'next/app'
import 'assets/styles/global.css'
import Header from 'features/ui/header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  ) 
}

export default MyApp

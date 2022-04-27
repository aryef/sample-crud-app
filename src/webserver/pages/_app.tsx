import '../layers/client/ui/styles/sass/global.scss'


function SafeHydrate({ children }:{children:any}) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function MyApp({ Component, pageProps } : {Component:any, pageProps:any}) {

  return <SafeHydrate><Component {...pageProps} /></SafeHydrate>
}

export default MyApp

import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@utils/theme'
//import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@utils/createEmotionCache'
import { wrapper } from 'store'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {/*  <CssBaseline /> */}
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default wrapper.withRedux(MyApp)

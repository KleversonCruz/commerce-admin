import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes';
import { AppProvider } from '@data/contexts/AppContext';
import { AuthProvider } from '@data/contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <AuthProvider>
        <ThemeProvider>
        <ToastContainer/>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </AppProvider>
  )
}
export default MyApp

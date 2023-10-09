import '../styles/globals.css';
import Layout from '../components/Layout';
import { DataProvider } from '../store/GlobalState';
import Head from 'next/head'; // Importing Head component from next/head
import Footer from '../components/Footer';
function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Layout>
        <Head>
          {/* Adding Font Awesome CDN link */}
          <link
             rel="stylesheet"
             href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
             integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp"
             crossOrigin="anonymous"
          />
        </Head>
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </DataProvider>
  );
}

export default MyApp;

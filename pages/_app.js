import "../styles/globals.scss";
import Layout from "../components/Layout";

import { ThemeProvider } from "../features/ThemeContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;

import '../styles/globals.css'
import { StateContext } from '../context/StateContext'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <StateContext>
        <Component {...pageProps} />
      </StateContext>
    </Layout>
    
  )
}

export default MyApp

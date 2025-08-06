import '../styles/styles.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BottomBar from '../components/BottomBar'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  // Vérifier si c'est une page admin
  const isAdminPage = router.pathname.startsWith('/admin')
  
  // Pour toutes les pages, on affiche Header et Footer
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <BottomBar />
    </>
  )
}
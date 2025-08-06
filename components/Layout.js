import Header from "./Header";
import Footer from "./Footer";
import BottomBar from "./BottomBar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      <main className="min-h-screen">
        {children}
      </main>
      
      <Footer />
      <BottomBar />
    </div>
  );
}
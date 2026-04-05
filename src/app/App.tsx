import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MenuPreview } from './components/MenuPreview';
import { Instagram } from './components/Instagram';
import { SpecialHighlight } from './components/SpecialHighlight';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';
import { FullMenu } from './components/FullMenu';
import { Admin } from './components/Admin';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePathChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  if (path === '/menu') {
    return <FullMenu />;
  }

  if (path === '/admin') {
    return <Admin />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuPreview />
        <Instagram />
        <SpecialHighlight />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

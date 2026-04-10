import React from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Hero from './components/Hero';
import ImageSection from './components/ImageSection';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Portfolio from './components/Portfolio';

const App: React.FC = () => {
  return (
    <div className="relative min-h-[100svh] bg-primary font-sans text-right selection:bg-accent-pink selection:text-white">
      <ParticleBackground />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <Navbar />

        <main className="flex-grow">
          <Hero />
          <About />
          <ImageSection />
          <Portfolio />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default App;


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin, Send } from 'lucide-react';

const XIcon = ({ size = 22 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
  </svg>
);

const BottomNav: React.FC = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        setIsContactVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const galleryObserver = new IntersectionObserver(
      ([entry]) => {
        setIsGalleryVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    const heroSection = document.getElementById('hero');
    const contactSection = document.getElementById('contact');
    const gallerySection = document.getElementById('exploding-gallery');

    if (heroSection) heroObserver.observe(heroSection);
    if (contactSection) contactObserver.observe(contactSection);
    if (gallerySection) galleryObserver.observe(gallerySection);

    return () => {
      if (heroSection) heroObserver.unobserve(heroSection);
      if (contactSection) contactObserver.unobserve(contactSection);
      if (gallerySection) galleryObserver.unobserve(gallerySection);
    };
  }, []);

  // Show logic: Not in hero AND not in contact AND not in gallery
  const isVisible = !isHeroVisible && !isContactVisible && !isGalleryVisible;

  const socialLinks = [
    { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
    { icon: XIcon, href: '#', color: 'hover:text-white' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
    { icon: Send, href: '#', color: 'hover:text-accent-blue' },
  ];

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-auto md:hidden">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
            className="flex items-center gap-6 px-8 py-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {socialLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                whileHover={{ scale: 1.2, y: -4 }}
                className={`text-white/40 transition-colors duration-300 ${link.color}`}
              >
                <link.icon size={22} />
              </motion.a>
            ))}
            <div className="w-[1px] h-6 bg-white/10 mx-2"></div>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="text-white/80 font-black text-sm md:text-base hover:text-white transition-colors"
            >
              تواصل معي
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BottomNav;

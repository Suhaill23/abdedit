import React from 'react';
import { NavItem } from '../types';
import { scrollToSectionById } from '../utils/scrollToSection';

const navItems: NavItem[] = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'نبذة عني', href: '#about' },
  { label: 'إبداع', href: '#about-hobbies' },
  { label: 'أعمالي', href: '#portfolio' },
  { label: 'تواصل معي', href: '#contact' },
];

const Navbar: React.FC = () => {
  const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    scrollToSectionById(href.replace('#', ''));
  };

  return (
    <nav
      aria-label="Primary"
      className="no-scrollbar fixed top-4 left-1/2 z-[110] flex max-w-[calc(100vw-1rem)] -translate-x-1/2 flex-row flex-nowrap items-center gap-3 overflow-x-auto rounded-full border border-white/10 bg-white/10 px-3 py-2 shadow-2xl backdrop-blur-xl transition-all whitespace-nowrap md:top-8 md:w-fit md:gap-6 md:px-8 md:py-3"
    >
      <a
        href="#hero"
        onClick={(event) => handleNavigation(event, '#hero')}
        className="flex shrink-0 cursor-pointer items-center transition-opacity hover:opacity-80"
      >
        <img
          src="/Suhail-logo-svg.svg"
          alt="شعار سهيل"
          width="637"
          height="257"
          decoding="async"
          className="h-8 w-auto object-contain md:h-11"
        />
      </a>

      <div className="mx-1 hidden h-6 w-px shrink-0 bg-white/40 md:block" />

      <ul className="flex flex-nowrap items-center gap-3 sm:gap-4 md:gap-8">
        {navItems.map((item) => (
          <li key={item.label} className="shrink-0">
            <a
              href={item.href}
              onClick={(event) => handleNavigation(event, item.href)}
              className="group relative text-[11px] font-bold text-white/80 transition-colors duration-300 hover:text-white sm:text-xs md:text-base"
            >
              {item.label}
              <span className="absolute -bottom-1 right-0 h-0.5 w-0 bg-brand-cyan transition-all group-hover:w-full" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

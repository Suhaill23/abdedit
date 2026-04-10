import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import Footer from './Footer';

const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
  </svg>
);

const socialPlatforms = [
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://www.instagram.com/suhail4art/',
    hoverBg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
    label: 'إنستجرام',
  },
  {
    name: 'X',
    icon: XIcon,
    href: 'https://x.com/Suhail4Art',
    hoverBg: 'bg-black',
    label: 'منصة X',
    border: 'group-hover:border-white/20',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/suhailsalah',
    hoverBg: 'bg-[#0077b5]',
    label: 'لينكد إن',
  },
];

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-20"
    >
      <div className="flex flex-grow items-center py-12 md:py-0">
        <div className="absolute top-1/2 left-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/5 blur-[120px] pointer-events-none md:h-[600px] md:w-[600px]" />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center md:mb-16"
          >
            <h2 className="mb-6 text-4xl font-black tracking-tighter text-white uppercase md:text-6xl">
              لنعمل معًا
            </h2>
            <div className="mx-auto mb-8 h-1.5 w-32 rounded-sm bg-brand-gradient" />
            <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-white/50 md:text-xl">
              هل لديك رؤية إبداعية تريد تحويلها إلى واقع؟ تواصل معي مباشرة عبر المنصات
              التالية أو البريد الإلكتروني.
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <div className="mb-10 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-500 hover:border-accent-blue/30 md:p-8"
              >
                <div className="rounded-xl bg-accent-blue/20 p-4 text-accent-blue transition-transform group-hover:scale-110">
                  <Mail size={30} />
                </div>
                <div className="text-right">
                  <h4 className="mb-1 text-sm font-bold uppercase tracking-widest text-white/40">
                    البريد الإلكتروني
                  </h4>
                  <a
                    href="mailto:dm@suhailmedia.space"
                    className="text-base font-bold text-white transition-colors hover:text-accent-blue md:text-xl"
                  >
                    dm@suhailmedia.space
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-500 hover:border-accent-red/30 md:p-8"
              >
                <div className="rounded-xl bg-accent-red/20 p-4 text-accent-red transition-transform group-hover:scale-110">
                  <MapPin size={30} />
                </div>
                <div className="text-right">
                  <h4 className="mb-1 text-sm font-bold uppercase tracking-widest text-white/40">
                    الموقع
                  </h4>
                  <p className="text-base font-bold text-white md:text-xl">
                    جدة، المملكة العربية السعودية
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {socialPlatforms.map((platform, idx) => (
                <motion.a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] md:p-10 ${platform.border || ''}`}
                >
                  <div
                    className={`absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100 ${platform.hoverBg}`}
                  />

                  <div className="relative z-10 mb-4 transition-transform duration-500 group-hover:scale-125">
                    <platform.icon size={42} />
                  </div>

                  <span className="relative z-10 mb-2 text-lg font-black">{platform.label}</span>

                  <div className="relative z-10 flex translate-y-4 items-center gap-2 text-xs font-bold uppercase tracking-tighter text-white/70 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    زيارة الحساب <ExternalLink size={12} />
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-12 mt-14 text-center md:mb-0 md:mt-16"
            >
              <a
                href="mailto:dm@suhailmedia.space"
                className="group inline-flex items-center gap-4 rounded-full bg-white px-8 py-4 text-lg font-black text-primary shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] md:px-12 md:py-6 md:text-2xl"
              >
                ابدأ مشروعك الآن
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:rotate-45">
                  <ExternalLink size={20} />
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Contact;

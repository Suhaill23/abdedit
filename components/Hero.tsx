import React, { Suspense, lazy, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAdaptiveMotion } from '../hooks/useAdaptiveMotion';

const Aurora = lazy(() => import('./Aurora'));

const heroSentences = [
  'تصاميم تخطف الأنظار؟',
  'مونتاج ترند يجذب؟',
  'شريك إبداعي لبراندك؟',
];

const heroBackgroundClassName =
  'absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(58,41,255,0.45),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(45,236,238,0.24),transparent_35%),radial-gradient(circle_at_50%_75%,rgba(1,239,172,0.18),transparent_40%)]';

const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);
  const { enableEnhancedEffects, prefersReducedMotion } = useAdaptiveMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const duration = index === heroSentences.length - 1 ? 5000 : 2000;
    const timer = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % heroSentences.length);
    }, duration);

    return () => window.clearTimeout(timer);
  }, [index, prefersReducedMotion]);

  const scrollToContact = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-start overflow-hidden pt-28 md:pt-0"
    >
      <div className="absolute left-0 top-0 z-0 h-[1100px] w-full md:h-[1300px]">
        {enableEnhancedEffects ? (
          <Suspense fallback={<div className={heroBackgroundClassName} />}>
            <Aurora
              colorStops={['#3A29FF', '#2DECEE', '#01efac', '#2082a6']}
              speed={1.35}
              amplitude={0.18}
            />
          </Suspense>
        ) : (
          <div className={heroBackgroundClassName} />
        )}
      </div>

      <div className="container relative z-10 mx-auto flex flex-col px-6 md:px-12">
        <div className="flex w-full max-w-none flex-col items-start justify-center text-right md:pt-32">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-4 text-4xl font-black tracking-tight text-white/90 md:mb-[50px] md:text-6xl"
          >
            هلا والله انا سهيل 👋🏻
          </motion.div>

          <div className="flex w-full flex-col items-start justify-start md:flex-row md:items-baseline">
            <span className="mb-4 shrink-0 text-4xl font-black leading-tight text-white md:mb-0 md:ml-4 md:text-5xl lg:text-7xl">
              تحتاج
            </span>

            <div className="relative w-full overflow-visible md:w-auto">
              <div className="relative h-[1.6em] overflow-visible md:h-auto">
                {prefersReducedMotion ? (
                  <span className="absolute top-0 right-0 w-full whitespace-normal pb-6 text-right text-3xl font-black leading-tight text-brand-gradient md:static md:pb-10 md:text-5xl lg:text-7xl">
                    {heroSentences[0]}
                  </span>
                ) : (
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={heroSentences[index]}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{
                        y: { type: 'spring', stiffness: 100, damping: 20 },
                        opacity: { duration: 0.3 },
                      }}
                      className="absolute top-0 right-0 w-full whitespace-normal pb-6 text-right text-3xl font-black leading-tight text-brand-gradient md:static md:whitespace-nowrap md:pb-10 md:text-5xl lg:text-7xl"
                    >
                      {heroSentences[index]}
                    </motion.span>
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10 flex w-full justify-start md:w-auto"
          >
            <a
              href="#contact"
              onClick={scrollToContact}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 font-bold text-primary shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(102,126,234,0.4)] md:px-14 md:py-6"
            >
              <span className="relative text-lg md:text-2xl">تواصل معي</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

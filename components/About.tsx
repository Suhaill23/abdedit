import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAdaptiveMotion } from '../hooks/useAdaptiveMotion';

const softwareSkills = [
  { name: 'Premiere', src: '/icons/pr.png' },
  { name: 'Photoshop', src: '/icons/ps.png' },
  { name: 'After Effects', src: '/icons/ae.png' },
  { name: 'Illustrator', src: '/icons/ai.png' },
  { name: 'DaVinci Resolve', src: '/icons/dv.png' },
  { name: 'AI', src: '/icons/gpt.png' },
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { enableEnhancedEffects } = useAdaptiveMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.55, 0.55, 0]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-transparent py-20 md:py-0"
    >
      {enableEnhancedEffects ? (
        <motion.div
          style={{ opacity: glowOpacity, y: glowY }}
          className="absolute top-1/2 left-0 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-accent-blue/10 blur-[160px] pointer-events-none"
        />
      ) : (
        <div className="absolute top-1/2 left-0 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-accent-blue/10 blur-[140px] opacity-60 pointer-events-none" />
      )}

      <div className="container z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto max-w-6xl"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-2xl md:p-20">
            <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-accent-blue/10 blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-12 md:flex-row md:gap-24">
              <div className="flex w-full justify-center md:w-1/3">
                <div className="relative h-72 w-72 md:h-96 md:w-96">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-accent-blue to-accent-pink opacity-20 blur-xl" />
                  <div className="absolute inset-0 -rotate-3 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm" />
                  <img
                    src="/Suhail-Personal.png"
                    alt="Suhail Profile"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 288px, 384px"
                    className="relative z-10 h-full w-full rounded-3xl border border-white/10 object-cover shadow-2xl contrast-110"
                  />
                </div>
              </div>

              <div className="w-full text-right md:w-2/3">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="mb-8 text-4xl font-black tracking-tighter text-white md:mb-10 md:text-7xl"
                >
                  من أنا
                </motion.h2>

                <div className="space-y-6 text-lg font-light leading-relaxed text-white/80 md:text-2xl">
                  <p className="leading-[1.8]">
                    أنا سهيل، شريكك الإبداعي في عالم صناعة المحتوى والتصميم. أجمع بين الحس
                    الفني والخبرة التقنية لتحويل الأفكار المجردة إلى واقع مرئي يترك أثر.
                  </p>
                  <p className="leading-[1.8] text-white/60">
                    بخبرة عالية في الجرافيك ديزاين ومونتاج الفيديو، أساعد العلامات التجارية
                    والأفراد على رواية قصصهم بأسلوب بصري واضح، سريع، ومقنع على مختلف
                    الشاشات.
                  </p>
                </div>

                <div className="mt-12 border-t border-white/10 pt-8 md:mt-16 md:pt-10">
                  <div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 md:gap-6">
                    {softwareSkills.map((skill, idx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + idx * 0.05 }}
                        className="group flex cursor-default flex-col items-center gap-3"
                      >
                        <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/30 group-hover:bg-white/10">
                          <img
                            src={skill.src}
                            alt={skill.name}
                            loading="lazy"
                            decoding="async"
                            sizes="96px"
                            className={`h-1/2 w-1/2 object-contain transition-all duration-300 ${
                              skill.name === 'AI'
                                ? 'brightness-0 invert'
                                : 'grayscale group-hover:grayscale-0'
                            }`}
                          />
                        </div>
                        <span className="hidden text-center text-[10px] font-black uppercase tracking-[0.15em] text-white/20 transition-colors group-hover:text-white/60 md:block">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

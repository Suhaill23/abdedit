

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Video, Monitor, Camera, PenTool, Scissors, MessageSquare, Sparkles, FileText } from 'lucide-react';

const images = [
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop",
  "testd.png",
  "https://picsum.photos/400/600?random=12",
  "https://picsum.photos/400/600?random=13",
  "https://picsum.photos/400/600?random=14",
  "https://picsum.photos/400/600?random=15",
  "https://picsum.photos/400/600?random=16",
  "https://picsum.photos/400/600?random=17",
];

const standbyApps = [
  { icon: Video, color: 'text-[#9999FF]' },
  { icon: Monitor, color: 'text-[#CF96FD]' },
  { icon: Camera, color: 'text-[#31A8FF]' },
  { icon: PenTool, color: 'text-[#FF9A00]' },
  { icon: Scissors, color: 'text-[#FF8135]' },
  { icon: MessageSquare, color: 'text-[#10a37f]' },
  { icon: Sparkles, color: 'text-[#8E75FF]' },
  { icon: FileText, color: 'text-white' },
];

const ExplodingGallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  const headerOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const headerY = useTransform(smoothProgress, [0, 0.08], [0, -30]);

  // Pulled phone down further to create space
  const phoneContainerY = useTransform(smoothProgress, [0, 0.12], [120, 60]);

  const standbyOpacity = useTransform(smoothProgress, [0.05, 0.15], [1, 0]);
  const standbyScale = useTransform(smoothProgress, [0.05, 0.15], [1, 0.85]);
  const galleryOpacity = useTransform(smoothProgress, [0.12, 0.22], [0, 1]);

  const galleryX = useTransform(smoothProgress, [0.18, 0.95], ["0%", "100%"]);

  return (
    <section
      id="exploding-gallery"
      ref={sectionRef}
      className="relative h-[750vh] bg-transparent"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-visible">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-accent-blue/5 via-transparent to-transparent pointer-events-none"></div>

        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="absolute top-10 md:top-20 text-center z-[70] w-full px-6 pointer-events-none"
        >
          {/* Headline split into two lines with gap */}
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic uppercase flex flex-col gap-4 md:gap-8">
            <span>بصمة إبداعية</span>
            <span>في كل شاشة</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ y: phoneContainerY }}
          className="relative w-[280px] h-[580px] md:w-[340px] md:h-[700px] flex items-center justify-center"
        >
          <div className="relative z-40 w-full h-full bg-[#050505] rounded-[3rem] border-[10px] md:border-[14px] border-white shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] overflow-hidden">
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-2xl z-[60] flex items-center justify-center border border-white/5">
              <div className="w-1.5 h-1.5 rounded-md bg-[#111] mr-2"></div>
              <div className="w-10 h-1 bg-[#111] rounded-md"></div>
            </div>

            <div className="absolute inset-0 bg-black overflow-hidden" dir="rtl">
              <motion.div
                style={{ opacity: standbyOpacity, scale: standbyScale }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center px-10"
              >
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-blue via-accent-pink to-accent-red flex items-center justify-center mb-16 shadow-2xl">
                  <span className="text-white font-black text-5xl italic">S</span>
                </div>

                <div className="grid grid-cols-4 gap-5 w-full">
                  {standbyApps.map((app, i) => (
                    <div key={i} className="aspect-square bg-white/5 backdrop-blur-md rounded-xl border border-white/5 flex items-center justify-center shadow-lg">
                      <app.icon size={20} className={app.color} />
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                style={{ opacity: galleryOpacity }}
                className="absolute inset-0 z-10 bg-[#080808]"
              >
                <motion.div
                  style={{ x: galleryX }}
                  className="flex flex-row items-center gap-6 px-[10%] h-full w-max absolute right-0"
                >
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="h-[75%] aspect-[9/16] shrink-0 rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl"
                    >
                      <img
                        src={img}
                        alt={`Suhail Portfolio ${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="h-full shrink-0 flex items-center justify-center px-32 min-w-[340px]">
                    <span className="text-white/20 text-3xl md:text-4xl font-black text-center leading-none">
                      مشاهدة ممتعة
                    </span>
                  </div>
                </motion.div>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none z-50"></div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="h-[300vh]"></div>
    </section>
  );
};

export default ExplodingGallery;

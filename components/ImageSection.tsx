import React, { useMemo } from 'react';
import Stack from './stack';
import { useAdaptiveMotion } from '../hooks/useAdaptiveMotion';

const ImageSection: React.FC = () => {
  const { enableEnhancedEffects, isMobile } = useAdaptiveMotion();

  const hobbyCards = useMemo(
    () => [
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1727383196205-7205669078f7?q=80&w=800&auto=format"
          alt="Music and technology"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 280px, 400px"
          className="h-full w-full rounded-2xl object-cover shadow-2xl pointer-events-none"
        />
        <div className="absolute bottom-4 right-4 rounded-lg border border-white/10 bg-black/60 px-3 py-1 text-sm font-bold text-white backdrop-blur-md">
          🎵 حس موسيقي
        </div>
      </div>,
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format"
          alt="Photography"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 280px, 400px"
          className="h-full w-full rounded-2xl object-cover shadow-2xl pointer-events-none"
        />
        <div className="absolute bottom-4 right-4 rounded-lg border border-white/10 bg-black/60 px-3 py-1 text-sm font-bold text-white backdrop-blur-md">
          📸 زوايا سينمائية
        </div>
      </div>,
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format"
          alt="Coding"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 280px, 400px"
          className="h-full w-full rounded-2xl object-cover shadow-2xl pointer-events-none"
        />
        <div className="absolute bottom-4 right-4 rounded-lg border border-white/10 bg-black/60 px-3 py-1 text-sm font-bold text-white backdrop-blur-md">
          💻 حلول ذكية
        </div>
      </div>,
    ],
    [],
  );

  return (
    <section
      id="about-hobbies"
      dir="rtl"
      className="relative z-10 flex w-full items-center justify-center overflow-hidden bg-transparent py-16 md:min-h-[95svh] md:py-0"
    >
      <div className="container mx-auto flex flex-col items-center gap-10 px-6 md:flex-row md:gap-20 md:px-12">
        <div className="flex w-full flex-col items-start justify-center text-right md:w-1/2">
          <h2 className="mb-4 flex flex-col gap-y-1 text-4xl font-black md:mb-10 md:gap-y-4 md:text-6xl">
            <span className="block py-1 leading-tight text-brand-gradient">ما وراء الشاشات</span>
            <span className="block text-3xl font-black leading-tight text-white md:text-5xl">
              أكثر من مجرد إبداع
            </span>
          </h2>

          <div className="hidden max-w-xl space-y-3 text-right md:block">
            <p className="text-lg leading-snug text-gray-300 md:text-xl">
              شخصيتي تتشكل من عدة جوانب واهتمامات مختلفة بعيدًا عن المشاريع فقط.
            </p>
            <p className="text-lg leading-snug text-gray-300 md:text-xl">
              فأنا <span className="font-bold text-white">عازف عود</span> و
              <span className="font-bold text-white"> مصور</span> أحب التفاصيل واللقطات.
            </p>
            <p className="text-lg leading-snug text-gray-300 md:text-xl">
              وعلى الجانب التقني، أستمتع بالبرمجة والتعمق المستمر في أدوات
              <span className="font-bold text-white"> الذكاء الاصطناعي</span>.
            </p>
            <p className="text-lg leading-snug text-gray-300 md:text-xl">
              هذا المزج بين الفن والتقنية ينعكس مباشرة على جودة الشغل والنتيجة.
            </p>
            <p className="mt-16 text-xl text-gray-500">وكمان خفيف دم 🌚</p>
          </div>

          <div className="mt-1 space-y-2 text-right md:hidden">
            <p className="text-lg leading-snug text-gray-300">
              أنا <span className="font-bold text-white">عازف عود</span> و
              <span className="font-bold text-white"> مصور</span>.
            </p>
            <p className="text-lg leading-snug text-gray-300">
              وتقنيًا، أحب <span className="font-bold text-white">البرمجة</span> وأدوات
              <span className="font-bold text-white"> الذكاء الاصطناعي</span>.
            </p>
            <p className="text-lg leading-snug text-gray-300">مزيج فني وتقني.</p>
            <p className="pt-4 text-sm text-gray-500">وكمان خفيف دم 🌚</p>
          </div>
        </div>

        <div className="relative flex min-h-[360px] w-full items-center justify-center md:w-1/2 md:min-h-[400px]">
          <div className="relative z-20 aspect-[3/4] w-[280px] max-w-[400px] sm:w-[320px] md:w-full">
            <Stack
              cards={hobbyCards}
              randomRotation={!isMobile}
              sensitivity={isMobile ? 110 : 180}
              sendToBackOnClick={true}
              autoplay={enableEnhancedEffects && !isMobile}
              autoplayDelay={3500}
              pauseOnHover={!isMobile}
              mobileClickOnly={true}
            />
          </div>

          <div className="absolute top-[40%] left-1/2 -z-0 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/20 blur-[100px] pointer-events-none mix-blend-screen md:top-1/2 md:h-full md:w-full md:blur-[120px]" />
          <div
            className={`absolute top-[40%] left-1/2 -z-0 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-[80px] pointer-events-none mix-blend-screen md:top-1/2 ${
              enableEnhancedEffects ? 'animate-pulse duration-[4000ms]' : ''
            }`}
          />
          <div className="absolute top-[40%] left-1/2 -z-0 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/25 blur-[50px] pointer-events-none mix-blend-screen md:top-1/2 md:blur-[60px]" />
        </div>
      </div>
    </section>
  );
};

export default ImageSection;

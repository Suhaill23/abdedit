import React, { startTransition, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Play, X } from 'lucide-react';
import { useAdaptiveMotion } from '../hooks/useAdaptiveMotion';

type ProjectCategory = 'graphic' | 'video';
type FilterCategory = 'all' | ProjectCategory;

type Project = {
  category: ProjectCategory;
  id: number;
  image: string;
  images?: string[];
  title: string;
  videoUrl?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'تصاميم سوشال ميديا لمقهى',
    category: 'graphic',
    image: '/optimized/coffesta-thumb.jpg',
    images: ['/Coffesta/Coffesta-1.png', '/Coffesta/Coffesta-2.png', '/Coffesta/Coffesta-3.png'],
  },
  {
    id: 2,
    title: 'مونتاج فيديوهات إنستجرام',
    category: 'video',
    image: '/optimized/cinematic-video-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/iSQPsGN6L_c',
  },
  {
    id: 3,
    title: 'تصاميم سوشيال ميديا لشركة محاسبية',
    category: 'graphic',
    image: '/optimized/ln-thumb.jpg',
    images: ['/LN/Ln-1.png', '/LN/Ln-2.png', '/LN/Ln-3.png'],
  },
  {
    id: 4,
    title: 'محاكاة انيميشن Apple',
    category: 'video',
    image: 'https://img.youtube.com/vi/gT8XrMmYWZ0/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/gT8XrMmYWZ0',
  },
  {
    id: 5,
    title: 'تصاميم سوشال ميديا لنادي رياضي',
    category: 'graphic',
    image: '/optimized/boldgym-thumb.jpg',
    images: ['/BoldGym/BoldGym-1.png', '/BoldGym/BoldGym-2.png', '/BoldGym/BoldGym-3.png'],
  },
  {
    id: 6,
    title: 'فيديو ياسر الحزيمي',
    category: 'video',
    image: '/optimized/yasser-video-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/_r3YO1IkW9o',
  },
  {
    id: 7,
    title: 'تصاميم سوشيال ميديا لمتاجر سمير ستورز',
    category: 'graphic',
    image: '/optimized/samirstores-thumb.jpg',
    images: [
      '/SamirStores/SamirStores-1.png',
      '/SamirStores/SamirStores-2.png',
      '/SamirStores/SamirStores-3.png',
    ],
  },
  {
    id: 8,
    title: 'فيديو سنوية ثبات الخامسة',
    category: 'video',
    image: '/optimized/thabat-anniversary-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/uKlxixvuUvY',
  },
  {
    id: 9,
    title: 'فيديو إيلون ماسك',
    category: 'video',
    image: '/optimized/elonmusk-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/jLniZ6_bnQc',
  },
];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const { enableEnhancedEffects, isMobile, prefersReducedMotion } = useAdaptiveMotion();

  const filteredProjects = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  const changeFilter = (nextFilter: FilterCategory) => {
    startTransition(() => setFilter(nextFilter));
  };

  const handleProjectClick = (project: Project) => {
    if (project.category === 'video') {
      setSelectedVideo(project.videoUrl ?? null);
      return;
    }

    setSelectedGallery(project.images ?? [project.image]);
    setCurrentImgIndex(0);
  };

  const goToNextImage = () => {
    setCurrentImgIndex((prev) => (prev + 1) % (selectedGallery?.length || 1));
  };

  const goToPreviousImage = () => {
    setCurrentImgIndex((prev) => (prev - 1 + (selectedGallery?.length || 1)) % (selectedGallery?.length || 1));
  };

  return (
    <section
      id="portfolio"
      dir="rtl"
      className="relative min-h-[100svh] bg-transparent py-16 text-right md:py-20"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white md:text-5xl">
            معرض أعمالي
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-sm bg-brand-gradient" />
        </motion.div>

        <div className="mb-12 flex flex-wrap justify-center gap-3 md:mb-16 md:gap-4">
          {(['all', 'graphic', 'video'] as FilterCategory[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => changeFilter(id)}
              className={`rounded-full px-6 py-2 text-sm font-bold transition-all duration-300 md:px-8 ${
                filter === id
                  ? 'scale-105 bg-white text-black'
                  : 'border border-white/5 bg-white/5 text-white/50'
              }`}
            >
              {id === 'all' ? 'الكل' : id === 'graphic' ? 'جرافيك' : 'فيديو'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout={enableEnhancedEffects}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => handleProjectClick(project)}
                className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-3xl border border-white/5 shadow-2xl"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`h-full w-full object-cover transition-transform duration-700 ${
                    project.image.includes('youtube.com')
                      ? 'scale-[1.2] group-hover:scale-[1.28]'
                      : 'group-hover:scale-105'
                  }`}
                />

                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all group-hover:bg-white group-hover:text-black">
                      {project.category === 'video' ? (
                        <Play fill="currentColor" size={16} />
                      ) : (
                        <ImageIcon size={16} />
                      )}
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-white md:text-2xl">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={prefersReducedMotion ? false : { scale: 0.94 }}
              animate={prefersReducedMotion ? {} : { scale: 1 }}
              className="relative aspect-[9/16] w-full max-w-[380px] overflow-hidden rounded-2xl bg-black shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white"
              >
                <X size={20} />
              </button>
              <iframe
                src={`${selectedVideo}?autoplay=1`}
                title="Project video"
                loading="lazy"
                className="h-full w-full"
                allow="autoplay"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedGallery(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedGallery(null)}
              className="absolute top-6 right-6 z-[1001] text-white/50 transition-colors hover:text-white md:top-10 md:right-10"
            >
              <X size={32} />
            </button>

            <div className="relative mb-6 flex h-[60vh] w-full items-center justify-center md:h-[70vh]">
              <div
                className="relative flex aspect-[4/5] w-full max-w-[320px] items-center justify-center md:max-w-[450px]"
                onClick={(event) => event.stopPropagation()}
              >
                {selectedGallery.map((image, idx) => {
                  const offset = idx - currentImgIndex;

                  return (
                    <motion.div
                      key={image}
                      drag={enableEnhancedEffects && idx === currentImgIndex ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        const swipeThreshold = isMobile ? 40 : 70;

                        if (info.offset.x > swipeThreshold) {
                          goToPreviousImage();
                        } else if (info.offset.x < -swipeThreshold) {
                          goToNextImage();
                        }
                      }}
                      whileTap={enableEnhancedEffects ? { cursor: 'grabbing' } : undefined}
                      initial={false}
                      animate={{
                        filter:
                          idx === currentImgIndex ? 'brightness(1)' : 'brightness(0.35)',
                        opacity: 1,
                        scale: idx === currentImgIndex ? 1 : 0.88,
                        x: `${-offset * 110}%`,
                        zIndex: idx === currentImgIndex ? 20 : 10,
                      }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.15 }
                          : { type: 'spring', stiffness: 300, damping: 35, mass: 0.5 }
                      }
                      className="absolute h-full w-full cursor-grab overflow-hidden rounded-2xl border border-white/10 shadow-2xl active:cursor-grabbing md:rounded-3xl"
                    >
                      <img
                        src={image}
                        alt={`Gallery slide ${idx + 1}`}
                        loading={idx === currentImgIndex ? 'eager' : 'lazy'}
                        decoding="async"
                        sizes="(max-width: 768px) 320px, 450px"
                        className="h-full w-full object-cover pointer-events-none"
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {selectedGallery.length > 1 && (
              <div className="z-[1002] mb-10 flex gap-8">
                <motion.button
                  type="button"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
                  onClick={(event) => {
                    event.stopPropagation();
                    goToPreviousImage();
                  }}
                  className="rounded-full border border-white/10 bg-white/5 p-4 text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/10 md:p-5"
                >
                  <ChevronRight size={24} className="md:h-6 md:w-6" />
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
                  onClick={(event) => {
                    event.stopPropagation();
                    goToNextImage();
                  }}
                  className="rounded-full border border-white/10 bg-white/5 p-4 text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/10 md:p-5"
                >
                  <ChevronLeft size={24} className="md:h-6 md:w-6" />
                </motion.button>
              </div>
            )}

            <div className="absolute bottom-10 flex gap-2">
              {selectedGallery.map((image, idx) => (
                <button
                  key={image}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setCurrentImgIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImgIndex
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;

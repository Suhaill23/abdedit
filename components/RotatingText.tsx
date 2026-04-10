import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RotatingText: React.FC = () => {
    const words = [
        "توفر في",
        "تسوق لـ",
        "ترفع سقف"
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background glow to highlight this section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-32 bg-accent-blue/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-center text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight" dir="rtl">
                    {/* Static Start */}
                    <span className="mb-2 md:mb-0 md:ml-4">اذا تبغا</span>

                    {/* Rotating Word */}
                    <div className="relative h-[1.3em] w-[200px] md:w-[320px] overflow-hidden flex justify-center items-center">
                        <AnimatePresence mode="popLayout">
                            <motion.span
                                key={words[index]}
                                initial={{ y: 50, opacity: 0, filter: 'blur(10px)' }}
                                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                exit={{ y: -50, opacity: 0, filter: 'blur(10px)' }}
                                transition={{ duration: 0.5, ease: "backOut" }}
                                className="absolute bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-pink pb-2 whitespace-nowrap"
                            >
                                {words[index]}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    {/* Static End */}
                    <span className="mt-2 md:mt-0 md:mr-4">براندك</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-16"
                >
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white transition-all duration-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-accent-pink/50 hover:scale-105 hover:shadow-[0_0_30px_rgba(240,147,251,0.2)] backdrop-blur-md"
                    >
                        تواصل معي
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default RotatingText;
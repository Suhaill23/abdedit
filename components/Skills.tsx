import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../types';
import { PenTool, Video, Camera, Layout, Monitor, Scissors } from 'lucide-react';

const skills: Skill[] = [
  { id: 1, name: 'Adobe Photoshop', icon: Camera, level: 95 },
  { id: 2, name: 'Adobe Premiere Pro', icon: Video, level: 90 },
  { id: 3, name: 'Adobe Illustrator', icon: PenTool, level: 85 },
  { id: 4, name: 'After Effects', icon: Monitor, level: 80 },
  { id: 5, name: 'Adobe InDesign', icon: Layout, level: 75 },
  { id: 6, name: 'Davinci Resolve', icon: Scissors, level: 70 },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 relative bg-black/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">مهاراتي التقنية</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-pink to-accent-red mx-auto rounded-sm"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-accent-blue to-accent-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></div>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/10 rounded-lg text-accent-pink group-hover:text-white group-hover:bg-accent-pink transition-colors">
                  <skill.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white">{skill.name}</h3>
              </div>

              <div className="w-full bg-white/10 rounded-md h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-accent-blue to-accent-pink rounded-md"
                ></motion.div>
              </div>
              <div className="mt-2 text-left text-sm text-white/50">
                {skill.level}% إتقان
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
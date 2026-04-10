import React from 'react';

const staticParticles = [
  { left: '8%', opacity: 0.12, size: 2, top: '18%' },
  { left: '18%', opacity: 0.08, size: 3, top: '68%' },
  { left: '34%', opacity: 0.1, size: 2, top: '42%' },
  { left: '52%', opacity: 0.08, size: 2, top: '14%' },
  { left: '66%', opacity: 0.12, size: 3, top: '58%' },
  { left: '82%', opacity: 0.1, size: 2, top: '28%' },
  { left: '90%', opacity: 0.08, size: 2, top: '78%' },
];

const ParticleBackground: React.FC = () => {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-primary pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(102,126,234,0.16),transparent_45%),radial-gradient(circle_at_bottom,_rgba(240,147,251,0.1),transparent_35%)]" />
      <div className="absolute left-[-5%] top-[-5%] h-[320px] w-[320px] rounded-full bg-accent-blue/10 blur-[80px] md:h-[420px] md:w-[420px]" />
      <div className="absolute bottom-[-5%] right-[-5%] h-[280px] w-[280px] rounded-full bg-accent-pink/10 blur-[80px] md:h-[360px] md:w-[360px]" />

      {staticParticles.map((particle) => (
        <div
          key={`${particle.left}-${particle.top}`}
          className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.18)]"
          style={{
            height: particle.size,
            left: particle.left,
            opacity: particle.opacity,
            top: particle.top,
            width: particle.size,
          }}
        />
      ))}

      <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(rgba(255,255,255,0.08)_0.6px,transparent_0.6px)] [background-size:18px_18px]" />
    </div>
  );
};

export default ParticleBackground;

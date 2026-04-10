import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/10 bg-white/[0.03] py-4 backdrop-blur-2xl">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm font-medium text-white/60 md:text-lg">
          جميع الحقوق محفوظة © {new Date().getFullYear()} سهيل - مصمم جرافيك ومونتير فيديو
        </p>
      </div>
    </footer>
  );
};

export default Footer;

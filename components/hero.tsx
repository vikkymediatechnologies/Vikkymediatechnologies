'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import {
  Twitter,
  Instagram,
  Linkedin,
  Menu,
  X,
  Github,
  // Youtube,
  Facebook,
  Globe,
} from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { icon: Github, href: 'https://github.com/vikkymediatechnologies' },
  // { icon: Youtube, href: 'https://youtube.com/@vikkymedia' },
  { icon: Twitter, href: 'https://x.com/Vikkymediatech' },
  { icon: Instagram, href: 'https://www.instagram.com/vikcodedev/' },
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61574777883268' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/victor-joseph-14a536261/' },
];

const navItems = ['HOME', 'PROJECTS', 'SERVICES', 'COURSES', 'CONTACT'];

export default function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Custom cursor – desktop only
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;

    const cursor = document.createElement('div');
    cursor.className = 'hero-cursor';
    document.body.appendChild(cursor);

    let rafId: number;
    const handleMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursor.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px) scale(1)`;
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafId) cancelAnimationFrame(rafId);
      if (document.body.contains(cursor)) document.body.removeChild(cursor);
    };
  }, []);

  // Parallax scroll – fixed for Next.js hydration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });


  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const leftY = useTransform(smoothScroll, [0, 1], [0, -150]);
  const rightY = useTransform(smoothScroll, [0, 1], [0, 120]);



  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#060608] text-white overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-15%] left-[-15%] h-[50%] w-[50%] rounded-full bg-purple-900/30 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-15%] right-[-15%] h-[50%] w-[50%] rounded-full bg-yellow-600/20 blur-[120px] animate-pulse-slow delay-1000" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-[999] flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16 py-5 md:py-6 bg-[#060608]/80 backdrop-blur-xl border-b border-white/5"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
            <Globe className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" />
          </motion.div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter hero-gradient">
            vikkymediatech
          </h1>
        </div>

        <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navItems.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4, duration: 0.6 }}
            >
              <Link
                href={item === 'HOME' ? '/' : `#${item.toLowerCase()}`}
                className="nav-link text-sm font-bold tracking-wider text-white/70 hover:text-yellow-500"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2.5 bg-white/5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </motion.button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[9999] bg-[#060608]/95 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex justify-between items-center p-6 sm:p-8">
              <span className="text-2xl sm:text-3xl font-black text-yellow-500">MENU</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 bg-white/10 rounded-full hover:bg-white/20"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-6 sm:gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}
                >
                  <Link
                    href={item === 'HOME' ? '/' : `#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter hover:text-yellow-500 transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-end min-h-[calc(100vh-80px)] px-4 sm:px-6 md:px-12 lg:px-16 pt-12 sm:pt-16 lg:pt-8 pb-16">
        {/* Left section */}
        <motion.div
          style={{ y: leftY }}
          className="lg:col-span-3 z-10 text-center lg:text-left pb-12 sm:pb-16 lg:pb-32"
        >
          <div className="max-w-md mx-auto lg:mx-0 lg:max-w-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="mb-8 flex justify-center lg:justify-start"
            >
              <div className="pyramid-small">
                <div className="pyramid-wrapper">
                  <span className="pyramid-side pyramid-side1" />
                  <span className="pyramid-side pyramid-side2" />
                  <span className="pyramid-side pyramid-side3" />
                  <span className="pyramid-side pyramid-side4" />
                  <span className="pyramid-shadow" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span className="h-px w-12 sm:w-16 bg-yellow-500" />
              <span className="text-yellow-500 text-[10px] sm:text-xs font-black tracking-[0.5em]">
                INSTRUCTOR & DEV
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold leading-snug text-white/95 mb-8 sm:mb-12"
            >
              Crafting pixel-perfect apps while{' '}
              <span className="text-yellow-500 text-shimmer">mentoring the next generation</span> of world-class developers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-12 sm:mb-16"
            >
              <Link
                href="#projects"
                className="cta-link inline-flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold uppercase tracking-widest text-yellow-500 hover:text-white"
              >
                Explore Work
                <span className="cta-arrow">→</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex gap-4 sm:gap-6 justify-center lg:justify-start flex-wrap"
            >
              {socialLinks.map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.05 }}
                  className="social-icon text-white/40 hover:text-yellow-500"
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Center – Hero image */}
        <div className="lg:col-span-6 relative flex justify-center items-end pb-0">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.3, type: 'spring', stiffness: 50, damping: 20 }}
            className="absolute -z-10 bottom-0 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] xl:w-[800px] xl:h-[800px] rounded-full bg-yellow-500/50 blur-[80px] sm:blur-[100px] lg:blur-3xl glow-pulse"
          />
          <motion.img
            src="/hero-bg.png"
            alt="Vikkymediatech hero illustration"
            initial={{ y: 200, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            loading="eager"
            className="relative z-20 w-full max-w-[380px] sm:max-w-[520px] md:max-w-[720px] lg:max-w-[880px] xl:max-w-[1050px] 2xl:max-w-[1250px] h-auto object-contain object-bottom select-none grayscale brightness-110 contrast-125 drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)] float-animation"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          />
        </div>

        {/* Right section */}
        <motion.div
          style={{ y: rightY }}
          className="lg:col-span-3 z-10 text-center lg:text-right pb-12 sm:pb-16 lg:pb-32"
        >
          <motion.h2
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="text-[16vw] sm:text-[12vw] md:text-[10vw] lg:text-[6rem] xl:text-[7rem] 2xl:text-[8rem] font-black leading-[0.85] tracking-tighter mb-8 sm:mb-12"
          >
            <span className="slide-right">DESIGN</span> <br />
            <span className="text-yellow-500 text-shimmer">&</span>{' '}
            <span className="slide-left">CODE</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-[10px] sm:text-xs font-bold tracking-[0.4em] text-white/30 uppercase"
          >
            Ashi Bodija, Oyo State, Nigeria
          </motion.p>
        </motion.div>
      </main>

      <style jsx global>{`
        .hero-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          background: rgba(234, 179, 8, 0.2);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: screen;
          backdrop-filter: blur(8px);
          transition: transform 0.2s;
          transform: scale(0);
        }

        .hero-gradient {
          background: linear-gradient(90deg, #fff, #eab308, #fff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 6s ease infinite;
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .nav-link {
          position: relative;
          transition: color 0.3s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 2px;
          background: #eab308;
          transition: width 0.3s;
        }
        .nav-link:hover::after {
          width: 100%;
        }

        .cta-link {
          transition: all 0.3s;
        }
        .cta-link:hover {
          transform: translateX(10px);
        }
        .cta-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          border: 2px solid #eab308;
          border-radius: 50%;
          transition: all 0.3s;
        }
        .cta-link:hover .cta-arrow {
          background: #eab308;
          color: #000;
        }
        @media (min-width: 640px) {
          .cta-arrow {
            width: 3.5rem;
            height: 3.5rem;
          }
        }

        .social-icon {
          transition: all 0.3s;
        }
        .social-icon:hover {
          transform: translateY(-8px) scale(1.15);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        .glow-pulse {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .text-shimmer {
          background: linear-gradient(90deg, #eab308, #fff, #eab308);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        @keyframes slide-in-right {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .slide-right {
          display: inline-block;
          animation: slide-in-right 0.8s ease-out forwards;
        }
        .slide-left {
          display: inline-block;
          animation: slide-in-left 0.8s ease-out forwards;
        }

        .pyramid-loader, .pyramid-small {
          position: relative;
          display: block;
          transform-style: preserve-3d;
          transform: rotateX(-20deg);
        }
        .pyramid-loader {
          width: 200px;
          height: 200px;
        }
        .pyramid-small {
          width: 80px;
          height: 80px;
        }

        .pyramid-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: pyramid-spin 4s linear infinite;
        }
        @keyframes pyramid-spin {
          100% { transform: rotateY(360deg); }
        }

        .pyramid-side {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          transform-origin: center top;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .pyramid-loader .pyramid-side {
          width: 70px;
          height: 70px;
        }
        .pyramid-small .pyramid-side {
          width: 35px;
          height: 35px;
        }

        .pyramid-side1 {
          transform: rotateZ(-30deg) rotateY(90deg);
          background: conic-gradient(#eab308, #fff, #eab308, #2f2585);
        }
        .pyramid-side2 {
          transform: rotateZ(30deg) rotateY(90deg);
          background: conic-gradient(#2f2585, #eab308, #fff, #eab308);
        }
        .pyramid-side3 {
          transform: rotateX(30deg);
          background: conic-gradient(#2f2585, #eab308, #fff, #eab308);
        }
        .pyramid-side4 {
          transform: rotateX(-30deg);
          background: conic-gradient(#eab308, #fff, #eab308, #2f2585);
        }

        .pyramid-shadow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          background: #eab308;
          transform: rotateX(90deg) translateZ(-20px);
          filter: blur(8px);
        }
        .pyramid-loader .pyramid-shadow {
          width: 60px;
          height: 60px;
          transform: rotateX(90deg) translateZ(-40px);
          filter: blur(12px);
          background: #8b5ad5;
        }
        .pyramid-small .pyramid-shadow {
          width: 30px;
          height: 30px;
        }

        @media (max-width: 768px) {
          .hero-cursor { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
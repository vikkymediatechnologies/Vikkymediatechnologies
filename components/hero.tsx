'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  Twitter,
  Instagram,
  Linkedin,
  Menu,
  X,
  Github,
  Youtube,
  Facebook,
  Globe,
} from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { icon: Github, href: 'https://github.com/vikkymedia' },
  { icon: Youtube, href: 'https://youtube.com/@vikkymedia' },
  { icon: Twitter, href: 'https://twitter.com/vikkymedia' },
  { icon: Instagram, href: 'https://instagram.com/vikkymedia' },
  { icon: Facebook, href: 'https://facebook.com/vikkymedia' },
  { icon: Linkedin, href: 'https://linkedin.com/in/vikkymedia' },
];

export default function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // CUSTOM CURSOR
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'fixed top-0 left-0 w-10 h-10 bg-yellow-500/20 rounded-full pointer-events-none z-[9999] mix-blend-screen backdrop-blur-md transition-transform duration-200 scale-0';
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px) scale(1)`;
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', () => cursor.style.transform = 'scale(0)');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  // PARALLAX
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const leftY = useTransform(smoothScroll, [0, 1], [0, -200]);
  const rightY = useTransform(smoothScroll, [0, 1], [0, 180]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#060608] text-white overflow-hidden">
      {/* BACKGROUND ORBS */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] h-[60%] w-[60%] rounded-full bg-purple-900/30 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-20%] h-[60%] w-[60%] rounded-full bg-yellow-600/20 blur-[140px]" />
      </div>

      {/* STICKY HEADER */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="sticky top-0 z-[999] flex items-center justify-between px-6 py-7 md:px-16 md:py-9 bg-[#060608]/90 backdrop-blur-xl"
      >
        <div className="flex items-center gap-4">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
            <Globe className="h-7 w-7 md:h-9 md:w-9 text-yellow-500" />
          </motion.div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tighter bg-gradient-to-r from-white via-yellow-500 to-white bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
            vikkymediatech
          </h1>
        </div>

        <nav className="hidden lg:flex items-center gap-10 xl:gap-14">
          {['HOME', 'PROJECTS', 'SERVICES', 'COURSES', 'CONTACT'].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
            >
              <Link
                href={item === 'HOME' ? '/' : `#${item.toLowerCase()}`}
                className="relative text-sm md:text-base font-bold tracking-wider text-white/70 hover:text-yellow-500 transition-all duration-300 group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-500 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-3 bg-white/5 rounded-full backdrop-blur-md border border-white/10"
        >
          <Menu className="h-6 w-6" />
        </button>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[9999] bg-[#060608]/98 backdrop-blur-3xl flex flex-col"
          >
            <div className="flex justify-between items-center p-8">
              <span className="text-3xl font-black text-yellow-500">MENU</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-white/10 rounded-full">
                <X className="h-7 w-7" />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center flex-1 gap-10">
              {['HOME', 'PROJECTS', 'SERVICES', 'COURSES', 'CONTACT'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * i + 0.3 }}
                >
                  <Link
                    href={item === 'HOME' ? '/' : `#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-6xl md:text-7xl font-black tracking-tighter hover:text-yellow-500 transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO CONTENT — PERFECT POSITIONING */}
      <main className="relative grid grid-cols-1 lg:grid-cols-3 items-end min-h-screen px-6 md:px-12 lg:px-16 pt-32 lg:pt-20 pb-0">
        {/* LEFT — TEXT + SOCIALS */}
        <motion.div style={{ y: leftY }} className="z-10 text-center lg:text-left pb-24 lg:pb-40">
          <div className="max-w-lg mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="h-px w-20 bg-yellow-500" />
              <span className="text-yellow-500 text-xs font-black tracking-[0.8em]">INSTRUCTOR & DEV</span>
            </div>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white/95 mb-16">
              Crafting pixel-perfect apps while{' '}
              <span className="text-yellow-500">mentoring the next generation</span> of world-class developers.
            </p>
            <motion.div whileHover={{ x: 20 }} className="mb-20">
              <Link href="#projects" className="inline-flex items-center gap-6 text-base font-bold uppercase tracking-widest text-yellow-500 hover:text-white transition-colors">
                Explore Work
                <span className="h-16 w-16 rounded-full border-2 border-yellow-500 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all">→</span>
              </Link>
            </motion.div>

            {/* SOCIAL LINKS */}
            <div className="flex gap-8 justify-center lg:justify-start">
              {socialLinks.map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  whileHover={{ y: -10, scale: 1.2 }}
                  className="text-white/50 hover:text-yellow-500 transition-all"
                >
                  <Icon className="h-8 w-8" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CENTER — MASSIVE IMAGE + HUGE YELLOW CIRCLE BEHIND */}
        <div className="relative flex justify-center items-end pb-0">
          {/* BIG YELLOW CIRCLE BEHIND IMAGE */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, type: 'spring', stiffness: 70, damping: 30 }}
            className="absolute -z-10 w-[700px] h-[700px] md:w-[900px] md:h-[900px] lg:w-[1200px] lg:h-[1200px] rounded-full bg-yellow-500/70 blur-3xl"
          />

          {/* SUPER MASSIVE IMAGE — TOUCHES BOTTOM 100% */}
          <motion.img
            src="/hero-bg.png"
            alt="Vikkymediatech"
            initial={{ y: 300, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-full max-w-[600px] md:max-w-[900px] lg:max-w-[1300px] xl:max-w-[1600px] 2xl:max-w-[1900px] object-contain object-bottom select-none grayscale brightness-110 contrast-125 drop-shadow-[0_100px_200px_rgba(0,0,0,0.95)]"
          />
        </div>

        {/* RIGHT — DESIGN & CODE + LOCATION */}
        <motion.div style={{ y: rightY }} className="z-10 text-center lg:text-right pb-24 lg:pb-40">
          <h2 className="text-[14vw] md:text-[12vw] lg:text-[10.5rem] xl:text-[12.5rem] font-black leading-[0.8] tracking-tighter mb-16">
            DESIGN <br />
            <span className="text-yellow-500">&</span> CODE
          </h2>

          <p className="text-sm font-bold tracking-[0.6em] text-white/40 uppercase">
            Lalupon, Oyo State, Nigeria
          </p>
        </motion.div>
      </main>

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 6s ease infinite;
        }
      `}</style>
    </div>
  );
}



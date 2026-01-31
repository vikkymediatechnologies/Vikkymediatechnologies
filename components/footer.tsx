'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ArrowUp,
  Sparkles
} from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/vikkymedia', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/vikkymedia', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/vikkymedia', label: 'Twitter' },
  { icon: Mail, href: 'mailto:hello@vikkymedia.com', label: 'Email' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#060608] overflow-hidden border-t border-white/5">
      {/* FLOATING ORBS — SAME AS HERO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ y: [-100, 100] }}
          transition={{ duration: 40, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 left-20 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [100, -100] }}
          transition={{ duration: 45, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
          {/* BRAND & TAGLINE */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="space-y-8"
          >
            <Link href="/" className="block">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-yellow-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x">
                vikkymedia
              </h1>
            </Link>
            <p className="text-2xl text-slate-400 font-light max-w-md">
              Building the future of the web — one <span className="text-yellow-500 font-bold">legendary</span> project at a time.
            </p>
            <div className="flex items-center gap-4">
              <Sparkles className="w-8 h-8 text-yellow-500" />
              <span className="text-yellow-500 font-bold text-lg">Available for hire & mentorship</span>
            </div>
          </motion.div>

          {/* NAVIGATION */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="lg:text-center"
          >
            <h3 className="text-3xl font-black text-white mb-10">Navigation</h3>
            <div className="space-y-6">
              {['HOME', 'PROJECTS', 'SERVICES', 'COURSES', 'CONTACT'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.4 }}
                >
                  <Link
                    href={`#${item === 'HOME' ? '' : item.toLowerCase()}`}
                    className="block text-2xl font-bold text-slate-400 hover:text-yellow-500 transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CONNECT */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="lg:text-right"
          >
            <h3 className="text-3xl font-black text-white mb-10">Let's Connect</h3>
            <div className="flex lg:justify-end gap-6 mb-12">
              {socials.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.6 }}
                    whileHover={{ y: -15, color: '#eab308' }}
                    className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20"
                  >
                    <Icon className="w-8 h-8 text-white/70" />
                  </motion.a>
                );
              })}
            </div>
            <p className="text-xl text-slate-400">
              Ready to build something <span className="text-yellow-500 font-bold">extraordinary</span>?
            </p>
            <motion.div whileHover={{ x: 20 }}>
              <Link
                href="#contact"
                className="inline-flex items-center gap-4 mt-6 text-2xl font-black text-yellow-500 hover:text-white transition-colors"
              >
                Let's Talk
                <ArrowUp className="w-8 h-8 rotate-90" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* BOTTOM BAR */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-16 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <p className="text-slate-500 text-center lg:text-left">
            © {year} <span className="text-yellow-500 font-bold">Vikkymedia</span>. Built with blood, sweat & pure obsession.
          </p>
          <div className="flex items-center gap-12">
            <a href="#" className="text-slate-500 hover:text-yellow-500 transition-colors text-sm font-medium">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 hover:text-yellow-500 transition-colors text-sm font-medium">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>

      {/* SCROLL TO TOP BUTTON */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-10 right-10 p-6 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50 hover:scale-110 z-50"
      >
        <ArrowUp className="w-8 h-8" />
      </motion.button>

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
    </footer>
  );
}
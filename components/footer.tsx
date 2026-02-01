'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ArrowUp,
  Heart
} from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/vikkymedia', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/vikkymedia', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/vikkymedia', label: 'Twitter' },
  { icon: Mail, href: 'mailto:vikkymediatechnologies@gmail.com', label: 'Email' },
];

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Courses', href: '#courses' },
  { name: 'Contact', href: '#contact' },
];

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060608] overflow-hidden border-t border-white/10">
      {/* Subtle background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-900/15 rounded-full blur-[150px] animate-float-subtle" />
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[150px] animate-float-subtle delay-7000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-16 sm:py-20 lg:py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-16 mb-12 sm:mb-16">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <Link href="/" className="inline-block mb-5">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight footer-gradient">
                vikkymediatech
              </h2>
            </Link>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6 max-w-xs">
              Building modern web solutions with passion and precision.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>in Nigeria</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-base font-bold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    className="footer-link text-sm text-slate-400 hover:text-yellow-500"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-base font-bold text-white mb-5">Services</h3>
            <ul className="space-y-3">
              {['Web Development', 'UI/UX Design', 'Performance Optimization', 'Mentorship', 'Consultation'].map((service, i) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                >
                  <span className="text-sm text-slate-400">
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-base font-bold text-white mb-5">Connect</h3>
            <div className="flex gap-3 mb-6">
              {socials.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="social-icon"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
            <p className="text-sm text-slate-400 mb-3">
              Let's work together
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-500 hover:text-yellow-400 transition-colors group"
            >
              <span>Get in touch</span>
              <ArrowUp className="w-4 h-4 rotate-90 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-white/5"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
              © {year} <span className="text-slate-400 font-semibold">Vikkymediatech</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6 sm:gap-8">
              <Link
                href="/privacy"
                className="text-xs sm:text-sm text-slate-500 hover:text-yellow-500 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-xs sm:text-sm text-slate-500 hover:text-yellow-500 transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="scroll-top-button"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}

      <style jsx global>{`
        /* Float animation */
        @keyframes float-subtle {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
        }
        .animate-float-subtle {
          animation: float-subtle 30s ease-in-out infinite;
        }
        .delay-7000 {
          animation-delay: 7s;
        }

        /* Footer gradient */
        .footer-gradient {
          background: linear-gradient(135deg, #eab308 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Footer link */
        .footer-link {
          display: inline-block;
          position: relative;
          transition: all 0.25s ease;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #eab308;
          transition: width 0.25s ease;
        }
        .footer-link:hover::after {
          width: 100%;
        }

        /* Social icons */
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.5rem;
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
        }
        .social-icon:hover {
          background: rgba(234, 179, 8, 0.1);
          border-color: rgba(234, 179, 8, 0.3);
          color: #eab308;
        }

        /* Scroll to top button */
        .scroll-top-button {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          background: linear-gradient(135deg, #eab308 0%, #f59e0b 100%);
          color: #000;
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(234, 179, 8, 0.3);
          transition: all 0.3s ease;
        }
        .scroll-top-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(234, 179, 8, 0.4);
        }
        .scroll-top-button:active {
          transform: translateY(-2px);
        }

        @media (min-width: 640px) {
          .scroll-top-button {
            bottom: 2rem;
            right: 2rem;
            width: 3.5rem;
            height: 3.5rem;
          }
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </footer>
  );
}
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Zap, 
  Globe, 
  Smartphone, 
  BarChart3, 
  ArrowRight,
  Code2,
  Palette,
  Gauge,
  TrendingUp
} from 'lucide-react';

const SERVICES = [
  {
    title: 'Full-Stack Web Development',
    description: 'Modern, scalable web applications built with cutting-edge technologies and best practices.',
    icon: Code2,
    features: ['Next.js & React Development', 'TypeScript Integration', 'RESTful & GraphQL APIs', 'Database Design', 'Cloud Deployment'],
    highlight: 'Enterprise-grade solutions',
  },
  {
    title: 'UI/UX Design & Frontend',
    description: 'Beautiful, intuitive interfaces that engage users and drive conversions.',
    icon: Palette,
    features: ['Responsive Design', 'Design Systems', 'Component Libraries', 'Animation & Interactions', 'Accessibility Standards'],
    highlight: 'User-centered design',
  },
  {
    title: 'Performance Optimization',
    description: 'Lightning-fast websites that rank higher and convert better.',
    icon: Gauge,
    features: ['Speed Optimization', 'Core Web Vitals', 'SEO Enhancement', 'Image Optimization', 'Code Splitting'],
    highlight: 'Measurable results',
  },
  {
    title: 'Analytics & Insights',
    description: 'Data-driven solutions to understand your users and grow your business.',
    icon: TrendingUp,
    features: ['Custom Analytics', 'User Behavior Tracking', 'Conversion Optimization', 'Performance Dashboards', 'A/B Testing'],
    highlight: 'Actionable metrics',
  },
];

const PROCESS_STEPS = [
  { number: '01', title: 'Discovery', description: 'Understanding your goals, audience, and requirements' },
  { number: '02', title: 'Planning', description: 'Creating a strategic roadmap and technical architecture' },
  { number: '03', title: 'Development', description: 'Building with precision, testing, and iteration' },
  { number: '04', title: 'Launch', description: 'Deployment, optimization, and ongoing support' },
];

export function ServicesSection() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ['start end', 'end start']
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const y = useTransform(smoothY, [0, 1], [-60, 60]);
  const opacity = useTransform(smoothY, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  return (
    <section ref={containerRef} id="services" className="relative bg-[#060608] overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-purple-900/20 rounded-full blur-[150px] animate-float-subtle" />
        <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-yellow-600/15 rounded-full blur-[150px] animate-float-subtle delay-4000" />
      </div>

      <motion.div 
        style={{ y: isMounted ? y : 0, opacity: isMounted ? opacity : 1 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-20 sm:py-28 lg:py-36"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-yellow-500" />
            <span className="text-yellow-500 text-xs font-bold tracking-[0.3em] uppercase">Services</span>
            <span className="h-px w-12 bg-yellow-500" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-5 text-slate-400">
            What I{' '}
            <span className="services-gradient">Deliver</span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Comprehensive web solutions tailored to your business needs, from concept to deployment
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-20 sm:mb-28 lg:mb-32">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="service-card group"
              >
                {/* Icon */}
                <div className="service-icon-wrapper mb-6">
                  <div className="service-icon">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-xs font-semibold text-yellow-500">
                    {service.highlight}
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-slate-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="#contact"
                  className="service-link inline-flex items-center gap-2 text-yellow-500 font-semibold text-sm group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="process-container"
        >
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              The{' '}
              <span className="services-gradient">Process</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
              A structured approach to delivering exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="process-step text-center"
              >
                <div className="process-number mb-4">
                  {step.number}
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  {step.title}
                </h4>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-20 sm:mt-28 lg:mt-32"
        >
          <p className="text-xl sm:text-2xl text-slate-300 mb-8 px-4">
            Ready to bring your project to life?
          </p>
          <Link
            href="#contact"
            className="cta-button inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        /* Gradient text */
        .services-gradient {
          background: linear-gradient(135deg, #eab308 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Float animation */
        @keyframes float-subtle {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(25px, 25px); }
        }
        .animate-float-subtle {
          animation: float-subtle 25s ease-in-out infinite;
        }
        .delay-4000 {
          animation-delay: 4s;
        }

        /* Service cards */
        .service-card {
          position: relative;
          background: linear-gradient(135deg, rgba(15, 15, 20, 0.9) 0%, rgba(10, 10, 15, 0.95) 100%);
          backdrop-filter: blur(10px);
          border-radius: 1.25rem;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .service-card:hover {
          border-color: rgba(234, 179, 8, 0.3);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(234, 179, 8, 0.1);
          transform: translateY(-8px);
        }

        @media (min-width: 640px) {
          .service-card {
            padding: 2.5rem;
          }
        }

        @media (min-width: 1024px) {
          .service-card {
            padding: 3rem;
          }
          .service-card:hover {
            transform: translateY(-12px);
          }
        }

        /* Icon styling */
        .service-icon-wrapper {
          position: relative;
        }
        .service-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 3.5rem;
          height: 3.5rem;
          background: rgba(234, 179, 8, 0.1);
          border: 1px solid rgba(234, 179, 8, 0.2);
          border-radius: 0.75rem;
          transition: all 0.3s;
        }
        .service-card:hover .service-icon {
          background: rgba(234, 179, 8, 0.15);
          transform: scale(1.1);
        }

        @media (min-width: 640px) {
          .service-icon {
            width: 4rem;
            height: 4rem;
          }
        }

        /* Service link */
        .service-link {
          transition: all 0.25s;
        }
        .service-link:hover {
          color: #fbbf24;
        }

        /* Process container */
        .process-container {
          background: linear-gradient(135deg, rgba(234, 179, 8, 0.03) 0%, rgba(168, 85, 247, 0.03) 100%);
          backdrop-filter: blur(10px);
          border-radius: 1.5rem;
          padding: 2.5rem 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        @media (min-width: 640px) {
          .process-container {
            padding: 3rem 2rem;
          }
        }

        @media (min-width: 1024px) {
          .process-container {
            padding: 4rem 3rem;
          }
        }

        /* Process step */
        .process-step {
          position: relative;
        }

        .process-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 4rem;
          height: 4rem;
          background: rgba(234, 179, 8, 0.1);
          border: 2px solid rgba(234, 179, 8, 0.3);
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: 800;
          color: #eab308;
          margin: 0 auto;
        }

        @media (min-width: 640px) {
          .process-number {
            width: 5rem;
            height: 5rem;
            font-size: 2rem;
          }
        }

        /* CTA button */
        .cta-button:hover {
          transform: translateY(-2px);
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
    </section>
  );
}
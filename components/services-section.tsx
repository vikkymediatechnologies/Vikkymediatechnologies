// 'use client';

// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import Link from 'next/link';
// import { 
//   CheckCircle2, 
//   Zap, 
//   Globe, 
//   Smartphone, 
//   BarChart3, 
//   Clock, 
//   ArrowRight,
//   Sparkles
// } from 'lucide-react';

// const SERVICES = [
//   {
//     title: 'Web Development',
//     description: 'Full-stack web applications that dominate performance, scalability & aesthetics.',
//     icon: Globe,
//     features: ['Next.js + React', 'TypeScript', 'Tailwind CSS', 'Headless CMS', 'API Integration'],
//     price: 'From $8,000',
//   },
//   {
//     title: 'UI/UX & Frontend Mastery',
//     description: 'Pixel-perfect interfaces that feel like magic and convert like crazy.',
//     icon: Smartphone,
//     features: ['Figma → Production Code', 'Framer Motion Animations', 'Design Systems', 'Micro-interactions', 'A11y Compliance'],
//     price: 'From $5,000',
//   },
//   {
//     title: 'Performance Optimization',
//     description: 'Turn good websites into lightning-fast experiences that rank #1.',
//     icon: Zap,
//     features: ['100 Lighthouse Scores', 'Core Web Vitals', 'Image/CDN Optimization', 'Bundle Splitting', 'Caching Strategy'],
//     price: 'From $3,500',
//   },
//   {
//     title: 'Analytics & Growth Systems',
//     description: 'Know exactly what your users do — and make them do more of it.',
//     icon: BarChart3,
//     features: ['Custom Analytics', 'Heatmaps & Session Recording', 'Conversion Tracking', 'A/B Testing Setup', 'Dashboard Design'],
//     price: 'From $2,500',
//   },
// ];

// export function ServicesSection() {
//   const { scrollYProgress } = useScroll();
//   const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
//   const y = useTransform(smoothY, [0, 1], [-150, 150]);

//   return (
//     <section id="services" className="relative bg-[#060608] overflow-hidden">
//       {/* FLOATING ORBS — SAME AS HERO */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <motion.div
//           animate={{ x: [-300, 300], y: [-200, 200] }}
//           transition={{ duration: 50, repeat: Infinity, repeatType: "reverse" }}
//           className="absolute top-40 -left-64 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{ x: [300, -300], y: [200, -200] }}
//           transition={{ duration: 55, repeat: Infinity, repeatType: "reverse" }}
//           className="absolute bottom-40 -right-64 w-[600px] h-[600px] bg-yellow-600/20 rounded-full blur-3xl"
//         />
//       </div>

//       <motion.div style={{ y }} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-32 lg:py-48">
//         {/* HERO-STYLE TITLE */}
//         <motion.div
//           initial={{ opacity: 0, y: 100 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
//           className="text-center mb-32"
//         >
//           <h2 className="text-7xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-black leading-[0.8] tracking-tighter">
//             WHAT I
//             <br />
//             <span className="bg-gradient-to-r from-yellow-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x">
//               BUILD
//             </span>
//           </h2>
//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.8, duration: 1.2 }}
//             className="text-2xl md:text-3xl text-slate-400 mt-12 font-light tracking-wide max-w-4xl mx-auto"
//           >
//             Not just websites. <span className="text-yellow-500 font-bold">Digital experiences that dominate.</span>
//           </motion.p>
//         </motion.div>

//         {/* SERVICES GRID — GOD MODE */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
//           {SERVICES.map((service, index) => {
//             const Icon = service.icon;
//             return (
//               <motion.div
//                 key={service.title}
//                 initial={{ opacity: 0, y: 200 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ 
//                   duration: 1.4, 
//                   delay: index * 0.2,
//                   ease: [0.16, 1, 0.3, 1]
//                 }}
//                 whileHover={{ y: -30, scale: 1.02 }}
//                 className="group relative"
//               >
//                 <div className="relative bg-gradient-to-br from-slate-900/50 via-black/60 to-slate-900/50 backdrop-blur-2xl rounded-3xl p-10 lg:p-14 border border-white/10 hover:border-yellow-500/50 transition-all duration-700 shadow-2xl hover:shadow-yellow-500/30">
//                   {/* Icon */}
//                   <motion.div
//                     whileHover={{ rotate: 360 }}
//                     transition={{ duration: 0.8 }}
//                     className="mb-8 p-5 bg-yellow-500/10 rounded-2xl w-fit"
//                   >
//                     <Icon className="w-12 h-12 text-yellow-500" />
//                   </motion.div>

//                   {/* Title & Description */}
//                   <h3 className="text-4xl md:text-5xl font-black text-white mb-6 group-hover:text-yellow-500 transition-colors duration-500">
//                     {service.title}
//                   </h3>
//                   <p className="text-xl text-slate-300 mb-10 leading-relaxed">
//                     {service.description}
//                   </p>

//                   {/* Features */}
//                   <div className="space-y-5 mb-12">
//                     {service.features.map((feature, i) => (
//                       <motion.div
//                         key={i}
//                         initial={{ opacity: 0, x: -50 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.2 + i * 0.1 }}
//                         className="flex items-center gap-4"
//                       >
//                         <Sparkles className="w-6 h-6 text-yellow-500" />
//                         <span className="text-lg text-slate-200">{feature}</span>
//                       </motion.div>
//                     ))}
//                   </div>

//                   {/* Price */}
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-slate-500 uppercase tracking-wider">Starting at</p>
//                       <p className="text-4xl font-black text-yellow-500">{service.price}</p>
//                     </div>
//                     <motion.div whileHover={{ x: 20 }}>
//                       <Link
//                         href="#contact"
//                         className="inline-flex items-center gap-4 px-8 py-4 bg-yellow-500 text-black font-black rounded-full hover:bg-yellow-400 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/50"
//                       >
//                         LET'S BUILD
//                         <ArrowRight className="w-6 h-6" />
//                       </Link>
//                     </motion.div>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* PROCESS TIMELINE */}
//         <motion.div
//           initial={{ opacity: 0, y: 100 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1.6, delay: 0.4 }}
//           className="mt-40 bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-yellow-500/10 backdrop-blur-xl rounded-3xl p-12 lg:p-20 border border-white/10"
//         >
//           <h3 className="text-6xl md:text-8xl font-black text-center mb-20">
//             <span className="bg-gradient-to-r from-yellow-500 to-purple-500 bg-clip-text text-transparent">
//               The Process
//             </span>
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             {[
//               { step: '01', title: 'Discovery', desc: 'We dig deep into your vision & goals' },
//               { step: '02', title: 'Strategy', desc: 'Craft the perfect technical roadmap' },
//               { step: '03', title: 'Execution', desc: 'Build with precision & obsession' },
//               { step: '04', title: 'Launch & Scale', desc: 'Deploy, optimize, dominate' },
//             ].map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.2 }}
//                 className="text-center"
//               >
//                 <div className="text-8xl font-black text-yellow-500 mb-6">{item.step}</div>
//                 <h4 className="text-3xl font-black text-white mb-4">{item.title}</h4>
//                 <p className="text-slate-400 text-lg">{item.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* FINAL CTA */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1.2, delay: 0.6 }}
//           className="text-center mt-40"
//         >
//           <p className="text-3xl md:text-5xl font-light text-slate-300 mb-12">
//             Ready to build something <span className="text-yellow-500 font-black">legendary</span>?
//           </p>
//           <Link
//             href="#contact"
//             className="inline-flex items-center gap-8 px-20 py-8 bg-yellow-500 text-black font-black text-3xl rounded-full hover:bg-yellow-400 transition-all duration-500 hover:shadow-3xl hover:shadow-yellow-500/60 hover:scale-110"
//           >
//             START YOUR PROJECT
//             <ArrowRight className="w-10 h-10" />
//           </Link>
//         </motion.div>
//       </motion.div>

//       <style jsx global>{`
//         @keyframes gradient-x {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         .animate-gradient-x {
//           background-size: 200% auto;
//           animation: gradient-x 6s ease infinite;
//         }
//       `}</style>
//     </section>
//   );
// }




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
'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Zap, 
  Globe, 
  Smartphone, 
  BarChart3, 
  Clock, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const SERVICES = [
  {
    title: 'Web Development',
    description: 'Full-stack web applications that dominate performance, scalability & aesthetics.',
    icon: Globe,
    features: ['Next.js + React', 'TypeScript', 'Tailwind CSS', 'Headless CMS', 'API Integration'],
    price: 'From $8,000',
  },
  {
    title: 'UI/UX & Frontend Mastery',
    description: 'Pixel-perfect interfaces that feel like magic and convert like crazy.',
    icon: Smartphone,
    features: ['Figma → Production Code', 'Framer Motion Animations', 'Design Systems', 'Micro-interactions', 'A11y Compliance'],
    price: 'From $5,000',
  },
  {
    title: 'Performance Optimization',
    description: 'Turn good websites into lightning-fast experiences that rank #1.',
    icon: Zap,
    features: ['100 Lighthouse Scores', 'Core Web Vitals', 'Image/CDN Optimization', 'Bundle Splitting', 'Caching Strategy'],
    price: 'From $3,500',
  },
  {
    title: 'Analytics & Growth Systems',
    description: 'Know exactly what your users do — and make them do more of it.',
    icon: BarChart3,
    features: ['Custom Analytics', 'Heatmaps & Session Recording', 'Conversion Tracking', 'A/B Testing Setup', 'Dashboard Design'],
    price: 'From $2,500',
  },
];

export function ServicesSection() {
  const { scrollYProgress } = useScroll();
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smoothY, [0, 1], [-150, 150]);

  return (
    <section id="services" className="relative bg-[#060608] overflow-hidden">
      {/* FLOATING ORBS — SAME AS HERO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ x: [-300, 300], y: [-200, 200] }}
          transition={{ duration: 50, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-40 -left-64 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [300, -300], y: [200, -200] }}
          transition={{ duration: 55, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-40 -right-64 w-[600px] h-[600px] bg-yellow-600/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div style={{ y }} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-32 lg:py-48">
        {/* HERO-STYLE TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-32"
        >
          <h2 className="text-7xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-black leading-[0.8] tracking-tighter">
            WHAT I
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x">
              BUILD
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="text-2xl md:text-3xl text-slate-400 mt-12 font-light tracking-wide max-w-4xl mx-auto"
          >
            Not just websites. <span className="text-yellow-500 font-bold">Digital experiences that dominate.</span>
          </motion.p>
        </motion.div>

        {/* SERVICES GRID — GOD MODE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.4, 
                  delay: index * 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -30, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-slate-900/50 via-black/60 to-slate-900/50 backdrop-blur-2xl rounded-3xl p-10 lg:p-14 border border-white/10 hover:border-yellow-500/50 transition-all duration-700 shadow-2xl hover:shadow-yellow-500/30">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 p-5 bg-yellow-500/10 rounded-2xl w-fit"
                  >
                    <Icon className="w-12 h-12 text-yellow-500" />
                  </motion.div>

                  {/* Title & Description */}
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-6 group-hover:text-yellow-500 transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-5 mb-12">
                    {service.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <Sparkles className="w-6 h-6 text-yellow-500" />
                        <span className="text-lg text-slate-200">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 uppercase tracking-wider">Starting at</p>
                      <p className="text-4xl font-black text-yellow-500">{service.price}</p>
                    </div>
                    <motion.div whileHover={{ x: 20 }}>
                      <Link
                        href="#contact"
                        className="inline-flex items-center gap-4 px-8 py-4 bg-yellow-500 text-black font-black rounded-full hover:bg-yellow-400 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/50"
                      >
                        LET'S BUILD
                        <ArrowRight className="w-6 h-6" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* PROCESS TIMELINE */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="mt-40 bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-yellow-500/10 backdrop-blur-xl rounded-3xl p-12 lg:p-20 border border-white/10"
        >
          <h3 className="text-6xl md:text-8xl font-black text-center mb-20">
            <span className="bg-gradient-to-r from-yellow-500 to-purple-500 bg-clip-text text-transparent">
              The Process
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'We dig deep into your vision & goals' },
              { step: '02', title: 'Strategy', desc: 'Craft the perfect technical roadmap' },
              { step: '03', title: 'Execution', desc: 'Build with precision & obsession' },
              { step: '04', title: 'Launch & Scale', desc: 'Deploy, optimize, dominate' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <div className="text-8xl font-black text-yellow-500 mb-6">{item.step}</div>
                <h4 className="text-3xl font-black text-white mb-4">{item.title}</h4>
                <p className="text-slate-400 text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FINAL CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-center mt-40"
        >
          <p className="text-3xl md:text-5xl font-light text-slate-300 mb-12">
            Ready to build something <span className="text-yellow-500 font-black">legendary</span>?
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-8 px-20 py-8 bg-yellow-500 text-black font-black text-3xl rounded-full hover:bg-yellow-400 transition-all duration-500 hover:shadow-3xl hover:shadow-yellow-500/60 hover:scale-110"
          >
            START YOUR PROJECT
            <ArrowRight className="w-10 h-10" />
          </Link>
        </motion.div>
      </motion.div>

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
    </section>
  );
}
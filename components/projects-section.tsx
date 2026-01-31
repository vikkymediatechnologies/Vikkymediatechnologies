'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, Loader2, AlertCircle } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  github_url?: string;
  live_url?: string;
  technologies: string[];
}

const CATEGORIES = ['All', 'Web Apps', 'UI/UX', 'E-Commerce', 'SaaS', 'Real-time'];

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const containerRef = useRef<HTMLDivElement>(null);

  // SAME EXACT HERO PARALLAX MAGIC
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smoothY, [0, 1], [-200, 200]);
  const opacity = useTransform(smoothY, [0, 0.5, 1], [0.7, 1, 0.7]);
  const scale = useTransform(smoothY, [0, 0.5, 1], [0.95, 1, 0.95]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch('/api/projects');
        
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(p => 
    selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <section ref={containerRef} id="projects" className="relative bg-[#060608] overflow-hidden">
      {/* SAME FLOATING ORBS AS HERO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ x: [-200, 200], y: [-150, 150] }}
          transition={{ duration: 40, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-32 -left-48 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [200, -200], y: [150, -150] }}
          transition={{ duration: 45, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-32 -right-48 w-96 h-96 bg-yellow-600/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-32 lg:py-48"
      >
        {/* HERO-STYLE MASSIVE TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <h2 className="text-7xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-black leading-[0.8] tracking-tighter">
            MY
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x">
              WORK
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-xl md:text-2xl text-slate-400 mt-8 font-light tracking-wide"
          >
            Crafted with blood, sweat & pure skill
          </motion.p>
        </motion.div>

        {/* PREMIUM CATEGORY PILLS */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.7 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-4 rounded-full font-bold text-sm tracking-widest transition-all duration-500 ${
                selectedCategory === cat
                  ? 'bg-yellow-500 text-black shadow-2xl shadow-yellow-500/60'
                  : 'bg-white/5 text-white/60 backdrop-blur-xl border border-white/10 hover:bg-yellow-500/10 hover:text-yellow-500 hover:border-yellow-500/30'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* ERROR STATE */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h3>
            <p className="text-slate-400 mb-2 max-w-md">{error}</p>
            <p className="text-slate-500 text-sm mb-8">Check your .env.local file and make sure Supabase is set up correctly.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-all hover:scale-105"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* LOADING STATE */}
        {loading && !error && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-16 h-16 text-yellow-500 animate-spin mb-6" />
            <p className="text-slate-400 text-lg">Loading amazing projects...</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="text-6xl mb-6">🎨</div>
            <h3 className="text-3xl font-bold text-white mb-4">
              {projects.length === 0 ? 'No Projects Yet' : 'No Projects Found'}
            </h3>
            <p className="text-slate-400 mb-8 max-w-md">
              {projects.length === 0 
                ? 'Add your first project in Supabase to get started!'
                : `No projects in the "${selectedCategory}" category yet.`}
            </p>
            {selectedCategory !== 'All' && projects.length > 0 && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-all hover:scale-105"
              >
                View All Projects
              </button>
            )}
          </motion.div>
        )}

        {/* PROJECTS GRID - HERO LEVEL ANIMATION */}
        {!loading && !error && filteredProjects.length > 0 && (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.6, 
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -30, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-700 shadow-2xl hover:shadow-yellow-500/30">
                  {/* Image */}
                  <div className="relative h-72 md:h-96 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    {/* Golden overlay on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10 space-y-6">
                    <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-yellow-500 transition-colors duration-500">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span 
                          key={tech} 
                          className="px-4 py-2 bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-bold tracking-wider"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-4 py-2 bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-full text-xs font-bold tracking-wider">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-8 pt-4">
                      {project.github_url && (
                        <motion.a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ x: 12 }}
                          className="inline-flex items-center gap-3 text-yellow-500 font-black tracking-wider hover:text-white transition-all"
                        >
                          <Github className="w-6 h-6" />
                          CODE
                        </motion.a>
                      )}
                      {project.live_url && (
                        <motion.a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ x: 12 }}
                          className="inline-flex items-center gap-3 text-yellow-500 font-black tracking-wider hover:text-white transition-all"
                        >
                          <ExternalLink className="w-6 h-6" />
                          LIVE
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* FINAL CTA - HERO STYLE */}
        {!loading && !error && filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.6 }}
            className="text-center mt-32"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-6 px-16 py-7 bg-yellow-500 text-black font-black text-2xl rounded-full hover:bg-yellow-400 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/60 hover:scale-105"
            >
              VIEW FULL PORTFOLIO
              <ExternalLink className="w-8 h-8" />
            </Link>
          </motion.div>
        )}
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
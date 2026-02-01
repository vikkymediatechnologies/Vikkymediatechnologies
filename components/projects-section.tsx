'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, Loader2, AlertCircle, ArrowRight } from 'lucide-react';

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
  const y = useTransform(smoothY, [0, 1], [-80, 80]);
  const opacity = useTransform(smoothY, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

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
      {/* Subtle background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-900/20 rounded-full blur-[150px] animate-float-subtle" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-yellow-600/15 rounded-full blur-[150px] animate-float-subtle delay-3000" />
      </div>

      <motion.div 
        style={{ y: isMounted ? y : 0, opacity: isMounted ? opacity : 1 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-20 sm:py-28 lg:py-36"
      >
        {/* Title section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-yellow-500" />
            <span className="text-yellow-500 text-xs font-bold tracking-[0.3em] uppercase">Portfolio</span>
            <span className="h-px w-12 bg-yellow-500" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-5 text-slate-400">
            Selected{' '}
            <span className="projects-gradient">Projects</span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-4"
          >
            A showcase of innovative solutions, built with modern technologies and a passion for excellence
          </motion.p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16 sm:mb-20 px-4"
        >
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i + 0.2, duration: 0.3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 sm:py-28 text-center px-4"
          >
            <AlertCircle className="w-12 h-12 sm:w-14 sm:h-14 text-red-500 mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Unable to Load Projects</h3>
            <p className="text-slate-400 mb-2 max-w-md text-sm">{error}</p>
            <p className="text-slate-500 text-xs mb-6">Please check your environment configuration.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Loading state */}
        {loading && !error && (
          <div className="flex flex-col items-center justify-center py-20 sm:py-28">
            <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mb-4" />
            <p className="text-slate-400 text-sm">Loading projects...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 sm:py-28 text-center px-4"
          >
            <div className="text-5xl mb-4">📂</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {projects.length === 0 ? 'No Projects Yet' : 'No Projects Found'}
            </h3>
            <p className="text-slate-400 mb-6 max-w-md text-sm">
              {projects.length === 0 
                ? 'Projects will appear here once added to your database.'
                : `No projects match the "${selectedCategory}" category.`}
            </p>
            {selectedCategory !== 'All' && projects.length > 0 && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all"
              >
                View All Projects
              </button>
            )}
          </motion.div>
        )}

        {/* Projects grid */}
        {!loading && !error && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="project-card group"
              >
                {/* Image */}
                <div className="project-image">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="project-gradient" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold text-white">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-5 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-tag-more">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link group/link"
                      >
                        <Github className="w-5 h-5" />
                        <span>Source</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link project-link-primary group/link"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>View Live</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* CTA */}
        {!loading && !error && filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mt-16 sm:mt-20 lg:mt-24"
          >
            <Link
              href="/projects"
              className="cta-link inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 group"
            >
              View All Projects
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}
      </motion.div>

      <style jsx global>{`
        /* Gradient text */
        .projects-gradient {
          background: linear-gradient(135deg, #eab308 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Subtle float */
        @keyframes float-subtle {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
        }
        .animate-float-subtle {
          animation: float-subtle 25s ease-in-out infinite;
        }
        .delay-3000 {
          animation-delay: 3s;
        }

        /* Category pills */
        .category-pill {
          padding: 0.625rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.25s ease;
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .category-pill:hover {
          background: rgba(234, 179, 8, 0.08);
          color: #eab308;
          border-color: rgba(234, 179, 8, 0.2);
        }
        .category-pill.active {
          background: #eab308;
          color: #000;
          border-color: #eab308;
          font-weight: 700;
        }

        @media (min-width: 640px) {
          .category-pill {
            padding: 0.75rem 1.5rem;
          }
        }

        /* Professional card design */
        .project-card {
          position: relative;
          background: linear-gradient(135deg, rgba(15, 15, 20, 0.9) 0%, rgba(10, 10, 15, 0.95) 100%);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .project-card:hover {
          border-color: rgba(234, 179, 8, 0.3);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(234, 179, 8, 0.1);
          transform: translateY(-8px);
        }

        @media (min-width: 1024px) {
          .project-card:hover {
            transform: translateY(-12px);
          }
        }

        /* Image container */
        .project-image {
          position: relative;
          height: 14rem;
          overflow: hidden;
          background: #000;
        }
        @media (min-width: 640px) {
          .project-image {
            height: 16rem;
          }
        }
        @media (min-width: 1024px) {
          .project-image {
            height: 18rem;
          }
        }

        .project-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.6) 100%);
          z-index: 1;
        }

        /* Tech tags */
        .tech-tag {
          padding: 0.375rem 0.75rem;
          background: rgba(234, 179, 8, 0.08);
          color: #eab308;
          border: 1px solid rgba(234, 179, 8, 0.2);
          border-radius: 0.375rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .tech-tag-more {
          padding: 0.375rem 0.75rem;
          background: rgba(148, 163, 184, 0.08);
          color: #94a3b8;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 0.375rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* Project links */
        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #94a3b8;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.25s;
        }
        .project-link:hover {
          color: #fff;
        }
        
        .project-link-primary {
          color: #eab308;
        }
        .project-link-primary:hover {
          color: #fbbf24;
        }

        /* CTA link */
        .cta-link:hover {
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
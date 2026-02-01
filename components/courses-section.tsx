'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Clock, 
  BookOpen, 
  Star, 
  Users, 
  ArrowRight, 
  Loader2,
  Play,
  CheckCircle2
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  students: number;
  rating: number;
  price: string;
  lessons: number;
  featured: boolean;
}

const LEVEL_COLORS = {
  Beginner: 'bg-green-500/10 text-green-500 border-green-500/30',
  Intermediate: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  Advanced: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
};

export default function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section ref={containerRef} id="courses" className="relative bg-[#060608] overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-purple-900/20 rounded-full blur-[150px] animate-float-subtle" />
        <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-yellow-600/15 rounded-full blur-[150px] animate-float-subtle delay-5000" />
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
            <span className="text-yellow-500 text-xs font-bold tracking-[0.3em] uppercase">Education</span>
            <span className="h-px w-12 bg-yellow-500" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-5 text-slate-400">
            Online{' '}
            <span className="courses-gradient">Courses</span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Learn modern web development through practical, hands-on courses designed for real-world success
          </motion.p>
        </motion.div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 sm:py-28">
            <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mb-4" />
            <p className="text-slate-400 text-sm">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 sm:py-28">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-white mb-3">Courses Coming Soon</h3>
            <p className="text-slate-400 text-base max-w-md mx-auto">
              New courses are in development. Check back soon for exciting learning opportunities!
            </p>
          </div>
        ) : (
          <>
            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 mb-20 sm:mb-28 lg:mb-32">
              {courses.map((course, index) => (
                <motion.article
                  key={course.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="course-card group"
                >
                  {/* Thumbnail */}
                  <div className="course-thumbnail">
                    <Image
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="course-thumbnail-gradient" />
                    
                    {/* Level badge */}
                    <div className={`level-badge ${LEVEL_COLORS[course.level]}`}>
                      {course.level}
                    </div>

                    {/* Play overlay on hover */}
                    <div className="play-overlay">
                      <Play className="w-12 h-12 sm:w-14 sm:h-14 text-white fill-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-500 transition-colors duration-300">
                      {course.title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-5 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 py-4 border-y border-white/5 mb-5">
                      <div className="text-center">
                        <Clock className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                        <p className="text-xs text-slate-500">Duration</p>
                        <p className="text-sm font-semibold text-white">{course.duration}</p>
                      </div>
                      <div className="text-center">
                        <BookOpen className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                        <p className="text-xs text-slate-500">Lessons</p>
                        <p className="text-sm font-semibold text-white">{course.lessons}</p>
                      </div>
                      <div className="text-center">
                        <Users className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                        <p className="text-xs text-slate-500">Students</p>
                        <p className="text-sm font-semibold text-white">{course.students}+</p>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-2xl sm:text-3xl font-black text-yellow-500">{course.price}</p>
                        {course.price !== 'Free' && (
                          <p className="text-xs text-slate-500">one-time payment</p>
                        )}
                      </div>
                      <Link
                        href={`/courses/${course.id}`}
                        className="course-cta group/cta"
                      >
                        <span className="hidden sm:inline">Enroll</span>
                        <span className="sm:hidden">Join</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Mentorship Section */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mentorship-container"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-6">
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
                  1-on-1{' '}
                  <span className="courses-gradient">Mentorship</span>
                </h3>
                <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Accelerate your learning with personalized guidance, code reviews, and career strategy sessions
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
                {[
                  'Weekly 1-on-1 calls',
                  'Code review sessions',
                  'Portfolio building',
                  'Career guidance'
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-slate-300">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="#contact"
                  className="cta-button inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 group"
                >
                  Book a Mentorship Call
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </motion.div>

      <style jsx global>{`
        /* Gradient text */
        .courses-gradient {
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
        .delay-5000 {
          animation-delay: 5s;
        }

        /* Course cards */
        .course-card {
          position: relative;
          background: linear-gradient(135deg, rgba(15, 15, 20, 0.9) 0%, rgba(10, 10, 15, 0.95) 100%);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .course-card:hover {
          border-color: rgba(234, 179, 8, 0.3);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(234, 179, 8, 0.1);
          transform: translateY(-8px);
        }

        @media (min-width: 1024px) {
          .course-card:hover {
            transform: translateY(-12px);
          }
        }

        /* Thumbnail */
        .course-thumbnail {
          position: relative;
          height: 14rem;
          overflow: hidden;
          background: #000;
        }
        @media (min-width: 640px) {
          .course-thumbnail {
            height: 16rem;
          }
        }

        .course-thumbnail-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
          z-index: 1;
        }

        /* Level badge */
        .level-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.375rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          border: 1px solid;
          z-index: 2;
          backdrop-filter: blur(8px);
        }

        /* Play overlay */
        .play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.6);
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 2;
        }
        .course-card:hover .play-overlay {
          opacity: 1;
        }

        /* Course CTA */
        .course-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(234, 179, 8, 0.1);
          color: #eab308;
          border: 1px solid rgba(234, 179, 8, 0.3);
          border-radius: 0.5rem;
          font-weight: 700;
          font-size: 0.875rem;
          transition: all 0.25s;
        }
        .course-cta:hover {
          background: #eab308;
          color: #000;
          border-color: #eab308;
        }

        @media (min-width: 640px) {
          .course-cta {
            padding: 0.875rem 1.75rem;
          }
        }

        /* Mentorship container */
        .mentorship-container {
          background: linear-gradient(135deg, rgba(234, 179, 8, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
          backdrop-filter: blur(10px);
          border-radius: 1.5rem;
          padding: 2.5rem 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        @media (min-width: 640px) {
          .mentorship-container {
            padding: 3rem 2rem;
          }
        }

        @media (min-width: 1024px) {
          .mentorship-container {
            padding: 4rem 3rem;
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
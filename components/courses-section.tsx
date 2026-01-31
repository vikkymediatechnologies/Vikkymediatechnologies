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
  Sparkles
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

export default function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  // SAME HERO PARALLAX MAGIC
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smoothY, [0, 1], [-200, 200]);

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
    <section ref={ref} id="courses" className="relative bg-[#060608] overflow-hidden">
      {/* FLOATING ORBS — EXACT SAME AS HERO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ x: [-300, 300], y: [-200, 200] }}
          transition={{ duration: 60, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-40 -left-80 w-[700px] h-[700px] bg-purple-900/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [300, -300], y: [200, -200] }}
          transition={{ duration: 65, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-40 -right-80 w-[700px] h-[700px] bg-yellow-600/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div style={{ y }} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-32 lg:py-48">
        {/* HERO-STYLE TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-32"
        >
          <h2 className="text-7xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-black leading-[0.8] tracking-tighter">
            LEARN
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x">
              FROM ME
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.4 }}
            className="text-2xl md:text-3xl text-slate-400 mt-12 font-light tracking-wide max-w-5xl mx-auto"
          >
            I don’t just build websites — I teach the <span className="text-yellow-500 font-bold">next generation</span> how to dominate the game.
          </motion.p>
        </motion.div>

        {/* COURSES GRID — GOD MODE */}
        {loading ? (
          <div className="flex justify-center py-40">
            <Loader2 className="w-20 h-20 text-yellow-500 animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-40">
            <p className="text-4xl text-slate-500 font-light">Courses launching soon...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.6, 
                  delay: index * 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -40, scale: 1.03 }}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-slate-900/60 via-black/80 to-slate-900/60 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 hover:border-yellow-500/60 transition-all duration-700 shadow-2xl hover:shadow-yellow-500/40">
                  {/* Thumbnail */}
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    {/* Level Badge */}
                    <div className="absolute top-6 left-6 px-5 py-2 bg-yellow-500 text-black font-black rounded-full text-sm tracking-wider">
                      {course.level.toUpperCase()}
                    </div>

                    {/* Hover Golden Glow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-yellow-500/30 to-transparent"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-10 space-y-8">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black text-white mb-4 group-hover:text-yellow-500 transition-colors duration-500">
                        {course.title}
                      </h3>
                      <p className="text-lg text-slate-300 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/10">
                      <div className="text-center">
                        <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <p className="text-sm text-slate-400">Duration</p>
                        <p className="font-bold text-white">{course.duration}</p>
                      </div>
                      <div className="text-center">
                        <BookOpen className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <p className="text-sm text-slate-400">Lessons</p>
                        <p className="font-bold text-white">{course.lessons}</p>
                      </div>
                      <div className="text-center">
                        <Users className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <p className="text-sm text-slate-400">Students</p>
                        <p className="font-bold text-white">{course.students}+</p>
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-4xl font-black text-yellow-500">{course.price}</p>
                        {course.price !== 'Free' && <p className="text-sm text-slate-500">one-time payment</p>}
                      </div>
                      <motion.div whileHover={{ x: 15 }}>
                        <Link
                          href={`/courses/${course.id}`}
                          className="inline-flex items-center gap-4 px-8 py-5 bg-yellow-500 text-black font-black rounded-full hover:bg-yellow-400 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/60"
                        >
                          ENROLL NOW
                          <ArrowRight className="w-6 h-6" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* MENTORSHIP CTA — PURE FIRE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="mt-48 bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-yellow-500/10 backdrop-blur-2xl rounded-3xl p-16 lg:p-24 border border-white/10 text-center"
        >
          <Sparkles className="w-20 h-20 text-yellow-500 mx-auto mb-8" />
          <h3 className="text-6xl md:text-8xl font-black mb-8">
            <span className="bg-gradient-to-r from-yellow-500 to-purple-500 bg-clip-text text-transparent">
              Want 1-on-1 Mentorship?
            </span>
          </h3>
          <p className="text-2xl text-slate-300 mb-12 max-w-4xl mx-auto">
            Skip years of trial and error. Work directly with me — weekly calls, code reviews, portfolio building, job strategy.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-8 px-20 py-8 bg-yellow-500 text-black font-black text-3xl rounded-full hover:bg-yellow-400 transition-all duration-500 hover:shadow-3xl hover:shadow-yellow-500/70 hover:scale-110"
          >
            BOOK A MENTORSHIP CALL
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
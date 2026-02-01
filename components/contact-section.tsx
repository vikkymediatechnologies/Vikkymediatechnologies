'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Twitter, 
  Send,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
  ChevronDown
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

const SERVICES = [
  { value: 'web-development', label: 'Full-Stack Web Development' },
  { value: 'ui-ux-design', label: 'UI/UX & Frontend Design' },
  { value: 'performance', label: 'Performance Optimization' },
  { value: 'mentorship', label: '1-on-1 Mentorship' },
  { value: 'other', label: 'Other Services' },
];

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: 'web-development',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isMounted, setIsMounted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('success');
      setFormData({ name: '', email: '', service: 'web-development', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={containerRef} id="contact" className="relative bg-[#060608] overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-purple-900/20 rounded-full blur-[150px] animate-float-subtle" />
        <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-yellow-600/15 rounded-full blur-[150px] animate-float-subtle delay-6000" />
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
            <span className="text-yellow-500 text-xs font-bold tracking-[0.3em] uppercase">Get In Touch</span>
            <span className="h-px w-12 bg-yellow-500" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-5 text-white">
            Let's Work{' '}
            <span className="contact-gradient">Together</span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Have a project in mind? Let's discuss how we can bring your vision to life
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6 sm:space-y-8"
          >
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="contact-info-card group"
            >
              <div className="contact-icon">
                <Mail className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Email</p>
                <a 
                  href="mailto:vikkymediatechnologies@gmail.com" 
                  className="text-base sm:text-lg font-bold text-white group-hover:text-yellow-500 transition-colors block break-words"
                >
                  vikkymediatechnologies@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="contact-info-card"
            >
              <div className="contact-icon">
                <MapPin className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Location</p>
                <p className="text-base sm:text-lg font-bold text-white">
                  Ashi Bodija, Oyo State, Nigeria
                </p>
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="contact-info-card"
            >
              <div className="contact-icon">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Response Time</p>
                <p className="text-base sm:text-lg font-bold text-white">
                  Within 24 hours
                </p>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="pt-4"
            >
              <p className="text-sm font-bold text-slate-400 mb-4">Connect on Social</p>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: 'https://github.com/vikkymedia', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/vikkymedia', label: 'LinkedIn' },
                  { icon: Twitter, href: 'https://twitter.com/vikkymedia', label: 'Twitter' },
                ].map((social, i) => {
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
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.1, y: -4 }}
                      className="social-link"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="contact-form">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="form-field-wrapper"
                >
                  <label htmlFor="name" className="form-label">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`form-input ${focusedField === 'name' ? 'focused' : ''}`}
                    placeholder="John Doe"
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="form-field-wrapper"
                >
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`form-input ${focusedField === 'email' ? 'focused' : ''}`}
                    placeholder="john@example.com"
                  />
                </motion.div>
              </div>

              {/* Service Select */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="form-field-wrapper"
              >
                <label htmlFor="service" className="form-label">
                  Service Interested In <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('service')}
                    onBlur={() => setFocusedField(null)}
                    className={`form-select ${focusedField === 'service' ? 'focused' : ''}`}
                  >
                    {SERVICES.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="select-arrow" />
                </div>
              </motion.div>

              {/* Message Textarea */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="form-field-wrapper"
              >
                <label htmlFor="message" className="form-label">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={6}
                  className={`form-textarea ${focusedField === 'message' ? 'focused' : ''}`}
                  placeholder="Tell me about your project, goals, and timeline..."
                />
              </motion.div>

              {/* Success Message */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="status-message status-success"
                >
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <p className="text-sm sm:text-base">
                    <strong>Success!</strong> Your message has been sent. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="status-message status-error"
                >
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <p className="text-sm sm:text-base">
                    <strong>Error!</strong> Failed to send message. Please try again or email me directly.
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.4 }}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin">⏳</span>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      <style jsx global>{`
        /* Gradient text */
        .contact-gradient {
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
        .delay-6000 {
          animation-delay: 6s;
        }

        /* Contact info cards */
        .contact-info-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, rgba(15, 15, 20, 0.6) 0%, rgba(10, 10, 15, 0.8) 100%);
          backdrop-filter: blur(10px);
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.3s ease;
        }
        .contact-info-card:hover {
          border-color: rgba(234, 179, 8, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        @media (min-width: 640px) {
          .contact-info-card {
            padding: 1.75rem;
          }
        }

        /* Contact icon */
        .contact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          background: rgba(234, 179, 8, 0.1);
          border: 1px solid rgba(234, 179, 8, 0.2);
          border-radius: 0.5rem;
          flex-shrink: 0;
        }

        /* Social links */
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.5rem;
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
        }
        .social-link:hover {
          background: rgba(234, 179, 8, 0.1);
          border-color: rgba(234, 179, 8, 0.3);
          color: #eab308;
        }

        /* Form */
        .contact-form {
          background: linear-gradient(135deg, rgba(15, 15, 20, 0.7) 0%, rgba(10, 10, 15, 0.9) 100%);
          backdrop-filter: blur(15px);
          border-radius: 1.25rem;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        @media (min-width: 640px) {
          .contact-form {
            padding: 2.5rem;
            gap: 2rem;
          }
        }

        @media (min-width: 1024px) {
          .contact-form {
            padding: 3rem;
          }
        }

        /* Form field wrapper */
        .form-field-wrapper {
          position: relative;
        }

        /* Form label */
        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #cbd5e1;
          margin-bottom: 0.625rem;
          letter-spacing: 0.01em;
        }

        /* Form input base */
        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          color: #fff;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          transition: all 0.3s ease;
        }

        .form-input:hover,
        .form-select:hover,
        .form-textarea:hover {
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.06);
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus,
        .form-input.focused,
        .form-select.focused,
        .form-textarea.focused {
          outline: none;
          border-color: rgba(234, 179, 8, 0.6);
          background: rgba(255, 255, 255, 0.07);
          box-shadow: 0 0 0 3px rgba(234, 179, 8, 0.1);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        /* Select specific */
        .form-select {
          appearance: none;
          cursor: pointer;
          padding-right: 3rem;
          background-image: none;
        }

        .form-select option {
          background: #1a1a1a;
          color: #fff;
          padding: 1rem;
        }

        .select-arrow {
          position: absolute;
          right: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1.25rem;
          height: 1.25rem;
          color: rgba(255, 255, 255, 0.4);
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .form-field-wrapper:focus-within .select-arrow {
          color: #eab308;
        }

        /* Textarea */
        .form-textarea {
          resize: vertical;
          min-height: 150px;
        }

        /* Status messages */
        .status-message {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
          padding: 1.125rem 1.25rem;
          border-radius: 0.75rem;
          border: 1.5px solid;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .status-success {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.4);
          color: #4ade80;
        }

        .status-error {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.4);
          color: #f87171;
        }

        /* Submit button */
        .submit-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1.125rem 2rem;
          background: linear-gradient(135deg, #eab308 0%, #f59e0b 100%);
          color: #000;
          font-weight: 700;
          font-size: 1.0625rem;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(234, 179, 8, 0.2);
        }

        .submit-button:hover:not(:disabled) {
          box-shadow: 0 10px 35px rgba(234, 179, 8, 0.4);
          transform: translateY(-2px);
        }

        .submit-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
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
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Menu, X } from 'lucide-react';

// export function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const links = [
//     { href: '#projects', label: 'Projects' },
//     { href: '#services', label: 'Services' },
//     { href: '#courses', label: 'Courses' },
//     { href: '#contact', label: 'Contact' },
//   ];

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800'
//           : 'bg-transparent'
//       }`}
//     >
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link
//             href="/"
//             className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
//           >
//             Dev
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-8">
//             {links.map((link) => (
//               <a
//                 key={link.href}
//                 href={link.href}
//                 className="text-slate-300 hover:text-indigo-400 transition-colors font-medium"
//               >
//                 {link.label}
//               </a>
//             ))}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden text-slate-300 hover:text-indigo-400 transition-colors"
//             aria-label="Toggle menu"
//           >
//             {isOpen ? (
//               <X className="w-6 h-6" />
//             ) : (
//               <Menu className="w-6 h-6" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden pb-4 space-y-2">
//             {links.map((link) => (
//               <a
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setIsOpen(false)}
//                 className="block px-4 py-2 text-slate-300 hover:text-indigo-400 hover:bg-slate-800/50 rounded-lg transition-colors"
//               >
//                 {link.label}
//               </a>
//             ))}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

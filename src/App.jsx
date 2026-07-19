import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-scroll';
import { 
  ExternalLink, Github, Linkedin, Mail, Phone, 
  ChevronDown, Download, CheckCircle2, Layout, 
  Layers, PenTool, Code2, ArrowRight 
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// --- COMPONENTS ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-2xl font-bold tracking-tighter text-white cursor-pointer"
        >
          FK<span className="text-blue-500">.</span>
        </motion.div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          {['About', 'Work', 'Skills', 'Experience', 'Contact'].map((item) => (
            <Link key={item} to={item.toLowerCase()} smooth={true} spy={true} className="cursor-pointer hover:text-white transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2"
        >
          Resume <Download size={16} />
        </motion.button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [index, setIndex] = useState(0);
  const words = ["Interfaces", "Brands", "Products", "Experiences"];

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-blue-400"
      >
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Available for Freelance & Full-time Roles
      </motion.div>

      <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight mb-6">
        I Design <br />
        <span className="text-blue-500 relative inline-block min-w-[300px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>

      <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
        Faiz Khan | UI/UX & Graphic Designer. <br />
        Designing experiences, crafting brands.
      </p>

      <div className="flex gap-4">
        <Link to="work" smooth={true}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all">View My Work</button>
        </Link>
        <Link to="contact" smooth={true}>
          <button className="border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-xl font-bold transition-all">Let's Connect</button>
        </Link>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    { title: "Financial App UX", cat: "Fintech • UI/UX", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800" },
    { title: "Eco-Brand Identity", cat: "Branding", img: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800" },
    { title: "Mobile UI Kit", cat: "Design System", img: "https://images.unsplash.com/photo-1613909209472-7bb172d0591a?auto=format&fit=crop&q=80&w=800" },
    { title: "Premium Packaging", cat: "Packaging", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <section id="work" className="py-24 bg-[#0a0a0a] px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          variants={fadeUp} initial="hidden" whileInView="visible"
          className="text-4xl font-bold text-white mb-16"
        >
          Selected Work
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              variants={fadeUp} initial="hidden" whileInView="visible"
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 cursor-pointer"
            >
              <img src={p.img} alt={p.title} className="w-full h-[400px] object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-8">
                <p className="text-blue-400 text-sm font-bold mb-2">{p.cat}</p>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  {p.title} <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" size={20} />
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const jobs = [
    { title: "Graphic/UI Designer", co: "DB Vertex Technology", date: "Dec 2025 - Present", desc: "Designing high-fidelity UI for mobile/web and premium branding materials." },
    { title: "UI/UX Intern", co: "Engineer Sahab", date: "Jun 2025 - Dec 2025", desc: "End-to-end UX for financial products, user journey mapping, and prototyping." },
    { title: "Graphic Designer", co: "Infomystique Technology", date: "2023 - 2024", desc: "Produced 300+ visual assets for diverse marketing campaigns." },
  ];

  return (
    <section id="experience" className="py-24 bg-black px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-16">Experience</h2>
        <div className="space-y-12 relative border-l border-white/10 pl-8 ml-4">
          {jobs.map((job, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute -left-[41px] top-1 w-4 h-4 bg-blue-500 rounded-full border-4 border-black" />
              <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">{job.date}</span>
              <h3 className="text-2xl font-bold text-white mt-1">{job.title}</h3>
              <p className="text-gray-400 font-medium mb-2">{job.co}</p>
              <p className="text-gray-500">{job.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [open, setOpen] = useState(null);
  const questions = [
    { q: "What kind of projects do you work on?", a: "Web and mobile UI/UX, branding, packaging, and social media design." },
    { q: "What tools do you use?", a: "Figma for design, along with Photoshop, Illustrator, and Canva for graphics." },
    { q: "Are you open to full-time work?", a: "Yes, I am actively seeking full-time roles and freelance collaborations." },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Common Questions</h2>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center p-6 text-white text-left font-bold"
              >
                {item.q} <ChevronDown className={`transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div 
                    initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="p-6 pt-0 text-gray-400">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-black px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">Let's Create <br /> <span className="text-blue-500">Together</span></h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Feel free to reach out if you have a project in mind or just want to say hi — I'm open to new opportunities.
          </p>
          <div className="space-y-4 text-white">
            <a href="mailto:faizkhanofficial2001@gmail.com" className="flex items-center gap-4 hover:text-blue-400 transition-colors">
              <Mail className="text-blue-500" /> faizkhanofficial2001@gmail.com
            </a>
            <div className="flex items-center gap-4">
              <Phone className="text-blue-500" /> +91 8640043135
            </div>
          </div>
        </div>

        <form className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Name" className="bg-transparent border-b border-white/20 py-4 outline-none focus:border-blue-500 transition-colors text-white" />
            <input placeholder="Email" className="bg-transparent border-b border-white/20 py-4 outline-none focus:border-blue-500 transition-colors text-white" />
          </div>
          <textarea placeholder="Message" rows="4" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-blue-500 transition-colors text-white" />
          <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-blue-500 hover:text-white transition-all uppercase tracking-widest text-sm">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-[#0a0a0a] selection:bg-blue-500/30 selection:text-blue-200">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-[100] origin-left" style={{ scaleX }} />
      <Navbar />
      <Hero />
      
      {/* Marquee */}
      <div className="py-12 bg-white/5 overflow-hidden whitespace-nowrap border-y border-white/5">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-20 text-2xl font-bold text-white/20 uppercase italic"
        >
          {Array(10).fill("UI/UX DESIGN • BRANDING • PACKAGING • PROTOTYPING • ")}
        </motion.div>
      </div>

      <section id="about" className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="relative group">
          <div className="w-full h-[500px] bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl overflow-hidden">
             {/* Replace with Faiz's Photo */}
             <div className="absolute inset-0 flex items-center justify-center text-white/20 font-black text-4xl">FAIZ KHAN</div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white p-4 text-center leading-tight">1+ Years of Exp</div>
        </motion.div>
        
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
          <h2 className="text-4xl font-bold text-white mb-6 underline decoration-blue-500 underline-offset-8">Hello, I'm Faiz.</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            I'm a UI/UX and Graphic Designer with a passion for delivering user-centered digital interfaces. I specialize in Figma, branding, and UX research, helping brands bridge the gap between their products and their users.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Figma", "Branding", "UI Design", "UX Research", "Packaging", "Illustration"].map(tag => (
              <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">{tag}</span>
            ))}
          </div>
        </motion.div>
      </section>

      <Portfolio />
      <Experience />
      <FAQ />
      <Contact />

      <footer className="py-12 border-t border-white/5 text-center text-gray-600">
        <div className="flex justify-center gap-6 mb-6">
          <Linkedin className="hover:text-white cursor-pointer" />
          <ExternalLink className="hover:text-white cursor-pointer" />
          <Github className="hover:text-white cursor-pointer" />
        </div>
        <p>© 2026 Faiz Khan. Made with Precision.</p>
      </footer>
    </div>
  );
}


import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-scroll';
import {
  ExternalLink, Github, Linkedin, Mail, Phone,
  ChevronDown, Download, Layout, Search, Palette,
  Code2, ArrowRight, PenTool, PackageCheck,
  Instagram, Quote, Sun, Moon
} from 'lucide-react';

// ============ THEME CONTEXT (lightweight, no extra lib) ============
const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => React.useContext(ThemeContext);

// ============ ANIMATION VARIANTS ============
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// ============ LIGHTWEIGHT 3D TILT WRAPPER (pure CSS transform, no 3D lib) ============
const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;
    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
    });
  };

  const resetStyle = () => setStyle({ transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)" });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetStyle}
      style={{ ...style, transition: "transform 0.15s ease-out", willChange: "transform" }}
      className={className}
    >
      {children}
    </div>
  );
};

// ============ FLOATING 3D SHAPE (pure CSS, no libraries — keeps load fast) ============
const Floating3DShape = ({ className = "" }) => (
  <div className={`pointer-events-none ${className}`} style={{ perspective: "1000px" }}>
    <motion.div
      animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
      transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
      style={{ transformStyle: "preserve-3d" }}
      className="w-20 h-20 md:w-28 md:h-28 relative"
    >
      <div className="absolute inset-0 bg-blue-500/20 border border-blue-400/30 rounded-2xl backdrop-blur-sm" style={{ transform: "translateZ(20px)" }} />
      <div className="absolute inset-0 bg-purple-500/10 border border-purple-400/20 rounded-2xl" style={{ transform: "translateZ(-20px)" }} />
    </motion.div>
  </div>
);

// ============ THEME TOGGLE BUTTON ============
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.button
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
            <Sun size={18} />
          </motion.div>
        ) : (
          <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
            <Moon size={18} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// ============ NAVBAR ============
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter text-black dark:text-white cursor-pointer">
          FK<span className="text-blue-500">.</span>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          {['About', 'Work', 'Skills', 'Experience', 'Contact'].map((item) => (
            <Link key={item} to={item.toLowerCase()} smooth={true} spy={true} className="cursor-pointer hover:text-black dark:hover:text-white transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2"
          >
            Resume <Download size={16} />
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

// ============ HERO ============
const galleryImages = [
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=70&w=300",
  "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=70&w=300",
  "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&q=70&w=300",
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=70&w=300",
  "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=70&w=300",
  "https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&q=70&w=300",
];

const ImageMarquee = () => (
  <div className="relative w-full overflow-hidden py-6 mb-8">
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      className="flex gap-6 w-max"
    >
      {[...galleryImages, ...galleryImages].map((src, i) => (
        <div key={i} className="w-40 h-28 md:w-56 md:h-36 rounded-xl overflow-hidden flex-shrink-0 border border-black/10 dark:border-white/10">
          <img src={src} alt="work sample" loading="lazy" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </motion.div>
  </div>
);

const Hero = () => {
  const [index, setIndex] = useState(0);
  const words = ["Interfaces", "Brands", "Products", "Experiences"];

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden bg-white dark:bg-[#0a0a0a] pt-24 transition-colors duration-300">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <Floating3DShape className="absolute top-24 left-8 hidden lg:block" />
      <Floating3DShape className="absolute bottom-24 right-8 hidden lg:block" />

      <ImageMarquee />

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-xs text-blue-500 dark:text-blue-400"
      >
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Available for Freelance & Full-time Roles
      </motion.div>

      <h1 className="text-5xl md:text-8xl font-bold text-black dark:text-white tracking-tight mb-6">
        I Design <br />
        <span className="text-blue-600 dark:text-blue-500 relative inline-block min-w-[300px]">
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

      <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
        Faiz Khan | UI/UX & Graphic Designer. <br />
        Designing experiences, crafting brands.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="work" smooth={true}>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all">
            View My Work
          </motion.button>
        </Link>
        <Link to="contact" smooth={true}>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-black dark:text-white px-8 py-4 rounded-xl font-bold transition-all">
            Let's Connect
          </motion.button>
        </Link>
      </div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 text-black/30 dark:text-white/30">
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
};

// ============ TEXT MARQUEE ============
const TextMarquee = () => (
  <div className="py-10 bg-black/5 dark:bg-white/5 overflow-hidden whitespace-nowrap border-y border-black/5 dark:border-white/5">
    <motion.div
      animate={{ x: [0, -1200] }}
      transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      className="flex gap-16 text-2xl md:text-3xl font-bold text-black/10 dark:text-white/20 uppercase italic"
    >
      {Array(6).fill("UI/UX DESIGN • BRANDING • PACKAGING • PROTOTYPING • ")}
    </motion.div>
  </div>
);

// ============ TOOLS STRIP ============
const ToolsStrip = () => {
  const tools = ["Figma", "Adobe Photoshop", "Illustrator", "Canva", "CorelDraw", "Framer", "HTML/CSS"];
  return (
    <section className="py-16 bg-white dark:bg-black transition-colors duration-300">
      <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-8">Tools I Work With</p>
      <div className="relative overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="flex gap-16 w-max px-8"
        >
          {[...tools, ...tools].map((t, i) => (
            <span key={i} className="text-xl md:text-2xl font-semibold text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors whitespace-nowrap">
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============ HELLO INTRO ============
const HelloIntro = () => {
  const tags = ["UI Design", "UX Research", "Wireframing", "Prototyping", "Branding", "Illustration"];
  return (
    <section className="py-24 px-6 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-4">
          Hello!
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-2xl md:text-4xl font-bold text-black dark:text-white leading-snug mb-10">
          I blend user-centered design thinking with strong visual storytelling — creating interfaces and brand identities that feel intentional and polished.
        </motion.h2>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-3">
          {tags.map((tag) => (
            <motion.span
              key={tag}
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.05 }}
              className="px-5 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-sm text-gray-700 dark:text-gray-300 cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============ PROCESS STEPS ============
const ProcessSteps = () => {
  const steps = [
    { icon: Search, num: "1", title: "Discover", desc: "Understanding the problem through research, user interviews, and journey mapping." },
    { icon: PenTool, num: "2", title: "Design", desc: "Wireframing, prototyping, and iterating in Figma with continuous feedback." },
    { icon: PackageCheck, num: "3", title: "Deliver", desc: "Polished, dev-ready UI and brand assets with clear documentation." },
  ];

  return (
    <section className="py-24 px-6 bg-black/[0.02] dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-3 text-center">
          My Process, Explained
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl font-bold text-black dark:text-white text-center mb-16">
          Here's how it works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent" />
          {steps.map((s, i) => (
            <TiltCard key={i} className="relative bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-8 text-center shadow-sm dark:shadow-none">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-600 flex items-center justify-center relative z-10">
                  <s.icon className="text-white" size={26} />
                </div>
                <span className="text-blue-500 dark:text-blue-400 font-bold text-sm">STEP {s.num}</span>
                <h3 className="text-2xl font-bold text-black dark:text-white mt-2 mb-3">{s.title}</h3>
                <p className="text-gray-500">{s.desc}</p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ TESTIMONIALS ============
const Testimonials = () => {
  const testimonials = [
    { name: "Team Lead", role: "DB Vertex Technology", quote: "Faiz brings a sharp eye for detail and a genuine understanding of user needs. His UI work consistently elevates our client projects." },
    { name: "Mentor", role: "Engineer Sahab", quote: "Working with Faiz on our financial product was smooth — he mapped user journeys thoughtfully and delivered clean, intuitive prototypes." },
    { name: "Project Manager", role: "Infomystique Technology", quote: "Faiz produced a huge volume of high-quality creatives without ever compromising on brand consistency. Reliable and fast." },
  ];
  const [i, setI] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setI((prev) => (prev + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-3xl mx-auto text-center">
        <Quote className="mx-auto text-blue-500 mb-6" size={36} />
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <p className="text-xl md:text-2xl text-black dark:text-white font-medium leading-relaxed mb-8">"{testimonials[i].quote}"</p>
            <p className="text-blue-500 dark:text-blue-400 font-bold">{testimonials[i].name}</p>
            <p className="text-gray-500 text-sm">{testimonials[i].role}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${idx === i ? 'w-8 bg-blue-500' : 'w-1.5 bg-black/20 dark:bg-white/20'}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ PORTFOLIO ============
const Portfolio = () => {
  const projects = [
    { title: "Financial App UX", cat: "Fintech • UI/UX", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=75&w=700" },
    { title: "Eco-Brand Identity", cat: "Branding", img: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=75&w=700" },
    { title: "Mobile UI Kit", cat: "Design System", img: "https://images.unsplash.com/photo-1613909209472-7bb172d0591a?auto=format&fit=crop&q=75&w=700" },
    { title: "Premium Packaging", cat: "Packaging", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=75&w=700" },
  ];

  return (
    <section id="work" className="py-24 bg-white dark:bg-[#0a0a0a] px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-3">
          Our Projects
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl font-bold text-black dark:text-white mb-16">
          Selected Work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <TiltCard key={i} className="group relative overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 cursor-pointer">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <img src={p.img} alt={p.title} loading="lazy" className="w-full h-[400px] object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-8">
                  <p className="text-blue-400 text-sm font-bold mb-2">{p.cat}</p>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    {p.title} <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" size={20} />
                  </h3>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ ABOUT ============
const About = () => (
  <section id="about" className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center bg-white dark:bg-transparent transition-colors duration-300">
    <TiltCard className="relative group">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full h-[500px] bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center text-white/20 font-black text-4xl">FAIZ KHAN</div>
      </motion.div>
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white p-4 text-center leading-tight">1+ Years of Exp</div>
    </TiltCard>

    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <h2 className="text-4xl font-bold text-black dark:text-white mb-6 underline decoration-blue-500 underline-offset-8">Hello, I'm Faiz.</h2>
      <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
        I'm a UI/UX and Graphic Designer with a passion for delivering user-centered digital interfaces. I specialize in Figma, branding, and UX research, helping brands bridge the gap between their products and their users.
      </p>
      <div className="flex flex-wrap gap-3">
        {["Figma", "Branding", "UI Design", "UX Research", "Packaging", "Illustration"].map(tag => (
          <span key={tag} className="px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-sm text-gray-700 dark:text-gray-300">{tag}</span>
        ))}
      </div>
    </motion.div>
  </section>
);

// ============ SKILLS ============
const Skills = () => {
  const groups = [
    { title: "Tools", icon: Layout, items: ["Figma", "Photoshop", "Illustrator", "Canva", "CorelDraw", "Framer"] },
    { title: "UX & Research", icon: Search, items: ["UX Research", "User Testing", "Journey Mapping", "Information Architecture", "A/B Testing"] },
    { title: "Design Practice", icon: Palette, items: ["Wireframing", "Prototyping", "UI Design", "Interaction Design", "Design Systems", "Illustration"] },
    { title: "Frontend Basics", icon: Code2, items: ["HTML", "CSS"] },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-black/[0.02] dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl font-bold text-black dark:text-white mb-16 text-center">
          Skills & Tools
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((g, i) => (
            <TiltCard key={i} className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-none">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex items-center gap-3 mb-4">
                  <g.icon className="text-blue-500" size={22} />
                  <h3 className="text-lg font-bold text-black dark:text-white">{g.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map(item => (
                    <span key={item} className="px-3 py-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-xs text-gray-600 dark:text-gray-400">{item}</span>
                  ))}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ EXPERIENCE ============
const Experience = () => {
  const jobs = [
    { title: "Graphic/UI Designer", co: "DB Vertex Technology", date: "Dec 2025 - Present", desc: "Designing high-fidelity UI for mobile/web and premium branding materials." },
    { title: "UI/UX Intern", co: "Engineer Sahab", date: "Jun 2025 - Dec 2025", desc: "End-to-end UX for financial products, user journey mapping, and prototyping." },
    { title: "Graphic Designer", co: "Infomystique Technology", date: "2023 - 2024", desc: "Produced 300+ visual assets for diverse marketing campaigns." },
  ];

  return (
    <section id="experience" className="py-24 bg-white dark:bg-[#0a0a0a] px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-black dark:text-white mb-16">Experience</h2>
        <div className="space-y-12 relative border-l border-black/10 dark:border-white/10 pl-8 ml-4">
          {jobs.map((job, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-black" />
              <span className="text-blue-500 dark:text-blue-400 text-sm font-bold uppercase tracking-wider">{job.date}</span>
              <h3 className="text-2xl font-bold text-black dark:text-white mt-1">{job.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">{job.co}</p>
              <p className="text-gray-500">{job.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ WHY WORK WITH ME ============
const WhyWorkWithMe = () => {
  const tags = ["User-Centered Thinking", "Clean Visual Systems", "Fast Turnaround", "Detail-Oriented", "Cross-functional Collaboration", "Brand Consistency", "Research-Driven Design", "Reliable Communication", "Pixel-Perfect Execution"];
  return (
    <section className="py-24 px-6 bg-black/[0.02] dark:bg-black overflow-hidden transition-colors duration-300">
      <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl font-bold text-black dark:text-white mb-16 text-center">
        Why Work With Me
      </motion.h2>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {tags.map((t) => (
          <motion.span
            key={t}
            variants={fadeUp}
            whileHover={{ scale: 1.08 }}
            className="px-5 py-3 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-gray-700 dark:text-gray-300 text-sm cursor-default hover:bg-blue-500/10 hover:border-blue-400/30 transition-colors shadow-sm dark:shadow-none"
          >
            {t}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
};

// ============ FAQ ============
const FAQ = () => {
  const [open, setOpen] = useState(null);
  const questions = [
    { q: "What kind of projects do you work on?", a: "Web and mobile UI/UX, branding, packaging, and social media design." },
    { q: "What tools do you use?", a: "Figma for design, along with Photoshop, Illustrator, and Canva for graphics." },
    { q: "Are you open to full-time work?", a: "Yes, I am actively seeking full-time roles and freelance collaborations." },
    { q: "How can I see more of your work?", a: "Check out my portfolio above, or reach out directly via email for a full deck." },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0a0a0a] px-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-black dark:text-white text-center mb-16">Common Questions</h2>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="border border-black/10 dark:border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center p-6 text-black dark:text-white text-left font-bold">
                {item.q} <ChevronDown className={`transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <p className="p-6 pt-0 text-gray-600 dark:text-gray-400">{item.a}</p>
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

// ============ CONTACT ============
const Contact = () => (
  <section id="contact" className="py-24 bg-black/[0.02] dark:bg-black px-6 transition-colors duration-300">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
      <div>
        <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-8 tracking-tighter">Let's Create <br /> <span className="text-blue-600 dark:text-blue-500">Together</span></h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md">
          Feel free to reach out if you have a project in mind or just want to say hi — I'm open to new opportunities.
        </p>
        <div className="space-y-4 text-black dark:text-white">
          <a href="mailto:faizkhanofficial2001@gmail.com" className="flex items-center gap-4 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
            <Mail className="text-blue-500" /> faizkhanofficial2001@gmail.com
          </a>
          <div className="flex items-center gap-4">
            <Phone className="text-blue-500" /> +91 8640043135
          </div>
        </div>
      </div>

      <form className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-black/10 dark:border-white/10 space-y-6 shadow-sm dark:shadow-none">
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Name" className="bg-transparent border-b border-black/20 dark:border-white/20 py-4 outline-none focus:border-blue-500 transition-colors text-black dark:text-white" />
          <input placeholder="Email" className="bg-transparent border-b border-black/20 dark:border-white/20 py-4 outline-none focus:border-blue-500 transition-colors text-black dark:text-white" />
        </div>
        <textarea placeholder="Message" rows="4" className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 outline-none focus:border-blue-500 transition-colors text-black dark:text-white" />
        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl hover:bg-blue-500 hover:text-white transition-all uppercase tracking-widest text-sm">
          Send Message
        </motion.button>
      </form>
    </div>
  </section>
);

// ============ APP ============
function AppContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-white dark:bg-[#0a0a0a] selection:bg-blue-500/30 selection:text-blue-200 transition-colors duration-300">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-[100] origin-left" style={{ scaleX }} />
      <Navbar />
      <Hero />
      <TextMarquee />
      <ToolsStrip />
      <HelloIntro />
      <ProcessSteps />
      <Testimonials />
      <Portfolio />
      <About />
      <Skills />
      <Experience />
      <WhyWorkWithMe />
      <FAQ />
      <Contact />

      <footer className="py-12 border-t border-black/5 dark:border-white/5 text-center text-gray-500 dark:text-gray-600 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://linkedin.com/in/faizkhan-099765255" target="_blank" rel="noopener noreferrer"><Linkedin className="hover:text-black dark:hover:text-white cursor-pointer" /></a>
          <a href="#"><ExternalLink className="hover:text-black dark:hover:text-white cursor-pointer" /></a>
          <a href="#"><Instagram className="hover:text-black dark:hover:text-white cursor-pointer" /></a>
        </div>
        <p>© 2026 Faiz Khan. Made with Precision.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

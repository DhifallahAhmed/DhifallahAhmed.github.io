import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// PS2-Themed Portfolio — single-file React component
// TailwindCSS required in the host (the canvas has it). No external assets.
// Controls:
//  X: Pay Respect  |  O: Contact  |  []: Toggle Projects Grid  |  Δ: Toggle Skills  |  Enter: Start/Pause  |  Esc: Back/Home
//  Tips buttons are clickable on screen as well.

const ps2Blue = "from-[#0b254a] via-[#091a33] to-[#030812]";
const glowBlue = "shadow-[0_0_40px_rgba(0,162,255,0.35)]";

const particles = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  dur: 12 + Math.random() * 20,
}));

const projectsSeed = [

  {
    title: "Incident Management Web Application",
    subtitle: "Spring Boot + Angular + SonarQube",
    desc:
      "E-constat incident management system with responsive UI, comprehensive unit tests, Docker containerization, and code quality assurance via SonarQube.",
    tags: ["Spring Boot", "Angular", "Docker", "SonarQube", "Testing"],
    link: "#incident-management",
  },
  {
    title: "DevOps CI/CD Pipeline",
    subtitle: "Spring Boot + Svelte + Jenkins",
    desc:
      "Automated CI/CD pipeline with Maven, SonarQube, and Jenkins. Containerized deployment using Docker and Docker Compose with comprehensive monitoring.",
    tags: ["CI/CD", "Jenkins", "Docker", "Maven", "Monitoring"],
    link: "#devops",
  },
  {
    title: "FullStack JS Application",
    subtitle: "Node.js + Express + React + MongoDB",
    desc:
      "Web platform connecting clubs and users with event management, secure payment processing, and real-time chatbot support.",
    tags: ["Node.js", "Express", "React", "MongoDB", "Payment Integration"],
    link: "#fullstack-js",
  },
];

const skillsSeed = [
  "Java", "Angular", "Spring Boot", "React", "Svelte 5", "TypeScript",
  "Node.js", "Express", "MongoDB", "PostgreSQL", "Redis", "Docker",
  "Jenkins", "Maven", "SonarQube", "WebSocket", "REST APIs", "JWT",
  "HTML", "CSS", "SQL", "Git", "Linux", "Kubernetes",
];

function Scanlines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
      aria-hidden
    >
      <div
        className="h-full w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 2px, transparent 4px)",
        }}
      />
    </div>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white/30 blur-[1px]"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: ["0%", "-30%", "0%"],
            x: ["0%", "10%", "0%"],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Ribbon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-gradient-to-b ${ps2Blue} p-6 md:p-10 ${glowBlue}`}
    >
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#0ea5e9]/20 via-transparent to-[#22d3ee]/20 blur-xl" />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

function ControllerHUD({ onCmd }: { onCmd: (cmd: string) => void }) {
  const Btn = ({ label, imgSrc, cmd }: { label: string; imgSrc: string; cmd: string }) => (
    <button
      onClick={() => onCmd(cmd)}
      className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur hover:bg-white/10 active:scale-95 transition"
    >
      <div className="inline-grid place-items-center h-8 w-8 rounded-full border border-white/20 bg-black/60 p-1">
        <img
          src={imgSrc}
          alt=""
          className="h-6 w-6 object-contain filter brightness-90 group-hover:brightness-110 transition-all"
        />
      </div>
      <span className="text-sm text-white/80 group-hover:text-white">{label}</span>
    </button>
  );

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-3 py-3 backdrop-blur">
        <Btn label="Press X to Pay Respect" imgSrc="/images/x.png" cmd="respect" />
        <Btn label="Press O to Contact" imgSrc="/images/o.png" cmd="contact" />
        <Btn label="Press [] for Projects" imgSrc="/images/square.png" cmd="projects" />
        <Btn label="Press Δ for Skills" imgSrc="/images/triangle.png" cmd="skills" />
        <Btn label="Press START to Pause" imgSrc="/images/start.png" cmd="pause" />
        <Btn label="Press SELECT to Home" imgSrc="/images/select.png" cmd="home" />
      </div>
    </div>
  );
}

function NeonTitle() {
  return (
    <div className="text-center">
      <div className="font-mono text-xs uppercase tracking-[0.6em] text-white/60">Software Engineer Portfolio</div>
      <h1 className="mt-3 text-3xl md:text-6xl font-black tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-400 to-blue-500 drop-shadow-[0_0_10px_rgba(56,189,248,0.45)]">
        AHMED DHIFALLAH
      </h1>
      <p className="mt-3 text-white/60">Full‑Stack Engineer • Spring Boot • Svelte • Angular • DevOps</p>
    </div>
  );
}

function MemoryBlock({ p }: { p: (typeof projectsSeed)[number] }) {
  return (
    <a
      href={p.link}
      className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition hover:scale-[1.02] hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]"
    >
      <div>
        <div className="text-xs text-cyan-300/80">{p.subtitle}</div>
        <div className="mt-1 text-lg font-semibold tracking-wide text-white">{p.title}</div>
        <p className="mt-2 text-sm text-white/70">{p.desc}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-cyan-200"
          >
            {t}
          </span>
        ))}
      </div>
      <span className="pointer-events-none absolute right-3 top-3 rounded-md border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] text-white/50">MEMORY CARD</span>
    </a>
  );
}

function SkillsGrid({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((s) => (
        <div key={s} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
          {s}
        </div>
      ))}
    </div>
  );
}

function PS2IntroVideo({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canSkip, setCanSkip] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleComplete = () => {
    setIsExiting(true);
    // Add a small delay for the fade-out animation
    setTimeout(() => onComplete(), 500);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => handleComplete();
    const handleVideoStart = () => {
      // Allow skipping after 2 seconds
      setTimeout(() => setCanSkip(true), 2000);
    };

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('loadeddata', handleVideoStart);

    // Auto-play the video
    video.play().catch(console.error);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('loadeddata', handleVideoStart);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (canSkip && (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape')) {
        handleComplete();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canSkip]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        playsInline
        autoPlay
        muted
      >
        <source src="/images/ps2-start.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {canSkip && !isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm text-center"
        >
          <div className="bg-black/50 backdrop-blur rounded-lg px-4 py-2">
            Press ENTER, SPACE, or ESC to skip
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function PS2Portfolio() {
  const [showIntro, setShowIntro] = useState(true);
  const [section, setSection] = useState<"home" | "projects" | "skills" | "contact" | "paused">("home");
  const [respects, setRespects] = useState(0);
  const [blink, setBlink] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const footerTips = useMemo(
    () => (
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-white/50">
        <div className="flex items-center gap-2">
          <img src="/images/x.png" alt="X" className="h-4 w-4 object-contain opacity-70" />
          <span>Respect</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="/images/o.png" alt="O" className="h-4 w-4 object-contain opacity-70" />
          <span>Contact</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="/images/square.png" alt="Square" className="h-4 w-4 object-contain opacity-70" />
          <span>Projects</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="/images/triangle.png" alt="Triangle" className="h-4 w-4 object-contain opacity-70" />
          <span>Skills</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="/images/start.png" alt="START" className="h-4 w-4 object-contain opacity-70" />
          <span>Pause</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="/images/select.png" alt="SELECT" className="h-4 w-4 object-contain opacity-70" />
          <span>Home</span>
        </div>
      </div>
    ),
    []
  );

  // loop a subtle synth pad (generated via JS, here we just keep placeholder element for future extensions)
  useEffect(() => {
    const int = setInterval(() => setBlink((b) => !b), 900);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "x") return doCmd("respect");
      if (key === "o") return doCmd("contact");
      if (key === "[" || key === "]" || key === "p") return doCmd("projects");
      if (key === "q" || key === "t" || key === "y") return doCmd("skills"); // triangle-esque
      if (e.key === "Enter") return doCmd("pause");
      if (e.key === "Escape") return doCmd("home");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  function doCmd(cmd: string) {
    if (cmd === "respect") setRespects((r) => r + 1);
    if (cmd === "contact") setSection("contact");
    if (cmd === "projects") setSection("projects");
    if (cmd === "skills") setSection("skills");
    if (cmd === "pause") setSection((s) => (s === "paused" ? "home" : "paused"));
    if (cmd === "home") setSection("home");
  }

  // Show intro video first, then the main portfolio
  if (showIntro) {
    return <PS2IntroVideo onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className={`relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b ${ps2Blue} text-white`}>
      <FloatingParticles />
      <Scanlines />

      {/* HUD Controller */}
      <ControllerHUD onCmd={doCmd} />

      {/* Top PS2 bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 md:py-10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md border border-cyan-400/20 bg-gradient-to-br from-cyan-500/30 to-blue-700/20 shadow-inner" />
          <div className="font-mono text-xs uppercase tracking-[0.35em] text-white/60">PS2 · PORTFOLIO OS</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-white/60">START ⏎ to {section === "paused" ? "Resume" : "Pause"}</div>
          <div className="text-[10px] text-white/40">SELECT Esc to Home</div>
        </div>
      </div>

      <main className="relative z-10 px-4 pb-36">
        <Ribbon>
          <NeonTitle />

          {/* Home / Pause overlay */}
          <AnimatePresence>
            {section === "paused" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 grid place-items-center rounded-2xl bg-black/70 backdrop-blur-sm"
              >
                <div className="text-center">
                  <div className="text-sm text-white/60">Game Paused</div>
                  <div className="mt-2 text-3xl font-bold tracking-widest">PAUSE MENU</div>
                  <div className="mt-4 text-white/70">Press START to resume • SELECT to Home</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dynamic sections */}
          <div className="mt-8 grid gap-8">
            {section === "home" && (
              <div className="grid gap-8">
                <div className="mx-auto max-w-2xl text-center text-white/80">
                  I'm a junior software engineer who enjoys full-stack development with expertise in both backend and frontend technologies. I build fast, reliable, and scalable applications focused on delivering high-quality software.
                  <span className="ml-1 text-cyan-300 inline-flex items-center gap-1">
                    Press <img src="/images/square.png" alt="Square" className="h-4 w-4 object-contain" /> to browse projects
                  </span>,
                  <span className="ml-1 text-cyan-300 inline-flex items-center gap-1">
                    <img src="/images/triangle.png" alt="Triangle" className="h-4 w-4 object-contain" /> for skills
                  </span>, or
                  <span className="ml-1 text-cyan-300 inline-flex items-center gap-1">
                    <img src="/images/o.png" alt="O" className="h-4 w-4 object-contain" /> to contact
                  </span>.
                </div>

                <div className="flex items-center justify-center gap-3 text-sm text-white/70">
                  <span>RESPECTS PAID:</span>
                  <span className="rounded-md border border-white/10 bg-black/40 px-2 py-0.5 font-mono">{respects}</span>
                  <span className={`ml-2 inline-flex items-center gap-1 ${blink ? "opacity-80" : "opacity-30"}`}>
                    Press <img src="/images/x.png" alt="X" className="h-4 w-4 object-contain" /> to pay respect
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {projectsSeed.slice(0, 2).map((p) => (
                    <MemoryBlock p={p} key={p.title} />
                  ))}
                </div>

                {footerTips}
              </div>
            )}

            {section === "projects" && (
              <div>
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <div className="text-xs text-cyan-300/80">Library</div>
                    <h2 className="text-2xl font-bold tracking-wider">MEMORY CARDS</h2>
                  </div>
                  <div className="text-sm text-white/70">[{projectsSeed.length}] installed</div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {projectsSeed.map((p) => (
                    <MemoryBlock p={p} key={p.title} />
                  ))}
                </div>
                {footerTips}
              </div>
            )}

            {section === "skills" && (
              <div>
                <div className="mb-4">
                  <div className="text-xs text-cyan-300/80">Character</div>
                  <h2 className="text-2xl font-bold tracking-wider">SKILL TREE</h2>
                </div>
                <SkillsGrid items={skillsSeed} />
                {footerTips}
              </div>
            )}

            {section === "contact" && (
              <div className="mx-auto max-w-2xl">
                <div className="mb-6">
                  <div className="text-xs text-cyan-300/80">Link Cable</div>
                  <h2 className="text-2xl font-bold tracking-wider">CONTACT AHMED</h2>
                  <div className="mt-4 space-y-2 text-sm text-white/70">
                    <div>📧 <a href="mailto:Dhifallahahmed92@gmail.com" className="text-cyan-300 hover:text-cyan-200">Dhifallahahmed92@gmail.com</a></div>
                    <div>📱 <a href="tel:+21627636653" className="text-cyan-300 hover:text-cyan-200">+216 27 636 653</a></div>
                    <div>📍 Ariana, Tunisia</div>
                    <div>💼 <a href="https://linkedin.com/in/ahmed-dhifallah-077313180" className="text-cyan-300 hover:text-cyan-200">LinkedIn</a> • <a href="https://github.com/DhifallahAhmed" className="text-cyan-300 hover:text-cyan-200">GitHub</a></div>
                  </div>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget as HTMLFormElement;
                    const data = Object.fromEntries(new FormData(form).entries());
                    alert(`Message sent!\\nName: ${data.name}\\nEmail: ${data.email}`);
                    form.reset();
                  }}
                  className="grid gap-4"
                >
                  <label className="grid gap-1">
                    <span className="text-sm text-white/70">Name</span>
                    <input name="name" required className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none ring-0 focus:border-cyan-400/40" />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm text-white/70">Email</span>
                    <input name="email" type="email" required className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none ring-0 focus:border-cyan-400/40" />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm text-white/70">Message</span>
                    <textarea name="message" rows={5} required className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none ring-0 focus:border-cyan-400/40" />
                  </label>
                  <div className="flex items-center justify-between">
                    <button className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold tracking-wide text-cyan-100 hover:bg-cyan-400/20">
                      SEND (O)
                    </button>
                    <div className="text-xs text-white/60">SELECT (Esc) to go Home</div>
                  </div>
                </form>
                {footerTips}
              </div>
            )}
          </div>
        </Ribbon>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mx-auto my-8 max-w-6xl px-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Player 1 — Software Engineer. Not affiliated with Sony. PS2 vibes only.
      </footer>

      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/10" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_400px_at_50%_-20%,rgba(56,189,248,0.15),transparent_60%)]" aria-hidden />

      {/* (Optional) audio element placeholder */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}

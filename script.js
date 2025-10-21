// PS2 Portfolio JavaScript

// Data
const projectsData = [
    {
        title: "Incident Management Web Application",
        subtitle: "Spring Boot + Angular + SonarQube",
        desc: "E-constat incident management system with responsive UI, comprehensive unit tests, Docker containerization, and code quality assurance via SonarQube.",
        tags: ["Spring Boot", "Angular", "Docker", "SonarQube", "Testing"],
        link: "#incident-management"
    },
    {
        title: "DevOps CI/CD Pipeline",
        subtitle: "Spring Boot + Svelte + Jenkins",
        desc: "Automated CI/CD pipeline with Maven, SonarQube, and Jenkins. Containerized deployment using Docker and Docker Compose with comprehensive monitoring.",
        tags: ["CI/CD", "Jenkins", "Docker", "Maven", "Monitoring"],
        link: "#devops"
    },
    {
        title: "FullStack JS Application",
        subtitle: "Node.js + Express + React + MongoDB",
        desc: "Web platform connecting clubs and users with event management, secure payment processing, and real-time chatbot support.",
        tags: ["Node.js", "Express", "React", "MongoDB", "Payment Integration"],
        link: "#fullstack-js"
    }
];

const skillsData = [
    "Java", "Angular", "Spring Boot", "React", "Svelte 5", "TypeScript",
    "Node.js", "Express", "MongoDB", "PostgreSQL", "Redis", "Docker",
    "Jenkins", "Maven", "SonarQube", "WebSocket", "REST APIs", "JWT",
    "HTML", "CSS", "SQL", "Git", "Linux", "Kubernetes"
];

// State
let currentSection = "home";
let respects = 0;
let blinkInterval;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initIntro();
    setupEventListeners();
    createParticles();
    startBlinking();
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Intro Video
function initIntro() {
    const introScreen = document.getElementById('intro-screen');
    const introVideo = document.getElementById('intro-video');
    const skipText = document.getElementById('skip-text');
    let canSkip = false;

    // Show skip text after 2 seconds
    setTimeout(() => {
        canSkip = true;
        skipText.classList.remove('hidden');
    }, 2000);

    // Play video
    introVideo.play().catch(console.error);

    // Video ended
    introVideo.addEventListener('ended', () => {
        completeIntro();
    });

    // Skip functionality
    const skipIntro = (e) => {
        if (canSkip && (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape')) {
            completeIntro();
        }
    };

    window.addEventListener('keydown', skipIntro);

    function completeIntro() {
        introScreen.classList.add('fade-out');
        setTimeout(() => {
            introScreen.style.display = 'none';
            document.getElementById('main-portfolio').classList.remove('hidden');
            renderSection('home');
        }, 500);
        window.removeEventListener('keydown', skipIntro);
    }
}

// Create Floating Particles
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 36;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('span');
        particle.className = 'particle';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = 12 + Math.random() * 20;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(particle);
    }

    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
                opacity: 0.1;
            }
            50% {
                transform: translate(10%, -30%);
                opacity: 0.6;
            }
        }
    `;
    document.head.appendChild(style);
}

// Blinking Animation
function startBlinking() {
    blinkInterval = setInterval(() => {
        const blinkElement = document.querySelector('.blink');
        if (blinkElement) {
            blinkElement.style.opacity = blinkElement.style.opacity === '0.3' ? '0.8' : '0.3';
        }
    }, 900);
}

// Event Listeners
function setupEventListeners() {
    // HUD Buttons
    document.querySelectorAll('.hud-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            executeCommand(btn.dataset.cmd);
        });
    });

    // Keyboard Controls
    window.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        
        if (key === 'x') executeCommand('respect');
        else if (key === 'o') executeCommand('contact');
        else if (key === '[' || key === ']' || key === 'p') executeCommand('projects');
        else if (key === 'q' || key === 't' || key === 'y') executeCommand('skills');
        else if (e.key === 'Enter') executeCommand('pause');
        else if (e.key === 'Escape') executeCommand('home');
    });
}

// Execute Command
function executeCommand(cmd) {
    if (cmd === 'respect') {
        respects++;
        if (currentSection === 'home') {
            document.getElementById('respects-count').textContent = respects;
        }
    } else if (cmd === 'pause') {
        if (currentSection === 'paused') {
            currentSection = 'home';
            document.getElementById('pause-overlay').classList.add('hidden');
            document.getElementById('pause-text').textContent = 'START ⏎ to Pause';
        } else {
            currentSection = 'paused';
            document.getElementById('pause-overlay').classList.remove('hidden');
            document.getElementById('pause-text').textContent = 'START ⏎ to Resume';
        }
    } else {
        currentSection = cmd;
        renderSection(cmd);
    }
}

// Render Section
function renderSection(section) {
    const contentArea = document.getElementById('content-area');
    
    if (section === 'home') {
        contentArea.innerHTML = getHomeHTML();
    } else if (section === 'projects') {
        contentArea.innerHTML = getProjectsHTML();
    } else if (section === 'skills') {
        contentArea.innerHTML = getSkillsHTML();
    } else if (section === 'contact') {
        contentArea.innerHTML = getContactHTML();
        setupContactForm();
    }
}

// HTML Templates
function getHomeHTML() {
    return `
        <div class="grid gap-8">
            <div class="mx-auto max-w-2xl text-center text-white/80">
                I'm a junior software engineer who enjoys full-stack development with expertise in both backend and frontend technologies. I build fast, reliable, and scalable applications focused on delivering high-quality software.
                <span class="ml-1 text-cyan-300 inline-flex items-center gap-1">
                    Press <img src="images/square.png" alt="Square" class="h-4 w-4 object-contain inline"> to browse projects
                </span>,
                <span class="ml-1 text-cyan-300 inline-flex items-center gap-1">
                    <img src="images/triangle.png" alt="Triangle" class="h-4 w-4 object-contain inline"> for skills
                </span>, or
                <span class="ml-1 text-cyan-300 inline-flex items-center gap-1">
                    <img src="images/o.png" alt="O" class="h-4 w-4 object-contain inline"> to contact
                </span>.
            </div>

            <div class="flex items-center justify-center gap-3 text-sm text-white/70">
                <span>RESPECTS PAID:</span>
                <span class="rounded-md border border-white/10 bg-black/40 px-2 py-0.5 font-mono" id="respects-count">${respects}</span>
                <span class="ml-2 inline-flex items-center gap-1 blink" style="opacity: 0.8">
                    Press <img src="images/x.png" alt="X" class="h-4 w-4 object-contain inline"> to pay respect
                </span>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                ${projectsData.slice(0, 2).map(p => getMemoryCardHTML(p)).join('')}
            </div>

            ${getFooterTipsHTML()}
        </div>
    `;
}

function getProjectsHTML() {
    return `
        <div>
            <div class="mb-4 flex items-end justify-between">
                <div>
                    <div class="text-xs text-cyan-300/80">Library</div>
                    <h2 class="text-2xl font-bold tracking-wider">MEMORY CARDS</h2>
                </div>
                <div class="text-sm text-white/70">[${projectsData.length}] installed</div>
            </div>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                ${projectsData.map(p => getMemoryCardHTML(p)).join('')}
            </div>
            ${getFooterTipsHTML()}
        </div>
    `;
}

function getSkillsHTML() {
    return `
        <div>
            <div class="mb-4">
                <div class="text-xs text-cyan-300/80">Character</div>
                <h2 class="text-2xl font-bold tracking-wider">SKILL TREE</h2>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                ${skillsData.map(s => `<div class="skill-item">${s}</div>`).join('')}
            </div>
            ${getFooterTipsHTML()}
        </div>
    `;
}

function getContactHTML() {
    return `
        <div class="mx-auto max-w-2xl">
            <div class="mb-6">
                <div class="text-xs text-cyan-300/80">Link Cable</div>
                <h2 class="text-2xl font-bold tracking-wider">CONTACT AHMED</h2>
                <div class="mt-4 space-y-2 text-sm text-white/70">
                    <div>📧 <a href="mailto:Dhifallahahmed92@gmail.com" class="text-cyan-300 hover:text-cyan-200">Dhifallahahmed92@gmail.com</a></div>
                    <div>📱 <a href="tel:+21627636653" class="text-cyan-300 hover:text-cyan-200">+216 27 636 653</a></div>
                    <div>📍 Ariana, Tunisia</div>
                    <div>💼 <a href="https://linkedin.com/in/ahmed-dhifallah-077313180" class="text-cyan-300 hover:text-cyan-200">LinkedIn</a> • <a href="https://github.com/DhifallahAhmed" class="text-cyan-300 hover:text-cyan-200">GitHub</a></div>
                </div>
            </div>
            <form id="contact-form" class="grid gap-4">
                <label class="grid gap-1">
                    <span class="text-sm text-white/70">Name</span>
                    <input name="name" required class="rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none ring-0 focus:border-cyan-400/40">
                </label>
                <label class="grid gap-1">
                    <span class="text-sm text-white/70">Email</span>
                    <input name="email" type="email" required class="rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none ring-0 focus:border-cyan-400/40">
                </label>
                <label class="grid gap-1">
                    <span class="text-sm text-white/70">Message</span>
                    <textarea name="message" rows="5" required class="rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none ring-0 focus:border-cyan-400/40"></textarea>
                </label>
                <div class="flex items-center justify-between">
                    <button type="submit" class="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold tracking-wide text-cyan-100 hover:bg-cyan-400/20">
                        SEND (O)
                    </button>
                    <div class="text-xs text-white/60">SELECT (Esc) to go Home</div>
                </div>
            </form>
            ${getFooterTipsHTML()}
        </div>
    `;
}

function getMemoryCardHTML(project) {
    return `
        <a href="${project.link}" class="memory-card">
            <div>
                <div class="text-xs text-cyan-300/80">${project.subtitle}</div>
                <div class="mt-1 text-lg font-semibold tracking-wide text-white">${project.title}</div>
                <p class="mt-2 text-sm text-white/70">${project.desc}</p>
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
                ${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
            <span class="memory-card-badge">MEMORY CARD</span>
        </a>
    `;
}

function getFooterTipsHTML() {
    return `
        <div class="footer-tips">
            <div class="footer-tip-item">
                <img src="images/x.png" alt="X">
                <span>Press X</span>
            </div>
            <div class="footer-tip-item">
                <img src="images/o.png" alt="O">
                <span>Press O</span>
            </div>
            <div class="footer-tip-item">
                <img src="images/square.png" alt="Square">
                <span>Press []</span>
            </div>
            <div class="footer-tip-item">
                <img src="images/triangle.png" alt="Triangle">
                <span>Press Δ</span>
            </div>
            <div class="footer-tip-item">
                <img src="images/start.png" alt="START">
                <span>Press START</span>
            </div>
            <div class="footer-tip-item">
                <img src="images/select.png" alt="SELECT">
                <span>Press SELECT</span>
            </div>
        </div>
    `;
}

// Setup Contact Form
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            alert(`Message sent!\nName: ${data.name}\nEmail: ${data.email}`);
            form.reset();
        });
    }
}
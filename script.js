const projectsData = [
    
    {
        title: "Secure Todo App",
        subtitle: "Spring Boot + Svelte + DevSecOps",
        desc: "Full-stack application demonstrating modern DevSecOps practices with Spring Boot backend, Svelte frontend, MongoDB/H2 database, Docker containerization, GitHub Actions CI/CD, Trivy vulnerability scanning, OWASP security, and ELK stack for logging & monitoring.",
        tags: ["Spring Boot", "Svelte", "MongoDB", "Docker", "GitHub Actions", "Trivy", "OWASP", "ELK Stack"],
        link: "#secure-todo"
    },
    {
        title: "Plumber Web Application",
        subtitle: "Svelte + Supabase + Resend + Paypal",
        desc: "Web application for a plumber in France. The main features include: showcase, contact and quotation request with email confirmation and payment.",
        tags: ["Svelte", "Supabase", "Resend", "Paypal"],
        link: "#plumber"
    },
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
    },
       
];

const skillsData = {
    "Frontend": [
        "Angular", "React", "Svelte 5", "HTML", "CSS", "Flutter"
    ],
    "Backend": [
        "Spring Boot", "Express", "REST APIs", "WebSocket", "JWT"
    ],
    "Database": [
        "MongoDB", "PostgreSQL", "Redis", "MySQL"
    ],
    "DevOps": [
        "Docker", "Jenkins", "Maven", "SonarQube", "Kubernetes", "Git", "Linux", "Github Actions"
    ]
};

let currentSection = "home";
let respects = 0;
let blinkInterval;

document.addEventListener('DOMContentLoaded', () => {
    initCDScreen();
    setupEventListeners();
    createParticles();
    startBlinking();
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

function initCDScreen() {
    const cdScreen = document.getElementById('cd-screen');
    const insertBtn = document.getElementById('insert-cd-btn');
    const cdDisc = document.getElementById('cd-disc');

    cdDisc.style.animation = 'spin 3s linear infinite';

    insertBtn.addEventListener('click', () => {
        insertCD();
    });

    window.addEventListener('keydown', (e) => {
        if (cdScreen.style.display !== 'none' && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            insertCD();
        }
    });

    function insertCD() {
        cdDisc.style.animation = 'insertCD 0.8s ease-in forwards';
        insertBtn.disabled = true;
        insertBtn.style.opacity = '0.5';

        setTimeout(() => {
            cdScreen.style.display = 'none';
            initIntro();
        }, 800);
    }
}

function initIntro() {
    const introScreen = document.getElementById('intro-screen');
    const introVideo = document.getElementById('intro-video');
    const skipText = document.getElementById('skip-text');
    let canSkip = false;

    introScreen.classList.remove('hidden');

    setTimeout(() => {
        canSkip = true;
        skipText.classList.remove('hidden');
    }, 2000);

    introVideo.play().catch(console.error);

    introVideo.addEventListener('ended', () => {
        completeIntro();
    });

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

function startBlinking() {
    blinkInterval = setInterval(() => {
        const blinkElement = document.querySelector('.blink');
        if (blinkElement) {
            blinkElement.style.opacity = blinkElement.style.opacity === '0.3' ? '0.8' : '0.3';
        }
    }, 900);
}

function setupEventListeners() {
    document.querySelectorAll('.hud-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            executeCommand(btn.dataset.cmd);
        });
    });

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
    }
}

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
            <div class="grid gap-6">
                ${Object.entries(skillsData).map(([category, skills]) => `
                    <div class="skill-category">
                        <h3 class="text-lg font-semibold text-cyan-300/90 mb-3 tracking-wide">${category}</h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            ${skills.map(s => `<div class="skill-item">${s}</div>`).join('')}
                        </div>
                    </div>
                `).join('')}
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
            </div>

            <div class="contact-info-card">
                <div class="space-y-4">
                    <div class="contact-item">
                        <div class="contact-icon">📧</div>
                        <div>
                            <div class="text-xs text-white/50 uppercase tracking-wide mb-1">Email</div>
                            <a href="mailto:Dhifallahahmed92@gmail.com" class="text-cyan-300 hover:text-cyan-200 transition-colors">Dhifallahahmed92@gmail.com</a>
                        </div>
                    </div>

                    <div class="contact-item">
                        <div class="contact-icon">📱</div>
                        <div>
                            <div class="text-xs text-white/50 uppercase tracking-wide mb-1">Phone</div>
                            <a href="tel:+21627636631" class="text-cyan-300 hover:text-cyan-200 transition-colors">+216 27 636 631</a>
                        </div>
                    </div>

                    <div class="contact-item">
                        <div class="contact-icon">📍</div>
                        <div>
                            <div class="text-xs text-white/50 uppercase tracking-wide mb-1">Location</div>
                            <div class="text-white/70">Ariana, Tunisia</div>
                        </div>
                    </div>

                    <div class="contact-item">
                        <div class="contact-icon">💼</div>
                        <div>
                            <div class="text-xs text-white/50 uppercase tracking-wide mb-1">Social</div>
                            <div class="flex gap-4">
                                <a href="https://linkedin.com/in/ahmed-dhifallah-077313180" target="_blank" class="text-cyan-300 hover:text-cyan-200 transition-colors">LinkedIn</a>
                                <a href="https://github.com/DhifallahAhmed" target="_blank" class="text-cyan-300 hover:text-cyan-200 transition-colors">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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


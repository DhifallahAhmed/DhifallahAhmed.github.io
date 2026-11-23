/* =========================================================
   PS2-inspired portfolio — interactions
   - Boot sequence (disc insert → intro video), once per session
   - Controller shortcuts (X / □ / △ / O / START / SELECT)
   - Animated "data tower" background in the hero
   - Project filters, active nav, reveal-on-scroll
   ========================================================= */

(() => {
    'use strict';

    document.documentElement.classList.add('js');

    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

    const BOOT_KEY = 'ps2-portfolio-booted';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const body = document.body;
    const cdScreen = $('#cd-screen');
    const cdDisc = $('#cd-disc');
    const introScreen = $('#intro-screen');
    const introVideo = $('#intro-video');
    const pauseOverlay = $('#pause-overlay');

    let booting = true;
    let videoSkippable = false;
    let respects = 0;

    /* ---------------- Boot sequence ---------------- */
    function shouldSkipBoot() {
        let seen = false;
        try { seen = sessionStorage.getItem(BOOT_KEY) === '1'; } catch (_) { /* storage blocked */ }
        // Deep links (e.g. /#projects shared by a recruiter) go straight to content.
        const deepLink = location.hash && location.hash !== '#home' && location.hash !== '#top';
        return seen || deepLink || new URLSearchParams(location.search).has('skip');
    }

    function startBoot() {
        booting = true;
        videoSkippable = false;
        body.classList.add('is-booting');
        cdDisc.classList.remove('is-inserting');
        $('#insert-cd-btn').disabled = false;
        cdScreen.classList.remove('is-hidden', 'fade-out');
        introScreen.classList.add('is-hidden');
        introScreen.classList.remove('fade-out');
        $('#insert-cd-btn').focus();
    }

    function insertDisc() {
        if (!booting || cdDisc.classList.contains('is-inserting')) return;
        $('#insert-cd-btn').disabled = true;
        cdDisc.classList.add('is-inserting');
        setTimeout(playIntro, reducedMotion ? 0 : 800);
    }

    function playIntro() {
        cdScreen.classList.add('is-hidden');
        introScreen.classList.remove('is-hidden');
        introVideo.currentTime = 0;
        introVideo.play().catch(finishBoot); // if the video can't play, go straight in
        setTimeout(() => { videoSkippable = true; }, 1000);
    }

    function finishBoot() {
        if (!booting) return;
        booting = false;
        introVideo.pause();
        try { sessionStorage.setItem(BOOT_KEY, '1'); } catch (_) { /* ignore */ }

        [cdScreen, introScreen].forEach(el => el.classList.add('fade-out'));
        setTimeout(() => {
            cdScreen.classList.add('is-hidden');
            introScreen.classList.add('is-hidden');
        }, 500);
        body.classList.remove('is-booting');
        towers.start();
    }

    $('#insert-cd-btn').addEventListener('click', insertDisc);
    $('#skip-boot-btn').addEventListener('click', finishBoot);
    $('#skip-video-btn').addEventListener('click', finishBoot);
    introVideo.addEventListener('ended', finishBoot);

    /* ---------------- Navigation helpers ---------------- */
    function goTo(id) {
        const target = document.getElementById(id);
        if (!target) return;
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
        history.replaceState(null, '', `#${id}`);
    }

    function openMenu() {
        pauseOverlay.hidden = false;
        $('a, button', pauseOverlay).focus();
    }
    function closeMenu() { pauseOverlay.hidden = true; }
    const menuOpen = () => !pauseOverlay.hidden;

    pauseOverlay.addEventListener('click', (e) => {
        if (e.target === pauseOverlay || e.target.closest('[data-close]')) closeMenu();
    });
    $('#replay-intro').addEventListener('click', () => {
        closeMenu();
        try { sessionStorage.removeItem(BOOT_KEY); } catch (_) { /* ignore */ }
        startBoot();
    });

    // Mobile nav
    const navToggle = $('#nav-toggle');
    const navLinks = $('#nav-links');
    navToggle.addEventListener('click', () => {
        const open = navToggle.getAttribute('aria-expanded') !== 'true';
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        navLinks.classList.toggle('is-open', open);
    });
    navLinks.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            navToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('is-open');
        }
    });

    /* ---------------- Keyboard: controller mapping ---------------- */
    const isInteractive = (el) => el && el !== body && el.matches('a, button, input, textarea, select, [tabindex], video');

    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const key = e.key.toLowerCase();

        if (booting) {
            const onCd = !cdScreen.classList.contains('is-hidden');
            const activate = key === 'enter' || key === ' ';
            // Enter/Space on a focused button keeps its native behaviour (Insert or Skip).
            if (onCd && (key === 'x' || (activate && !isInteractive(document.activeElement)))) {
                e.preventDefault(); insertDisc();
            } else if (onCd && key === 'escape') {
                finishBoot();
            } else if (!onCd && videoSkippable && (key === 'enter' || key === ' ' || key === 'escape')) {
                e.preventDefault(); finishBoot();
            }
            return;
        }

        if (key === 'escape') {
            if (menuOpen()) closeMenu(); else runCommand('home'); // SELECT
            return;
        }
        if (key === 'enter') {                               // START
            if (isInteractive(document.activeElement)) return; // let links/buttons activate
            e.preventDefault();
            runCommand('menu');
            return;
        }
        if (menuOpen()) return;

        const map = { x: 'about', p: 'projects', '[': 'projects', ']': 'projects', t: 'skills', o: 'contact' };
        if (map[key]) { runCommand(map[key]); return; }
        if (key === 'f') payRespect();
    });

    /* ---------------- Respects easter egg ---------------- */
    const respectCount = $('#respects-count');
    function payRespect() {
        respects += 1;
        respectCount.textContent = respects;
        respectCount.classList.remove('bump');
        void respectCount.offsetWidth; // restart animation
        respectCount.classList.add('bump');
    }
    $('#respect-btn').addEventListener('click', payRespect);

    /* ---------------- Copy email ---------------- */
    const copyBtn = $('#copy-email');
    copyBtn.addEventListener('click', async () => {
        const label = $('#copy-email-text');
        const email = copyBtn.dataset.email;
        try {
            await navigator.clipboard.writeText(email);
            label.textContent = 'Copied ✓';
        } catch (_) {
            label.textContent = email;
        }
        setTimeout(() => { label.textContent = 'Copy email address'; }, 2200);
    });

    /* ---------------- Project filters ---------------- */
    const cards = $$('#project-grid .card');
    $('#project-count').textContent = cards.length;
    $$('.filter-bar .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            $$('.filter-bar .chip').forEach(c => c.classList.toggle('is-active', c === chip));
            const f = chip.dataset.filter;
            cards.forEach(card => {
                const show = f === 'all' || card.dataset.cat.split(' ').includes(f);
                card.classList.toggle('is-filtered-out', !show);
            });
        });
    });

    /* ---------------- Fixed gamepad navigator ---------------- */
    const pad = $('#pad');
    const padToggle = $('#pad-toggle');
    const PAD_KEY = 'ps2-portfolio-pad';
    const SECTIONS = ['home', 'about', 'projects', 'skills', 'contact'];

    function currentSectionIndex() {
        const mid = window.innerHeight * 0.4;
        let idx = 0;
        SECTIONS.forEach((id, i) => {
            const el = document.getElementById(id);
            if (el && el.getBoundingClientRect().top <= mid) idx = i;
        });
        return idx;
    }

    function setPadCollapsed(collapsed) {
        pad.classList.toggle('is-collapsed', collapsed);
        padToggle.setAttribute('aria-expanded', String(!collapsed));
        padToggle.title = collapsed ? 'Show controller' : 'Hide controller';
        try { localStorage.setItem(PAD_KEY, collapsed ? 'collapsed' : 'open'); } catch (_) { /* ignore */ }
    }
    let savedPad = null;
    try { savedPad = localStorage.getItem(PAD_KEY); } catch (_) { /* ignore */ }
    // Small screens start collapsed so the pad doesn't cover content.
    setPadCollapsed(savedPad ? savedPad === 'collapsed' : window.innerWidth < 640);
    padToggle.addEventListener('click', () => setPadCollapsed(!pad.classList.contains('is-collapsed')));

    function flashPad(cmd) {
        const btn = $(`.pad-btn[data-cmd="${cmd}"]`, pad);
        if (!btn) return;
        btn.classList.add('is-pressed');
        setTimeout(() => btn.classList.remove('is-pressed'), 160);
    }

    function runCommand(cmd) {
        flashPad(cmd);
        if (cmd === 'menu') { menuOpen() ? closeMenu() : openMenu(); return; }
        if (cmd === 'prev' || cmd === 'next') {
            const i = currentSectionIndex() + (cmd === 'next' ? 1 : -1);
            goTo(SECTIONS[Math.max(0, Math.min(SECTIONS.length - 1, i))]);
            return;
        }
        goTo(cmd);
    }

    $$('.pad-btn', pad).forEach(btn => btn.addEventListener('click', () => runCommand(btn.dataset.cmd)));

    /* ---------------- Header, active nav ---------------- */
    const header = $('.site-header');
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const navMap = new Map($$('[data-nav]').map(a => [a.dataset.nav, a]));
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navMap.forEach(a => a.classList.remove('is-active'));
            const link = navMap.get(entry.target.id);
            if (link) link.classList.add('is-active');
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(s => sectionObserver.observe(s));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(el => revealObserver.observe(el));

    $('#current-year').textContent = new Date().getFullYear();

    /* ---------------- Hero background: glowing cube towers ----------------
       A field of translucent blue cube stacks on a perspective floor that
       slowly rise and fall — a nod to the early-2000s console boot screen. */
    const towers = (() => {
        const canvas = $('#tower-canvas');
        const ctx = canvas.getContext('2d');
        const hero = $('#home');
        const COLS = 13, ROWS = 6, DEPTH_STEP = 0.55;
        const S_FAR = 1 / (1 + (ROWS - 1) * DEPTH_STEP);
        let w = 0, h = 0, dpr = 1, raf = 0, running = false, visible = true;
        const field = [];

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                field.push({
                    r, c,
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.25 + Math.random() * 0.45,
                    max: 3 + Math.floor(Math.random() * 7),
                });
            }
        }

        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = canvas.clientWidth; h = canvas.clientHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function draw(t) {
            ctx.clearRect(0, 0, w, h);
            ctx.globalCompositeOperation = 'lighter';

            const horizon = h * 0.42;
            const centerX = w * 0.66;
            const spacing = Math.max(w / 10, 70);
            const cubeBase = Math.max(Math.min(w, 1400) / 34, 16);

            for (const tw of field) {               // rows are drawn far → near
                const depth = 1 + (ROWS - 1 - tw.r) * DEPTH_STEP;
                const s = 1 / depth;
                const x = centerX + (tw.c - (COLS - 1) / 2) * spacing * s;
                const baseY = horizon + (h * 0.94 - horizon) * (s - S_FAR) / (1 - S_FAR);
                const size = cubeBase * s;
                const gap = size * 0.18;

                const wave = 0.5 + 0.5 * Math.sin(t * 0.001 * tw.speed + tw.phase);
                const n = Math.max(1, Math.round(tw.max * wave));
                const fade = 0.25 + 0.75 * s;

                for (let i = 0; i < n; i++) {
                    const y = baseY - (i + 1) * (size + gap);
                    const top = i === n - 1;
                    const a = (top ? 0.55 : 0.16 + 0.05 * (i / n)) * fade;
                    ctx.fillStyle = `rgba(63, 150, 255, ${a})`;
                    ctx.fillRect(x - size / 2, y, size, size);
                    ctx.strokeStyle = `rgba(170, 215, 255, ${(top ? 0.75 : 0.22) * fade})`;
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x - size / 2 + 0.5, y + 0.5, size - 1, size - 1);
                    if (top) {                          // soft glow halo on the top cube
                        const g = ctx.createRadialGradient(x, y + size / 2, 0, x, y + size / 2, size * 2.2);
                        g.addColorStop(0, `rgba(63, 169, 255, ${0.28 * fade})`);
                        g.addColorStop(1, 'rgba(63, 169, 255, 0)');
                        ctx.fillStyle = g;
                        ctx.fillRect(x - size * 2.2, y - size * 1.7, size * 4.4, size * 4.4);
                    }
                }
                // reflection on the floor
                ctx.fillStyle = `rgba(63, 150, 255, ${0.08 * fade})`;
                ctx.fillRect(x - size / 2, baseY + gap, size, size * 0.6);
            }
            ctx.globalCompositeOperation = 'source-over';
        }

        function loop(t) {
            if (!running) return;
            draw(t);
            raf = requestAnimationFrame(loop);
        }

        function update() {
            const shouldRun = visible && !document.hidden && !reducedMotion;
            if (shouldRun && !running) { running = true; raf = requestAnimationFrame(loop); }
            if (!shouldRun && running) { running = false; cancelAnimationFrame(raf); }
        }

        new IntersectionObserver(([e]) => { visible = e.isIntersecting; update(); }).observe(hero);
        document.addEventListener('visibilitychange', update);
        window.addEventListener('resize', () => { resize(); if (!running) draw(performance.now()); });

        return {
            start() {
                resize();
                draw(performance.now());
                update();
            },
        };
    })();

    /* ---------------- Init ---------------- */
    if (shouldSkipBoot()) {
        cdScreen.classList.add('is-hidden');
        finishBoot();
        const id = location.hash.slice(1);
        if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    } else {
        startBoot();
    }
})();

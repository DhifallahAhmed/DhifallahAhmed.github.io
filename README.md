# 🎮 PS2 Portfolio - Ahmed Dhifallah

A nostalgic PlayStation 2-themed portfolio website featuring an interactive CD insertion screen, PS2 intro video, and controller-based navigation.

## ✨ Features

- **🎬 Boot sequence** - Disc-insert screen + PS2-style intro video (plays once per session, skippable, bypassed for deep links like `/#projects`)
- **🧊 PS2 system-menu look** - Boot-screen black/deep blue/white palette, animated glowing cube towers, perspective grid, scanlines, translucent "plastic" cards with neon hover glow
- **📇 Recruiter-friendly layout** - Single scrolling page: sticky nav, About, Projects (with filters), Skills, Contact
- **🎮 On-screen gamepad** - Fixed controller silhouette (bottom-right) with clickable X / □ / △ / O, START, SELECT and D-pad (prev/next section); collapsible, lights up when you use the keyboard shortcuts
- **📱 Responsive & accessible** - Mobile menu, keyboard focus states, `prefers-reduced-motion` support, works without JavaScript
- **⚡ Lightweight** - Plain HTML/CSS/JS, no framework or build step

## 🚀 Live Demo

Visit the portfolio: **https://dhifallahahmed.github.io/**

## 📁 Project Structure

```
├── index.html          # All page content (projects, skills, contact are plain HTML)
├── style.css           # PS2 theme, layout, animations, responsive rules
├── script.js           # Boot sequence, shortcuts, tower background, filters
├── images/             # PS2 button icons (x, o, square, triangle, start, select)
└── videos/
    └── ps2-start.mp4   # Intro video
```

## 🎮 Controls

| Key | Action |
|---|---|
| `X` | About |
| `P` / `[` / `]` (□) | Projects |
| `T` (△) | Skills |
| `O` | Contact |
| `Enter` (START) | Open / close system menu |
| `Esc` (SELECT) | Close menu / back to top |
| `F` | Pay respects |

Add `?skip` to the URL to bypass the intro.

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Animations, gradients, and effects
- **JavaScript (Vanilla)** - No frameworks, pure JS
- **Google Fonts** - Rajdhani, Inter, Share Tech Mono
- **GitHub Pages** - Static site hosting

## 📝 Customization

- **Add a project** - copy an `<article class="card">` block in the Projects section of `index.html`; set `data-cat` (`fullstack`, `devops`, `ml`) for the filters. The project count updates automatically.
- **Colors** - edit the CSS variables at the top of `style.css`.
- **Intro video** - replace `videos/ps2-start.mp4`.

## 🌐 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📱 Responsive Breakpoints

- **Mobile** - < 768px
- **Tablet** - 768px - 1024px
- **Desktop** - > 1024px

## 🔊 Autoplay Policy Compliance

The portfolio complies with modern browser autoplay policies:
- CD insertion screen requires user interaction (click)
- After user clicks "INSERT CD", the intro video plays with sound
- This satisfies Chrome's requirement: "Autoplay with sound is allowed if the user has interacted with the domain"

## 📦 Deployment

### GitHub Pages
The portfolio is automatically deployed to GitHub Pages:
- Repository: https://github.com/DhifallahAhmed/DhifallahAhmed.github.io
- Live URL: https://dhifallahahmed.github.io/

### Local Development
1. Clone the repository
2. Open `index.html` in your browser
3. No build process required!

## 🎨 Design Features

- **Scanlines Effect** - Authentic CRT monitor look
- **Particle Animation** - Floating particles in the background
- **Gradient Backgrounds** - PS2 blue theme with cyan accents
- **Smooth Transitions** - Fade effects between sections
- **Hover Effects** - Interactive button states
- **Memory Card Style** - Project cards styled like PS2 memory cards

## 📄 License

This project is open source and available for personal use.

## 👤 Author

**Ahmed Dhifallah**
- Portfolio: https://dhifallahahmed.github.io/
- GitHub: https://github.com/DhifallahAhmed

## 🙏 Credits

- PS2 Intro Video - PlayStation 2 startup sequence
- Icons - Custom PS2 controller button designs
- Inspiration - Nostalgia for the PlayStation 2 era

---

**Made with 💙 and nostalgia for the PS2 era** 🎮


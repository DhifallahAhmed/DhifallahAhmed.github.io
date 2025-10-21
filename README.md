# 🎮 PS2 Portfolio - Ahmed Dhifallah

A nostalgic PlayStation 2-themed portfolio website featuring an interactive CD insertion screen, PS2 intro video, and controller-based navigation.

## ✨ Features

- **🎬 PS2 Intro Video** - Authentic PlayStation 2 startup sequence with sound
- **💿 CD Insertion Screen** - Interactive CD insertion animation before the intro video
- **🎮 Controller Navigation** - Navigate using PS2 controller buttons (X, O, □, △, START, SELECT)
- **🎨 PS2 Aesthetic** - Authentic blue gradient design with scanlines and particle effects
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **🔊 Sound Support** - Intro video plays with sound after user interaction (compliant with browser autoplay policies)
- **⚡ Fast & Lightweight** - Vanilla JavaScript with no heavy frameworks

## 🚀 Live Demo

Visit the portfolio: **https://dhifallahahmed.github.io/**

## 📁 Project Structure

```
ps2-portfolio/
├── index.html          # Main HTML file with Tailwind CSS
├── script.js           # All JavaScript logic and functionality
├── style.css           # Custom CSS with animations and effects
├── README.md           # This file
├── images/             # PS2 button icons and assets
│   ├── x.png          # X button icon
│   ├── o.png          # O button icon
│   ├── square.png     # Square button icon
│   ├── triangle.png   # Triangle button icon
│   ├── start.png      # START button icon
│   └── select.png     # SELECT button icon
└── videos/
    └── ps2-start.mp4  # PS2 intro video
```

## 🎮 How to Use

### Navigation
- **X Button** - Go to Respect section
- **O Button** - Go to Contact section
- **□ Button** - Go to Projects section
- **△ Button** - Go to Skills section
- **START Button** - Go to Home section
- **SELECT Button** - Go to Pause menu

### Intro Video
1. Website loads → CD Insertion screen appears
2. Click "INSERT CD" button (or press ENTER/SPACE)
3. CD animates into the console
4. PS2 intro video plays with sound
5. Press ENTER, SPACE, or ESC to skip the intro

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Animations, gradients, and effects
- **JavaScript (Vanilla)** - No frameworks, pure JS
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **GitHub Pages** - Static site hosting

## 📝 Customization

### Change Portfolio Content
Edit `script.js` to modify:
- `projectsData` - Add/edit your projects
- `skillsData` - Update your skills
- `getFooterTipsHTML()` - Modify footer buttons

### Modify Styling
Edit `style.css` to customize:
- Colors and gradients
- Animations and effects
- Scanlines intensity
- Particle effects

### Replace Intro Video
Replace `videos/ps2-start.mp4` with your own video file

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


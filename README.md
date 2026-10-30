# Ayushi Vagela – Developer Portfolio

A modern, fully responsive personal portfolio website built with **HTML5, CSS3, and JavaScript (ES6+)**.

🌐 **Live Site:** [View Portfolio](https://ayushi-0008.github.io/portfolio-website/)

---

## ✨ Features

- 🎨 **Premium Dark Theme** – Deep navy/black with purple & cyan gradient accents
- 🌊 **Glassmorphism UI** – Frosted glass cards with glowing borders
- 🎭 **Typing Animation** – Hero subtitle cycles through developer roles
- 🔵 **Interactive Particle Canvas** – Mouse-reactive mesh background
- 📱 **Fully Responsive** – Mobile-first design across all breakpoints
- 🧭 **Smooth Scrollspy Navbar** – Active section highlighting + blur on scroll
- 🗂️ **Skills Filter** – Category-based filtering with animated progress bars
- 🛒 **Live E-Commerce Demo** – Functional clothing store simulator with cart & localStorage
- 🏆 **Certificate Detail Modals** – View credential IDs and skill tags
- 📬 **Contact Form** – Client-side validation + EmailJS / mailto fallback
- 🖨️ **Resume Modal** – Printable / PDF-saveable resume view
- 📅 **Education Timeline** – Animated vertical timeline

---

## 📁 Project Structure

```
portfolio-website/
├── index.html          # Main HTML file (all sections)
├── css/
│   ├── style.css       # Design system, components, layout
│   └── animations.css  # Keyframes, reveal transitions
└── js/
    ├── main.js         # App logic – navbar, typing, form, modals
    ├── particles.js    # Interactive canvas particle mesh
    └── ecommerce-demo.js # Clothing store simulator
```

---

## 🚀 Tech Stack

| Category | Technologies |
|---|---|
| Structure | HTML5, Semantic Tags |
| Styling | CSS3, Glassmorphism, CSS Animations |
| Logic | JavaScript ES6+, Intersection Observer API |
| UI Framework | Bootstrap 5.3 |
| Icons | Font Awesome 6, Devicon |
| Fonts | Google Fonts (Outfit, Plus Jakarta Sans, JetBrains Mono) |

---

## ⚙️ Setup & Local Development

```bash
# Clone the repository
git clone https://github.com/ayushi-0008/portfolio-website.git

# Navigate to project folder
cd portfolio-website

# Serve locally (Python 3 required)
python -m http.server 5500

# Open in browser
http://localhost:5500
```

---

## 📧 Enable Real Email Delivery

To activate contact form email delivery, configure **EmailJS**:

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create a service and template
3. In `js/main.js`, fill in `PORTFOLIO_CONFIG.emailjs`:
   ```js
   emailjs: {
     publicKey: "YOUR_PUBLIC_KEY",
     serviceId: "YOUR_SERVICE_ID",
     templateId: "YOUR_TEMPLATE_ID"
   }
   ```

---

## 👩‍💻 About

**Ayushi Vagela** – B.Tech Computer Science & Engineering student at Parul University, Vadodara.

- 📧 ayushivagela2197@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/ayushi-vagela)
- 🐙 [GitHub](https://github.com/ayushi-0008)

---

*© 2026 Ayushi Vagela. All Rights Reserved.*

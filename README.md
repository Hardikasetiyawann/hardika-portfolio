# Hardika Setiyawan - Professional Portfolio

A modern, interactive portfolio website showcasing full-stack development projects, skills, and professional experience. Built with React, Three.js, and Tailwind CSS with dynamic 3D animations and smooth interactions.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18+-blue)

## 📚 Quick Links

- [🚀 Getting Started](#-getting-started) • [🛠️ Tech Stack](#️-tech-stack) • [📊 Deploy](#-deployment) • [🔐 Firebase Setup](#-firebase-setup) • [📞 Support](#-support)

---

## 🌟 Features

### Core Features

- **Dynamic Navigation** - Smooth scroll detection with real-time active section indicator
- **3D Animations** - Interactive lanyard and aurora background effects using Three.js
- **Responsive Design** - Fully responsive across desktop, tablet, and mobile devices
- **Multi-language Support** - Switch between Indonesian and English interfaces
- **Dark Theme** - Modern dark UI with gradient accents and glassmorphism effects

### Pages

- **Home** - Hero section with profile card and social links
- **About** - Bio, statistics, technology stack with fade animations
- **Projects** - Showcase of 7 projects in responsive bento grid layout with GitHub links
- **Contact** - Contact form with multiple communication channels (Email, WhatsApp)

### Admin Features

- **Secret Login** - Hidden admin access (double-click on logo)
- **Project Management** - Add, edit, delete projects with real-time Firestore sync
- **Dynamic Content** - Updates reflect instantly across the site

### Technical Excellence

- **Performance Optimized** - Lazy loading components, GPU acceleration hints
- **Smooth Animations** - GSAP integration for fluid text reveals and transitions
- **State Management** - React hooks for clean state handling
- **Form Validation** - EmailJS integration for secure form submissions
- **Scroll Tracking** - Viewport center calculation for precise navigation

---

## 🛠️ Tech Stack

### Frontend

- **React 18+** - UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Rapier** - Physics engine integration
- **GSAP** - Professional animation library

### Backend & Services

- **Firebase** - Real-time database and hosting
- **Firestore** - Cloud database for project data
- **EmailJS** - Email service for contact forms

### Build & Development

- **Vite** - Fast build tool and dev server
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS transformations
- **Tailwind CSS Config** - Responsive design system

### Other Libraries

- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications
- **React Intersection Observer** - Scroll-triggered animations
- **UUID** - Unique ID generation
- **React Helmet** - Document head management
- **Meshline** - WebGL line rendering

---

## 📋 Project Structure

```
src/
├── components/
│   ├── HomePage.jsx           # Hero and introduction section
│   ├── AboutPage.jsx          # About section with tech stack
│   ├── ProjectsPage.jsx       # Projects showcase with bento grid
│   ├── ContactPage.jsx        # Contact form and channels
│   ├── Modals.jsx            # Admin login and edit modals
│   └── UI.jsx                # Reusable UI components
├── App.jsx                    # Main app component with routing
├── App.css                    # Global styles 
├── Navbar.jsx                 # Navigation component
├── ProfileCard.jsx            # Profile card component
├── Lanyard.jsx                # 3D lanyard animation
├── aurorabg.jsx               # Aurora background animation
├── TextReveal.jsx             # Text reveal animation
├── content.js                 # Content data and translations
├── firebaseConfig.js          # Firebase configuration
├── seedData.js                # Hardcoded data for Firestore seeding
├── index.css                  # Global CSS and animations
└── assets/                    # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Hardikasetiyawann/hardika-portfolio.git
   cd hardika-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

---

## 📝 Usage

### Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Admin Features

- **Access Admin Panel**: Double-click on the "Hardika Setiyawan" logo in the navbar
- **Login**: Use the admin modal to access project management features
- **Edit Projects**: Click the edit button on any project card
- **Delete Projects**: Click the trash icon on any project card

### Content Management

- Update project data in `src/content.js`
- Modify translations (ID/EN) in the same file
- Project images are pulled from `projectDefaults` in `content.js`

---

## 🎨 Customization

### Colors & Theme

- Edit CSS variables in `src/ProfileCard.css` (`:root` selector)
- Modify Tailwind config in `tailwind.config.js`
- Update gradient colors in `aurorabg.jsx`

### Content

- Update text in `src/content.js` (Indonesian and English sections)
- Add new projects by editing `t.projects.list` in `content.js`
- Update technology stack in `t.tools` section

### Animations

- GSAP animations: `src/components/*.jsx` files
- CSS animations: `src/index.css` and component `.css` files
- Three.js effects: `src/Lanyard.jsx`, `src/aurorabg.jsx`

---

## 🔐 Firebase Setup

### Initial Setup

1. Create Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Firestore Database
3. Set up authentication (optional for admin)
4. Run seed data script to populate initial data:
   ```bash
   npm run seed    # If seed script is configured in package.json
   ```

### Database Structure

```
projects/
  └── {projectId}
      ├── title: string
      ├── desc: string
      ├── tech: string
      ├── icon: string
      ├── link: string
      └── img: string

techstack/
  └── {techId}
      ├── name: string
      ├── type: string
      ├── iconName: string
      └── color: string
```

---

## 📧 Contact Form Setup

1. Create account at [emailjs.com](https://emailjs.com)
2. Set up email service and template
3. Get your:
   - Service ID
   - Template ID
   - Public Key
4. Add to `.env.local`

---

## 📊 Performance Optimizations

- **Lazy Loading** - ProjectsPage and ContactPage loaded on demand
- **GPU Acceleration** - Transform3d and will-change hints
- **Image Optimization** - WebP format with responsive sizing
- **CSS Minification** - Tailwind purges unused styles
- **Code Splitting** - Route-based code splitting with React.lazy

---

## 🎯 Features Highlight

### Interactive Elements

- **Scroll Detection** - Navigation updates based on viewport position
- **Hover Effects** - 3D card tilt and gradient animations
- **Drag & Drop** - Lanyard card is fully interactive and draggable
- **Project Toggle** - Show more/less projects with smooth animations
- **Real-time Form Validation** - Input styling on focus/blur

### Mobile Responsiveness

- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- Touch-friendly interactive elements
- Optimized for all screen sizes

---

## 🔍 SEO & Meta

- Helmet integration for dynamic meta tags
- Open Graph support for social sharing
- Structured data for better indexing
- Sitemap and robots.txt in public folder

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

**Hardika Setiyawan**

- GitHub: [@Hardikasetiyawann](https://github.com/Hardikasetiyawann)
- Email: hardikasetiyawan@gmail.com

---

## 🙏 Acknowledgments

- Three.js and React Three Fiber communities
- Tailwind CSS documentation and examples
- GSAP for amazing animation capabilities
- Firebase for backend infrastructure
- All open-source libraries used in this project

---

## 📞 Support

For issues, questions, or suggestions:

1. Open an issue on GitHub
2. Contact via the website contact form
3. Reach out via email or WhatsApp (see contact page)

---

**Last Updated**: January 2026  
**Version**: 1.0.0

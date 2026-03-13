export const projectDefaults = {
    'proj-1': {
        icon: 'bar-chart-3',
        link: 'https://github.com/Hardikasetiyawann/svm-web-app',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    },
    'proj-2': {
        icon: 'book-open',
        link: 'https://github.com/Hardikasetiyawann/pojokbaca-frontend',
        img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80'
    },
    'proj-3': {
        icon: 'server',
        link: 'https://github.com/Hardikasetiyawann/pojokbaca-backend-api',
        img: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80'
    },
    'proj-4': {
        icon: 'bot',
        link: 'https://github.com/Hardikasetiyawann/jingga-ai-companion',
        img: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80'
    },
    'proj-5': {
        icon: 'heart',
        link: 'https://github.com/Hardikasetiyawann/romantic-memory-website',
        img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80'
    },
    'proj-6': {
        icon: 'image',
        link: 'https://github.com/Hardikasetiyawann/fruit-image-classification-mobilenet-logreg',
        img: 'https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=1200&q=80'
    },
    'proj-7': {
        icon: 'car',
        link: 'https://github.com/Hardikasetiyawann/vehicle-detection-yolov3-opencv',
        img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    }

};

export const content = {
    id: {
        nav: [
            { label: "Beranda", href: "home" },
            { label: "Tentang", href: "about" },
            { label: "Proyek", href: "projects" },
            { label: "Kontak", href: "contact" }
        ],

        hero: {
            nameLine1: "Hardika",
            nameLine2: "Setiyawan",
            greeting: "Halo, saya",
            role1: "Seorang",
            role2: "Fullstack Developer",
            desc: "Fokus pada Machine Learning, Web Development, Backend Development, dan Mobile Application. Berpengalaman membangun sistem end-to-end dari data, model AI, API, hingga aplikasi mobile.",
            btnProject: "Lihat Proyek",
            btnContact: "Kontak Saya",
            social: {
                github: "https://github.com/Hardikasetiyawann",
                linkedin: "https://www.linkedin.com/in/hardika-setiyawan-2538082a2",
                instagram: "https://www.instagram.com/hrdiikaa/"
            }
        },

        about: {
            title: "Tentang",
            subtitle: "Saya",
            desc: "Membangun solusi nyata dengan data, AI, dan sistem backend.",
            bio1: "Saya Hardika Setiyawan, mahasiswa Informatika di Universitas Amikom Purwokerto dengan minat kuat pada Machine Learning, Web Development, Backend Development, dan Mobile Application.",
            bio2: "Saya terbiasa mengerjakan proyek end-to-end: mulai dari data scraping, preprocessing NLP, training dan evaluasi model, pembuatan REST API, hingga integrasi frontend web dan Mobile Flutter.",
            download: "Unduh CV",
            cvUrl: "https://drive.google.com/file/d/1Dm6REtKV9ceNDn-Ujq8RfLVcLwALaPhd/view?usp=drivesdk",

            stats: {
                exp: "Bidang Fokus",
                proj: "Proyek Nyata",
                client: "Teknologi Utama"
            },

            techTitle: "Teknologi & Alat",
            tools: [
                // ===== OS & EDITOR =====
                { id: 'os-1', name: 'Ubuntu', type: 'Operating System', iconName: 'terminal', color: 'text-orange-400' },
                { id: 'editor-1', name: 'VS Code', type: 'Code Editor', iconName: 'monitor', color: 'text-blue-400' },

                // ===== PROGRAMMING LANGUAGES =====
                { id: 'lang-1', name: 'Python', type: 'Programming Language', iconName: 'code', color: 'text-yellow-400' },
                { id: 'lang-2', name: 'JavaScript', type: 'Programming Language', iconName: 'code', color: 'text-yellow-300' },
                { id: 'lang-3', name: 'PHP', type: 'Programming Language', iconName: 'code', color: 'text-indigo-400' },
                { id: 'lang-4', name: 'Dart', type: 'Programming Language', iconName: 'code', color: 'text-cyan-400' },
                { id: 'lang-5', name: 'HTML', type: 'Markup Language', iconName: 'code', color: 'text-orange-500' },
                { id: 'lang-6', name: 'CSS', type: 'Style Sheet Language', iconName: 'code', color: 'text-blue-500' },

                // ===== FRONTEND =====
                { id: 'fe-1', name: 'React', type: 'Frontend Library', iconName: 'layout', color: 'text-sky-400' },
                { id: 'fe-2', name: 'Tailwind CSS', type: 'Frontend Styling', iconName: 'layers', color: 'text-cyan-400' },

                // ===== BACKEND =====
                { id: 'be-1', name: 'Flask', type: 'Backend Framework', iconName: 'server', color: 'text-red-400' },
                { id: 'be-2', name: 'Express.js', type: 'Backend Framework', iconName: 'server', color: 'text-gray-300' },
                { id: 'be-3', name: 'CodeIgniter 4', type: 'Backend MVC', iconName: 'layers', color: 'text-orange-500' },

                // ===== DATABASE =====
                { id: 'db-1', name: 'MySQL', type: 'Database', iconName: 'database', color: 'text-blue-400' },
                { id: 'db-2', name: 'SQLite', type: 'Database', iconName: 'database', color: 'text-green-400' },
                { id: 'db-3', name: 'Firebase', type: 'Backend-as-a-Service', iconName: 'cloud', color: 'text-yellow-500' },

                // ===== MACHINE LEARNING =====
                { id: 'ml-1', name: 'TensorFlow', type: 'Machine Learning', iconName: 'brain', color: 'text-orange-400' },
                { id: 'ml-2', name: 'Scikit-Learn', type: 'Machine Learning', iconName: 'activity', color: 'text-green-400' },
                { id: 'ml-3', name: 'OpenCV', type: 'Computer Vision', iconName: 'eye', color: 'text-emerald-400' },

                // ===== MOBILE =====
                { id: 'mobile-1', name: 'Flutter', type: 'Mobile Development', iconName: 'smartphone', color: 'text-cyan-400' },

                // ===== DEVOPS & TOOLS =====
                { id: 'tool-1', name: 'Docker', type: 'DevOps', iconName: 'box', color: 'text-blue-500' },
                { id: 'tool-2', name: 'Git', type: 'Version Control', iconName: 'gitbranch', color: 'text-red-400' },
                { id: 'tool-3', name: 'GitHub', type: 'Version Control', iconName: 'github', color: 'text-gray-400' },
                { id: 'tool-4', name: 'Postman', type: 'API Testing', iconName: 'send', color: 'text-orange-400' },
                { id: 'tool-5', name: 'Figma', type: 'Design Tool', iconName: 'figma', color: 'text-purple-400' }
            ]

        },

        projects: {
            title: "Proyek",
            subtitle: "Unggulan",
            desc: "Proyek nyata yang saya bangun dari data hingga deployment.",
            btnAll: "Lihat Lebih Banyak Proyek",
            list: [
                {
                    id: 'proj-1',
                    title: 'SVM Sentiment & Topic Analysis Web App',
                    desc: 'Aplikasi end-to-end untuk analisis sentimen dan topik Bahasa Indonesia menggunakan SVM, mencakup scraping data, preprocessing NLP, training model, evaluasi, dan deployment web.',
                    tech: 'Python, Flask, Scikit-Learn, NLP'
                },
                {
                    id: 'proj-2',
                    title: 'PojokBaca - Flutter Frontend',
                    desc: 'Aplikasi mobile perpustakaan berbasis Flutter dengan arsitektur client-server.',
                    tech: 'Flutter, REST API'
                },
                {
                    id: 'proj-3',
                    title: 'PojokBaca - Backend REST API',
                    desc: 'Backend RESTful API menggunakan CodeIgniter 4 dengan arsitektur MVC.',
                    tech: 'CodeIgniter 4, MySQL, REST API'
                },
                {
                    id: 'proj-4',
                    title: 'Jingga AI Companion',
                    desc: 'Chatbot AI berbasis Flask dan Ollama dengan contextual memory dan dual conversation mode.',
                    tech: 'Flask, Ollama, LLM'
                },
                {
                    id: 'proj-5',
                    title: 'Romantic Memory Interactive Website',
                    desc: 'Website interaktif bertema romantis untuk menyimpan kenangan, waktu, musik, dan cerita bersama dalam satu pengalaman imersif berbasis web.',
                    tech: 'HTML, CSS, JavaScript, Interactive Web'
                },
                {
                    id: 'proj-6',
                    title: 'Fruit Image Classification using MobileNet & Logistic Regression',
                    desc: 'Sistem klasifikasi gambar buah (apel dan jeruk) menggunakan MobileNetV2 sebagai feature extractor dan Logistic Regression, dideploy sebagai aplikasi web Flask dengan prediksi real-time.',
                    tech: 'Python, Flask, MobileNetV2, Logistic Regression, Computer Vision'
                },
                {
                    id: 'proj-7',
                    title: 'Vehicle Detection & Counting using YOLOv3 and OpenCV',
                    desc: 'Sistem deteksi dan perhitungan kendaraan secara real-time menggunakan YOLOv3 dan OpenCV dengan input webcam.',
                    tech: 'Python, YOLOv3, OpenCV, Object Detection'
                }

            ]
        },

        contact: {
            title: "Mari",
            subtitle: "Terhubung",
            desc: "Saya selalu terbuka untuk proyek baru atau sekadar berdiskusi.",
            contactInfo: {
                email: "hardikasetiyawan@gmail.com",
                ig: "@hrdiikaa",
            },
            form: {
                name: "Nama / ID Pengirim",
                email: "Email",
                msg: "Pesan",
                btn: "KIRIM PESAN",
                success: "Pesan berhasil dikirim!"
            }
        }
    },

    // =======================
    // 🇬🇧 ENGLISH
    // =======================
    en: {
        nav: [
            { label: "Home", href: "home" },
            { label: "About", href: "about" },
            { label: "Projects", href: "projects" },
            { label: "Contact", href: "contact" }
        ],

        hero: {
            nameLine1: "Hardika",
            nameLine2: "Setiyawan",
            greeting: "Hello, I'm",
            role1: "A Person",
            role2: "Fullstack Developer",
            desc: "Focused on Machine Learning, Web Development, Backend Development, and Mobile Applications. Experienced in building end-to-end systems from data and AI models to APIs and mobile apps.",
            btnProject: "View Projects",
            btnContact: "Contact Me",
            social: {
                github: "https://github.com/Hardikasetiyawann",
                linkedin: "https://www.linkedin.com/in/hardika-setiyawan-2538082a2",
                instagram: "https://www.instagram.com/hrdiikaa/"
            }
        },

        about: {
            title: "About",
            subtitle: "Me",
            desc: "Building real-world solutions with data, AI, and backend systems.",
            bio1: "I'm Hardika Setiyawan, an Informatics student at Universitas Amikom Purwokerto with a strong interest in Machine Learning, Web Development, Backend Development, and Mobile Applications.",
            bio2: "I work on end-to-end projects, from data scraping and NLP preprocessing to model training, REST API development, and web/mobile integration.",
            download: "Download CV",
            cvUrl: "https://drive.google.com/file/d/1Dm6REtKV9ceNDn-Ujq8RfLVcLwALaPhd/view?usp=drivesdk",

            stats: {
                exp: "Focus Areas",
                proj: "Real Projects",
                client: "Core Technologies"
            },

            techTitle: "Technologies & Tools",
            tools: [
                // ===== OS & EDITOR =====
                { id: 'os-1', name: 'Ubuntu', type: 'Operating System', iconName: 'terminal', color: 'text-orange-400' },
                { id: 'editor-1', name: 'VS Code', type: 'Code Editor', iconName: 'monitor', color: 'text-blue-400' },

                // ===== PROGRAMMING LANGUAGES =====
                { id: 'lang-1', name: 'Python', type: 'Programming Language', iconName: 'code', color: 'text-yellow-400' },
                { id: 'lang-2', name: 'JavaScript', type: 'Programming Language', iconName: 'code', color: 'text-yellow-300' },
                { id: 'lang-3', name: 'PHP', type: 'Programming Language', iconName: 'code', color: 'text-indigo-400' },
                { id: 'lang-4', name: 'Dart', type: 'Programming Language', iconName: 'code', color: 'text-cyan-400' },
                { id: 'lang-5', name: 'HTML', type: 'Markup Language', iconName: 'code', color: 'text-orange-500' },
                { id: 'lang-6', name: 'CSS', type: 'Style Sheet Language', iconName: 'code', color: 'text-blue-500' },

                // ===== FRONTEND =====
                { id: 'fe-1', name: 'React', type: 'Frontend Library', iconName: 'layout', color: 'text-sky-400' },
                { id: 'fe-2', name: 'Tailwind CSS', type: 'Frontend Styling', iconName: 'layers', color: 'text-cyan-400' },

                // ===== BACKEND =====
                { id: 'be-1', name: 'Flask', type: 'Backend Framework', iconName: 'server', color: 'text-red-400' },
                { id: 'be-2', name: 'Express.js', type: 'Backend Framework', iconName: 'server', color: 'text-gray-300' },
                { id: 'be-3', name: 'CodeIgniter 4', type: 'Backend MVC', iconName: 'layers', color: 'text-orange-500' },

                // ===== DATABASE =====
                { id: 'db-1', name: 'MySQL', type: 'Database', iconName: 'database', color: 'text-blue-400' },
                { id: 'db-2', name: 'SQLite', type: 'Database', iconName: 'database', color: 'text-green-400' },
                { id: 'db-3', name: 'Firebase', type: 'Backend-as-a-Service', iconName: 'cloud', color: 'text-yellow-500' },

                // ===== MACHINE LEARNING =====
                { id: 'ml-1', name: 'TensorFlow', type: 'Machine Learning', iconName: 'brain', color: 'text-orange-400' },
                { id: 'ml-2', name: 'Scikit-Learn', type: 'Machine Learning', iconName: 'activity', color: 'text-green-400' },
                { id: 'ml-3', name: 'OpenCV', type: 'Computer Vision', iconName: 'eye', color: 'text-emerald-400' },

                // ===== MOBILE =====
                { id: 'mobile-1', name: 'Flutter', type: 'Mobile Development', iconName: 'smartphone', color: 'text-cyan-400' },

                // ===== DEVOPS & TOOLS =====
                { id: 'tool-1', name: 'Docker', type: 'DevOps', iconName: 'box', color: 'text-blue-500' },
                { id: 'tool-2', name: 'Git', type: 'Version Control', iconName: 'gitbranch', color: 'text-red-400' },
                { id: 'tool-3', name: 'GitHub', type: 'Version Control', iconName: 'github', color: 'text-gray-400' },
                { id: 'tool-4', name: 'Postman', type: 'API Testing', iconName: 'send', color: 'text-orange-400' },
                { id: 'tool-5', name: 'Figma', type: 'Design Tool', iconName: 'figma', color: 'text-purple-400' }
            ]
        },

        projects: {
            title: "Featured",
            subtitle: "Projects",
            desc: "Real-world projects I built from data to deployment.",
            btnAll: "View More Projects",
            list: [
                {
                    id: 'proj-1',
                    title: 'SVM Sentiment & Topic Analysis Web App',
                    desc: 'An end-to-end web application for Indonesian sentiment and topic analysis using Support Vector Machine (SVM), covering data scraping, NLP preprocessing, model training, evaluation, and web deployment.',
                    tech: 'Python, Flask, Scikit-Learn, NLP'
                },
                {
                    id: 'proj-2',
                    title: 'PojokBaca - Flutter Frontend',
                    desc: 'A Flutter-based mobile library application built with a client-server architecture, providing a smooth and user-friendly reading experience.',
                    tech: 'Flutter, REST API'
                },
                {
                    id: 'proj-3',
                    title: 'PojokBaca - Backend REST API',
                    desc: 'A RESTful backend API developed using CodeIgniter 4 with MVC architecture to handle data management and client communication.',
                    tech: 'CodeIgniter 4, MySQL, REST API'
                },
                {
                    id: 'proj-4',
                    title: 'Jingga AI Companion',
                    desc: 'An AI chatbot built with Flask and Ollama, featuring contextual memory and dual conversation modes for more natural and adaptive interactions.',
                    tech: 'Flask, Ollama, LLM'
                },
                {
                    id: 'proj-5',
                    title: 'Romantic Memory Interactive Website',
                    desc: 'An interactive romantic-themed website designed to capture shared memories, time, music, and stories in a single immersive web experience.',
                    tech: 'HTML, CSS, JavaScript, Interactive Web'
                },
                {
                    id: 'proj-6',
                    title: 'Fruit Image Classification using MobileNet & Logistic Regression',
                    desc: 'A fruit image classification system for apples and oranges using MobileNetV2 as a feature extractor and Logistic Regression, deployed as a Flask web application with real-time predictions.',
                    tech: 'Python, Flask, MobileNetV2, Logistic Regression, Computer Vision'
                },
                {
                    id: 'proj-7',
                    title: 'Vehicle Detection & Counting using YOLOv3 and OpenCV',
                    desc: 'A real-time vehicle detection and counting system using YOLOv3 and OpenCV with live webcam input.',
                    tech: 'Python, YOLOv3, OpenCV, Object Detection'
                }
            ]

        },

        contact: {
            title: "Let's",
            subtitle: "Connect",
            desc: "I'm always open to new projects or discussions.",
            contactInfo: {
                email: "hardikasetiyawan@gmail.com",
                ig: "@hrdiikaa",
            },
            form: {
                name: "Name",
                email: "Email",
                msg: "Message",
                btn: "SEND MESSAGE",
                success: "Your message has been sent successfully!"
            }
        }
    }
};

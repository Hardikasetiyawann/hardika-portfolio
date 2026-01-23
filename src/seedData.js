import { db } from './firebaseConfig';
import { collection, setDoc, doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const hardcodedTechStack = [
    { id: uuidv4(), name: "Ubuntu", type: "Operating System", iconName: "terminal", color: "text-orange-400" },
    { id: uuidv4(), name: "VS Code", type: "Code Editor", iconName: "monitor", color: "text-blue-400" },

    { id: uuidv4(), name: "Python", type: "Programming Language", iconName: "code", color: "text-yellow-400" },
    { id: uuidv4(), name: "JavaScript", type: "Programming Language", iconName: "code", color: "text-yellow-300" },
    { id: uuidv4(), name: "PHP", type: "Programming Language", iconName: "code", color: "text-indigo-400" },
    { id: uuidv4(), name: "Dart", type: "Programming Language", iconName: "code", color: "text-cyan-400" },
    { id: uuidv4(), name: "HTML", type: "Markup Language", iconName: "code", color: "text-orange-500" },
    { id: uuidv4(), name: "CSS", type: "Style Sheet Language", iconName: "code", color: "text-blue-500" },

    { id: uuidv4(), name: "React", type: "Frontend Library", iconName: "layout", color: "text-sky-400" },
    { id: uuidv4(), name: "Tailwind CSS", type: "Frontend Styling", iconName: "layers", color: "text-cyan-400" },

    { id: uuidv4(), name: "Flask", type: "Backend Framework", iconName: "server", color: "text-red-400" },
    { id: uuidv4(), name: "Express.js", type: "Backend Framework", iconName: "server", color: "text-gray-300" },
    { id: uuidv4(), name: "CodeIgniter 4", type: "Backend MVC", iconName: "layers", color: "text-orange-500" },

    { id: uuidv4(), name: "MySQL", type: "Database", iconName: "database", color: "text-blue-400" },
    { id: uuidv4(), name: "SQLite", type: "Database", iconName: "database", color: "text-green-400" },
    { id: uuidv4(), name: "Firebase", type: "Backend-as-a-Service", iconName: "cloud", color: "text-yellow-500" },

    { id: uuidv4(), name: "TensorFlow", type: "Machine Learning", iconName: "brain", color: "text-orange-400" },
    { id: uuidv4(), name: "Scikit-Learn", type: "Machine Learning", iconName: "activity", color: "text-green-400" },
    { id: uuidv4(), name: "OpenCV", type: "Computer Vision", iconName: "eye", color: "text-emerald-400" },

    { id: uuidv4(), name: "Flutter", type: "Mobile Development", iconName: "smartphone", color: "text-cyan-400" },

    { id: uuidv4(), name: "Docker", type: "DevOps", iconName: "box", color: "text-blue-500" },
    { id: uuidv4(), name: "Git", type: "Version Control", iconName: "gitbranch", color: "text-red-400" },
    { id: uuidv4(), name: "GitHub", type: "Version Control", iconName: "github", color: "text-gray-400" },
    { id: uuidv4(), name: "Postman", type: "API Testing", iconName: "send", color: "text-orange-400" },
    { id: uuidv4(), name: "Figma", type: "Design Tool", iconName: "figma", color: "text-purple-400" }
];

// --- PROJECTS SESUAI CONTENT.JS ---
const hardcodedProjects = [
    {
        id: uuidv4(),
        title: "SVM Sentiment & Topic Analysis Web App",
        tech: "Python, Flask, Scikit-Learn, NLP",
        desc: "Aplikasi end-to-end untuk analisis sentimen dan topik Bahasa Indonesia menggunakan SVM, mencakup scraping data, preprocessing NLP, training model, evaluasi, dan deployment web.",
        icon: "bar-chart-3",
        link: "https://github.com/Hardikasetiyawann/svm-web-app",
        img: "https://placehold.co/600x400/0F172A/FFFFFF/png?text=SVM+Sentiment+Analysis"
    },
    {
        id: uuidv4(),
        title: "PojokBaca – Flutter Frontend",
        tech: "Flutter, REST API",
        desc: "Aplikasi mobile perpustakaan berbasis Flutter dengan arsitektur client-server.",
        icon: "book-open",
        link: "https://github.com/Hardikasetiyawann/pojokbaca-frontend",
        img: "https://placehold.co/600x400/064E3B/FFFFFF/png?text=PojokBaca+Flutter"
    },
    {
        id: uuidv4(),
        title: "PojokBaca – Backend REST API",
        tech: "CodeIgniter 4, MySQL, REST API",
        desc: "Backend RESTful API menggunakan CodeIgniter 4 dengan arsitektur MVC.",
        icon: "server",
        link: "https://github.com/Hardikasetiyawann/pojokbaca-backend-api",
        img: "https://placehold.co/600x400/1E3A8A/FFFFFF/png?text=CI4+REST+API"
    },
    {
        id: uuidv4(),
        title: "Jingga AI Companion",
        tech: "Flask, Ollama, LLM",
        desc: "Chatbot AI berbasis Flask dan Ollama dengan contextual memory dan dual conversation mode.",
        icon: "bot",
        link: "https://github.com/Hardikasetiyawann/jingga-ai-companion",
        img: "https://placehold.co/600x400/7C2D12/FFFFFF/png?text=AI+Chatbot"
    },
    {
        id: uuidv4(),
        title: "Romantic Memory Interactive Website",
        tech: "HTML, CSS, JavaScript, Interactive Web",
        desc: "Website interaktif bertema romantis untuk menyimpan kenangan, waktu, musik, dan cerita bersama dalam satu pengalaman imersif berbasis web.",
        icon: "smartphone",
        link: "https://github.com/Hardikasetiyawann/romantic-memory-website",
        img: "https://placehold.co/600x400/1F2937/FFFFFF/png?text=Romantic+Memory"
    },
    {
        id: uuidv4(),
        title: "Project Pribadi - E-Commerce Platform",
        tech: "React, Node.js, MongoDB, Stripe",
        desc: "Platform e-commerce full-stack dengan fitur katalog produk, keranjang belanja, dan sistem pembayaran yang aman dan terintegrasi.",
        icon: "shopping-cart",
        link: "https://github.com/Hardikasetiyawann/ecommerce-platform",
        img: "https://placehold.co/600x400/7C3AED/FFFFFF/png?text=E-Commerce"
    },
    {
        id: uuidv4(),
        title: "Project Pribadi - Real-Time Chat Application",
        tech: "React, Socket.io, Node.js, PostgreSQL",
        desc: "Aplikasi chat real-time dengan fitur group chat, media sharing, dan notifikasi push. Dibangun dengan arsitektur scalable dan performance tinggi.",
        icon: "message-circle",
        link: "https://github.com/Hardikasetiyawann/realtime-chat-app",
        img: "https://placehold.co/600x400/059669/FFFFFF/png?text=Real-Time+Chat"
    }
];

const seedData = async () => {
    try {
        console.log("Memulai proses seeding data ke Firestore...");

        // --- 1. UPLOAD TOOLS ---
        const toolsCollection = collection(db, 'tools');
        const toolPromises = hardcodedTechStack.map(async (tool) => {
            const { id, ...dataToSave } = tool;
            await setDoc(doc(toolsCollection, id), dataToSave);
        });
        await Promise.all(toolPromises);
        console.log(`✅ Berhasil mengunggah ${hardcodedTechStack.length} Tools.`);

        // --- 2. UPLOAD PROJECTS ---
        const projectsCollection = collection(db, 'projects');
        const projectPromises = hardcodedProjects.map(async (project) => {
            const { id, ...dataToSave } = project;
            await setDoc(doc(projectsCollection, id), dataToSave);
        });
        await Promise.all(projectPromises);
        console.log(`✅ Berhasil mengunggah ${hardcodedProjects.length} Proyek.`);

        console.log("\n>>> Proses Seeding Selesai! Data portofolio Anda sudah terisi di Firestore.");

    } catch (error) {
        console.error("❌ ERROR SAAT SEEDING:", error);
        console.log("Pastikan aturan Firebase Anda mengizinkan write: if true;");
    }
};

export default seedData;
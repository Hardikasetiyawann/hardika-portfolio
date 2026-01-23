import React, { useState, useEffect, useCallback, Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster, toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { ChevronUp } from "lucide-react";

import Navbar from "./Navbar";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import Aurora from "./aurorabg";

const ProjectsPage = React.lazy(() => import("./components/ProjectsPage"));
const ContactPage = React.lazy(() => import("./components/ContactPage"));
import { SecretLoginModal, AdminModal } from "./components/Modals";

import { content } from "./content";
import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { logAdminAction } from "./utils/auditLog";

import "./aurorabg.css";

function App() {
  const [lang, setLang] = useState("id");
  const [activePage, setActivePage] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUID, setAdminUID] = useState(null);
  const [projectsData, setProjectsData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editType, setEditType] = useState(null);

  const t = content[lang];
  const toggleLanguage = () => setLang((prev) => (prev === "id" ? "en" : "id"));

  const navigateToSection = (id) => {
    setActivePage(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const fetchFirestoreData = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, "projects"));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      if (data.length) setProjectsData(data);
    } catch (e) {
      console.error("Firestore fetch failed:", e);
    }
  }, []);

  useEffect(() => {
    fetchFirestoreData();
  }, [fetchFirestoreData]);

  useEffect(() => {
    const handleSectionScroll = () => {
      const sections = Array.from(
        document.querySelectorAll("section[data-spy]"),
      );

      if (sections.length === 0) return;

      const viewportCenter = window.innerHeight / 2;

      let closestSection = "home";
      let closestDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = section.dataset.spy;
        }
      });

      setActivePage(closestSection);
    };

    let scrollTimeout;
    const onScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleSectionScroll, 10);
      handleSectionScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleSectionScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 1000);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSaveProject = async (project) => {
    const id = project.id || `proj-${uuidv4()}`;
    const toastId = toast.loading("Saving...");
    try {
      const { id: _, ...data } = project;

      let oldData = null;
      if (project.id) {
        const existingDoc = projectsData.find((p) => p.id === id);
        if (existingDoc) {
          oldData = { ...existingDoc };
          delete oldData.id;
        }
      }

      await setDoc(doc(db, "projects", id), data);

      // Log the action
      const action = project.id ? "update" : "create";
      await logAdminAction(action, "project", adminUID, data, oldData);

      fetchFirestoreData();
      toast.success("Saved!", { id: toastId });
      setIsEditModalOpen(false);
    } catch (e) {
      console.debug("[ADMIN]", e);
      toast.error("Save failed", { id: toastId });
    }
  };

  const handleDeleteProject = async (project) => {
    if (!window.confirm(`Delete "${project.title}"?`)) return;
    const toastId = toast.loading("Deleting...");
    try {
      await logAdminAction("delete", "project", adminUID, project);

      await deleteDoc(doc(db, "projects", project.id));
      fetchFirestoreData();
      toast.success("Deleted!", { id: toastId });
    } catch (e) {
      console.debug("[ADMIN]", e);
      toast.error("Delete failed", { id: toastId });
    }
  };

  const handleEditProject = (project) => {
    setEditingItem(
      project || {
        id: null,
        title: "",
        tech: "",
        desc: "",
        icon: "globe",
        img: "https://placehold.co/600x400",
      },
    );
    setEditType("project");
    setIsEditModalOpen(true);
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden relative">
        <Helmet>
          <title>
            {lang === "id"
              ? "Hardika Setiyawan | Fullstack Developer"
              : "Hardika Setiyawan | Portfolio"}
          </title>
          <meta name="theme-color" content="#14b8a6" />
        </Helmet>

        <Toaster position="bottom-right" />

        {/* GLOBAL BACKGROUND - FIXED */}
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
          <Aurora
            colorStops={["#1d8c77", "#264d94", "#7c214c"]}
            blend={0.9}
            amplitude={1.2}
            speed={0.6}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* CONTENT WRAPPER - RELATIVE Z-10 */}
        <div className="relative z-10">
          <Navbar
            logo="Hardika"
            items={t.nav}
            activeHref={activePage}
            onItemClick={navigateToSection}
            currentLang={lang}
            onLangToggle={toggleLanguage}
            onSecretLogin={() => setIsLoginModalOpen(true)}
            isAdmin={isAdmin}
          />

          <main>
            <HomePage t={t} navigate={navigateToSection} />
            <AboutPage t={t} tools={t.about.tools} />

            <Suspense
              fallback={
                <div className="py-20 text-center text-white">Loading...</div>
              }
            >
              <ProjectsPage
                t={t}
                projects={projectsData}
                isAdmin={isAdmin}
                handleEditProject={handleEditProject}
                handleDeleteProject={handleDeleteProject}
                lang={lang}
              />
              <ContactPage t={t} lang={lang} />
            </Suspense>
          </main>

          <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-4 rounded-full bg-teal-500 text-black transition z-40 ${
              showScrollTop ? "opacity-100" : "opacity-0 translate-y-10"
            }`}
          >
            <ChevronUp />
          </button>
        </div>

        <SecretLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={(uid) => {
            setIsAdmin(true);
            setAdminUID(uid);
          }}
        />

        <AdminModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={editingItem}
          type={editType}
          onSave={handleSaveProject}
        />
      </div>
    </HelmetProvider>
  );
}

export default App;

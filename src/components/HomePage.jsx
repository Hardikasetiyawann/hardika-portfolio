import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import ProfileCard from "../ProfileCard";
import { Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

const HomePage = React.memo(({ t, navigate }) => {
  const [startAnim, setStartAnim] = useState(false);

  useEffect(() => {
    setStartAnim(true);
  }, []);

  const animClass = (delay) =>
    startAnim ? `animate-fade-up ${delay}` : "opacity-0";

  return (
    <section
      id="home"
      data-spy="home"
      className="relative w-full min-h-screen flex flex-col justify-start items-center overflow-hidden pt-4 md:pt-10 pb-20"
    >
      {/* BACKGROUND REMOVED (Global in App.jsx) */}


      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 w-full grid md:grid-cols-2 gap-8 items-center relative z-10 pt-24">
        <div className="mt-4 md:mt-8">
          {/* Greeting */}
          <div
            key={t.hero.greeting}
            className={`text-sm text-gray-400 font-medium mb-2 tracking-widest uppercase ${animClass(
              "delay-100",
            )}`}
          >
            {t.hero.greeting}
          </div>

          {/* Nama */}
          <div className="mb-4 text-white tracking-tight drop-shadow-sm">
            <h1
              className={`text-5xl font-extrabold leading-none ${animClass(
                "delay-200",
              )}`}
            >
              {t.hero.nameLine1}
            </h1>
            <h1
              className={`text-5xl font-extrabold leading-none mt-1 ${animClass(
                "delay-300",
              )}`}
            >
              {t.hero.nameLine2}
            </h1>
          </div>

          <h2
            className={`text-3xl text-gray-400 mb-6 font-extrabold flex flex-wrap gap-2 ${animClass(
              "delay-400",
            )}`}
          >
            <span key={t.hero.role1}>{t.hero.role1}</span>
            <span
              key={t.hero.role2}
              className="border-b-2 border-teal-400/50 text-white"
            >
              {t.hero.role2} {t.hero.role3}
            </span>
          </h2>

          <div
            className={`flex items-center gap-6 mb-8 ${animClass("delay-500")}`}
          >
            <a
              href={t.hero.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
              className="text-gray-400 hover:text-teal-400 hover:scale-110 transition-all duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={t.hero.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-[#0077b5] hover:scale-110 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={t.hero.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-[#E1306C] hover:scale-110 transition-all duration-300"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>

          {/* Typewriter */}
          <div className="mb-8 text-lg max-w-lg text-gray-300 leading-relaxed font-light min-h-[5rem]">
            <Typewriter
              key={t.hero.desc}
              options={{ delay: 20, cursor: "|", loop: false }}
              onInit={(typewriter) => {
                typewriter.pauseFor(500).typeString(t.hero.desc).start();
              }}
            />
          </div>

          <div
            className={`flex space-x-5 transition-all duration-500 ease-out ${animClass(
              "delay-500",
            )}`}
          >
            <button
              onClick={() => navigate("projects")}
              className="group relative px-8 py-3 bg-teal-500/10 backdrop-blur-sm border border-teal-500/20 rounded-full overflow-hidden transition-all duration-300 hover:border-teal-400/50"
            >
              <div className="absolute inset-0 bg-teal-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <span
                key={t.hero.btnProject}
                className="relative font-semibold text-teal-100 group-hover:text-white tracking-wide flex items-center"
              >
                {t.hero.btnProject}
                <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </button>

            <button
              onClick={() => navigate("contact")}
              className="group px-8 py-3 border border-gray-600 rounded-full text-gray-400 font-medium hover:bg-gray-800 hover:text-white hover:border-gray-400 transition-all duration-300"
            >
              <span key={t.hero.btnContact}>{t.hero.btnContact}</span>
            </button>
          </div>
        </div>

        <div
          className={`flex justify-center md:justify-end transition-all duration-500 ease-out ${animClass(
            "delay-500",
          )}`}
        >
          <ProfileCard
            name="Hardika Setiyawan"
            title="Fullstack Developer"
            handle="hrdiikaa"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/avatar.webp"
            showUserInfo
            enableTilt
            enableMobileTilt={false}
            onContactClick={() => navigate("contact")}
          />
        </div>
      </div>
    </section>
  );
});

export default HomePage;

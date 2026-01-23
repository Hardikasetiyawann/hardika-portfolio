import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { SimpleSpotlightCard } from "./UI";
import {
  Mail,
  MessageCircle,
  Wifi,
  Radio,
  Send,
  User,
  ArrowUpRight,
} from "lucide-react";
import {
  validateFormData,
  checkRateLimit,
  getCSRFToken,
} from "../utils/security";

const ContactPage = React.memo(({ t, lang }) => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    getCSRFToken();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const rateLimit = checkRateLimit("contact-form", 3, 60000);
    if (!rateLimit.allowed) {
      toast.error(
        `Terlalu banyak pengiriman. Coba lagi dalam ${rateLimit.resetInSeconds} detik.`,
      );
      setLoading(false);
      return;
    }

    const validation = validateFormData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error("Mohon periksa kembali formulir Anda.");
      setLoading(false);
      return;
    }

    const toastId = toast.loading("Mengirim pesan...");

    const sanitizedData = {
      ...formData,
      ...validation.sanitized,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: sanitizedData.name,
          from_email: sanitizedData.email,
          message: sanitizedData.message,
          to_email:
            import.meta.env.VITE_CONTACT_EMAIL || "your-email@example.com",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          toast.success("Pesan terkirim! Saya akan segera membalas.", {
            id: toastId,
          });
          setFormData({
            name: "",
            email: "",
            message: "",
          });
          setLoading(false);
        },
        (error) => {
          toast.error("Gagal mengirim pesan. Coba hubungi via WhatsApp.", {
            id: toastId,
          });

          if (process.env.NODE_ENV === "development") {
            console.debug("[DEBUG]", error);
          }

          setLoading(false);
        },
      );
  };

  return (
    <section
      id="contact"
      data-spy="contact"
      className="relative w-full flex flex-col justify-center items-center py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 text-center w-full relative z-20">
        <h3 className="text-4xl font-bold mb-8 text-white animate-fade-up">
          <span key={`${lang}-contact-title`}>{t.contact.title}</span>{" "}
          <span className="text-teal-400"> {t.contact.subtitle}</span>
        </h3>
        <p
          key={`${lang}-contact-desc`}
          className="text-gray-400 text-lg font-light mb-12 max-w-2xl mx-auto animate-fade-up delay-100"
        >
          {t.contact.desc}
        </p>

        <div>
          <SimpleSpotlightCard
            spotlightColor="rose"
            className="p-0 overflow-hidden"
          >
            <div className="grid md:grid-cols-5 h-full">
              {/* KIRI: INFO KONTAK */}
              <div className="md:col-span-2 bg-black/40 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(79,70,229,0.05)_50%,transparent_100%)] animate-scan pointer-events-none"></div>
                <div>
                  <div className="flex items-center space-x-2 mb-8">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                    </span>
                    <span className="text-teal-400 text-sm font-bold tracking-wider">
                      SYSTEM STATUS: ONLINE
                    </span>
                  </div>
                  <div className="space-y-4 relative z-10">
                    {/* EMAIL BUTTON */}
                    <a
                      href={`mailto:${t.contact.contactInfo.email}`}
                      className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all duration-300"
                    >
                      <div className="p-3 rounded-lg bg-black/40 text-teal-400 mr-4 group-hover:scale-110 transition">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                          Email Me
                        </div>
                        <div className="text-gray-200 group-hover:text-teal-300 transition font-semibold text-sm break-all">
                          {t.contact.contactInfo.email}
                        </div>
                      </div>
                    </a>

                    {/* ig BUTTON (Menggantikan Secure Line biasa) */}
                    <a
                      href={`https://instagram.com/${t.contact.contactInfo.ig.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all duration-300 cursor-pointer"
                    >
                      <div className="p-3 rounded-lg bg-black/40 text-green-400 mr-4 group-hover:scale-110 transition">
                        {/* Ikon MessageCircle mirip WA */}
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                          Direct Message Instagram
                        </div>
                        <div className="text-gray-200 group-hover:text-green-300 transition font-semibold">
                          {t.contact.contactInfo.ig}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="mt-10 flex items-center space-x-4 text-gray-600 opacity-50">
                  <Wifi className="w-5 h-5 animate-pulse" />
                  <Radio className="w-5 h-5 animate-pulse delay-300" />
                  <span className="text-xs tracking-widest font-mono">
                    ESTABLISHING UPLINK...
                  </span>
                </div>
              </div>

              {/* KANAN: FORM INPUT */}
              <div className="md:col-span-3 p-8 md:p-10 relative">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Send className="w-5 h-5 mr-3 text-rose-400" /> INITIATE DATA
                  TRANSMISSION
                </h4>

                <form
                  ref={formRef}
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="relative group">
                    <User className="absolute left-4 top-4 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-indigo-400" />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      aria-label="Nama Lengkap"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength="100"
                      className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 outline-none transition-all ${
                        errors.name
                          ? "border-red-500/50 bg-red-500/5 focus:border-red-500/50"
                          : "border-white/10 focus:border-indigo-500/50 focus:bg-indigo-500/5"
                      }`}
                      placeholder={t.contact.form.name}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="relative group">
                    <Mail className="absolute left-4 top-4 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-rose-400" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      aria-label="Alamat Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength="254"
                      className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 outline-none transition-all ${
                        errors.email
                          ? "border-red-500/50 bg-red-500/5 focus:border-red-500/50"
                          : "border-white/10 focus:border-rose-500/50 focus:bg-rose-500/5"
                      }`}
                      placeholder={t.contact.form.email}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="relative group pt-4">
                    <textarea
                      rows="3"
                      name="message"
                      id="message"
                      aria-label="Pesan Anda"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength="5000"
                      className={`w-full p-4 border rounded-xl text-gray-200 outline-none placeholder-gray-500 transition-all resize-none ${
                        errors.message
                          ? "border-red-500/50 bg-red-500/5 focus:border-red-500/50"
                          : "bg-white/5 border-white/10 focus:border-teal-500/50 focus:bg-black/40"
                      }`}
                      placeholder={t.contact.form.msg}
                    ></textarea>
                    <p className="text-gray-500 text-xs mt-1">
                      {formData.message.length}/5000
                    </p>
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="group relative w-full py-4 bg-rose-500 text-[#0a192f] rounded-xl font-bold overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                    <span className="relative z-10 flex items-center justify-center tracking-wider">
                      {loading ? (
                        "SENDING..."
                      ) : (
                        <>
                          <span
                            key={`${lang}-form-btn`}
                            className="animate-fade-up"
                          >
                            {t.contact.form.btn}
                          </span>
                          <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </SimpleSpotlightCard>
        </div>
      </div>
    </section>
  );
});
export default ContactPage;

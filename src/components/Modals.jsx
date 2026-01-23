import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { X, Lock, Save } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Input, Textarea, DragDropUploader } from "./UI";

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 3600000;
const ATTEMPT_WINDOW_MS = 900000;

const checkLoginAttempts = (email) => {
  const key = `login_attempts_${email}`;
  const lockoutKey = `login_lockout_${email}`;
  const now = Date.now();

  const lockoutTime = localStorage.getItem(lockoutKey);
  if (lockoutTime) {
    const remainingMs = parseInt(lockoutTime) - now;
    if (remainingMs > 0) {
      const remainingMins = Math.ceil(remainingMs / 60000);
      throw new Error(
        `Account locked. Try again in ${remainingMins} minute${remainingMins > 1 ? "s" : ""}.`,
      );
    } else {
      localStorage.removeItem(lockoutKey);
    }
  }

  const storedAttempts = localStorage.getItem(key);
  const attempts = storedAttempts ? JSON.parse(storedAttempts) : [];
  const recentAttempts = attempts.filter((t) => now - t < ATTEMPT_WINDOW_MS);

  if (recentAttempts.length >= MAX_LOGIN_ATTEMPTS) {
    const lockoutUntil = now + LOCKOUT_DURATION_MS;
    localStorage.setItem(lockoutKey, lockoutUntil.toString());
    throw new Error("Too many login attempts. Account locked for 1 hour.");
  }

  return recentAttempts;
};

const recordLoginAttempt = (email) => {
  const key = `login_attempts_${email}`;
  const attempts = checkLoginAttempts(email);
  attempts.push(Date.now());
  localStorage.setItem(key, JSON.stringify(attempts));
};

const clearLoginAttempts = (email) => {
  const key = `login_attempts_${email}`;
  localStorage.removeItem(key);
};

export const SecretLoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

    try {
      checkLoginAttempts(email);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      clearLoginAttempts(email);

      onLogin(userCredential.user.uid);
      onClose();
      toast.success("Authentication successful! Welcome, Admin.");
    } catch (err) {
      try {
        recordLoginAttempt(email);
      } catch (limitErr) {
        setError(true);
        setPassword("");
        toast.error(limitErr.message);
        setIsLoading(false);
        return;
      }

      setError(true);
      setPassword("");
      toast.error("Authentication failed. Please try again.");

      if (process.env.NODE_ENV === "development") {
        console.debug("[ADMIN DEBUG]", err.code);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#0f172a] border border-teal-500/30 p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          <X />
        </button>
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-teal-500/10 rounded-full mb-4 text-teal-400">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-widest">
            RESTRICTED ACCESS
          </h2>
          <p className="text-xs text-teal-500 mt-1">FIREBASE ADMIN SYSTEM</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
            disabled={isLoading}
            className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-teal-500 outline-none text-center tracking-widest placeholder-gray-600 transition-all disabled:opacity-50"
            placeholder="ENTER EMAIL"
            autoFocus
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            disabled={isLoading}
            className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-teal-500 outline-none text-center tracking-widest placeholder-gray-600 transition-all disabled:opacity-50"
            placeholder="ENTER PASSCODE"
          />
          {error && (
            <p className="text-red-500 text-xs text-center">
              Authentication failed. Please try again.
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-600 hover:bg-teal-500 text-black font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "AUTHENTICATING..." : "AUTHENTICATE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export const AdminModal = ({ isOpen, onClose, onSave, initialData, type }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData, isOpen]);
  if (!isOpen || !formData) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (fileUrl, file) => {
    if (type === "project") setFormData((prev) => ({ ...prev, img: fileUrl }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, null);
    onClose();
  };

  const mainValue = formData.title;
  const mainName = "title";
  const mainLabel = "Nama Proyek";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#1e293b] border border-teal-500/30 p-8 rounded-2xl shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          <X />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">
          {formData.id ? "Edit" : "Tambah"} Proyek
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAMA PROYEK */}
          <Input
            id="mainName"
            label={mainLabel}
            value={mainValue || ""}
            name={mainName}
            onChange={handleChange}
          />

          {type === "project" && (
            <>
              {/* --- INPUT BARU: LINK URL --- */}
              <Input
                id="link"
                label="Link Preview / Demo URL"
                value={formData.link || ""}
                name="link"
                onChange={handleChange}
              />
              {/* --------------------------- */}

              <Input
                id="tech"
                label="Teknologi (Dipisahkan koma)"
                value={formData.tech || ""}
                name="tech"
                onChange={handleChange}
              />
              <Textarea
                id="desc"
                label="Deskripsi Proyek"
                value={formData.desc || ""}
                name="desc"
                onChange={handleChange}
              />

              <DragDropUploader
                label="Foto Proyek (Hanya Preview Lokal)"
                currentImageUrl={formData.img}
                currentFile={null}
                onFileChange={handleFileChange}
              />
              <Input
                id="imgUrl"
                label="URL Gambar Eksternal"
                value={formData.img || ""}
                name="img"
                onChange={handleChange}
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-500 text-black font-bold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 mt-6"
          >
            <Save className="w-5 h-5" />
            <span>SIMPAN PERUBAHAN</span>
          </button>
        </form>
      </div>
    </div>
  );
};

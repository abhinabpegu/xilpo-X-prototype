import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Package, User } from "lucide-react";

// Dummy for now — wiring to i18n/content translation is a later milestone.
const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "as", label: "অস" },
  { code: "hi", label: "हिं" },
];

// Placeholder — will be sourced from the artisan's profile once auth exists.
const ARTISAN_NAME = "Rashmi Taye";

export default function Home() {
  const [lang, setLang] = useState("en");

  return (
    <div className="min-h-[100dvh] bg-cream flex flex-col">
      {/* Header: wordmark, language toggle, profile */}
      <header className="flex items-center justify-between px-6 pt-7 pb-4">
        <p className="text-lg font-semibold text-ink tracking-tight">xilpo-X</p>

        <div className="flex items-center gap-3">
          <div
            className="flex bg-surface border border-line rounded-full p-0.5"
            role="group"
            aria-label="Choose language"
          >
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={[
                  "px-2.5 py-1 rounded-full text-xs font-medium transition-colors min-w-[34px]",
                  lang === code ? "bg-ochre text-cream" : "text-ink-muted",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Profile"
            className="w-9 h-9 rounded-full border border-line bg-surface flex items-center justify-center text-ink shrink-0"
          >
            <User size={17} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Greeting */}
      <section className="px-6 pt-2 pb-8">
        <h1 className="text-[1.7rem] leading-snug font-semibold text-ink">
          Welcome, {ARTISAN_NAME}
        </h1>
        <p className="text-sm text-ink-muted mt-1.5">
          Here's your handloom business, in one place.
        </p>
      </section>

      {/* Primary actions */}
      <section className="flex-1 px-6 flex flex-col gap-3.5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3.5 bg-rust text-cream rounded-2xl px-5 py-5 text-left"
        >
          <span className="w-11 h-11 rounded-full bg-cream/15 flex items-center justify-center shrink-0">
            <Plus size={22} strokeWidth={2.25} aria-hidden="true" />
          </span>
          <span>
            <span className="block font-semibold text-lg leading-tight">Add New Product</span>
            <span className="block text-sm text-cream/80 mt-0.5">
              List a new piece with a photo and a price
            </span>
          </span>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3.5 bg-surface border border-line rounded-2xl px-5 py-5 text-left"
        >
          <span className="w-11 h-11 rounded-full bg-cream flex items-center justify-center shrink-0 border border-line">
            <Package size={20} strokeWidth={2} className="text-ink" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-semibold text-base text-ink leading-tight">
              View My Products
            </span>
            <span className="block text-sm text-ink-muted mt-0.5">
              See everything you've listed so far
            </span>
          </span>
        </motion.button>
      </section>

      <p className="text-center text-xs text-ink-muted pb-6 pt-10 font-bengali">
        শিল্প-X · your craft, your business
      </p>
    </div>
  );
}
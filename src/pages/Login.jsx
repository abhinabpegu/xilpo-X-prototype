import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const APP_NAME_EN = "xilpo-X";
const APP_NAME_AS = "শিল্প-X";

// Prototype-only demo persona — a real weaver's login will replace this
// once auth exists.
const DEMO_ARTISAN = "Rashmi Taye";

export default function Login() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Prototype: no real auth yet. Any input moves straight to the dashboard.
    navigate("/");
  }

  return (
    <div className="min-h-[100dvh] bg-cream flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-7 max-w-sm mx-auto w-full">
        {/* Wordmark */}
        <div className="mb-14">
          <p className="text-2xl font-semibold text-ink tracking-tight">{APP_NAME_EN}</p>
          <p className="text-sm text-ink-muted mt-0.5 font-bengali" lang="as">
            {APP_NAME_AS}
          </p>
        </div>

        {/* Welcome */}
        <div className="mb-9">
          <h1 className="text-[1.65rem] leading-snug font-semibold text-ink">
            Welcome back, {DEMO_ARTISAN}
          </h1>
          <p className="text-sm text-ink-muted mt-2 leading-relaxed max-w-[30ch]">
            Sign in to list your handloom products and keep track of your orders.
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink-muted">Phone number</span>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="98xxxxxxxx"
              className="border border-line rounded-lg px-3.5 py-3 text-base text-ink bg-surface placeholder:text-ink-muted/60 focus:outline-none focus:border-rust transition-colors"
            />
          </label>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            className="mt-1 bg-rust text-cream font-medium text-base py-3.5 rounded-lg"
          >
            Continue
          </motion.button>
        </form>

        {/* Demo shortcut — remove once real auth exists */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-5 self-start text-sm text-ink-muted underline underline-offset-2 decoration-line"
        >
          Skip — continue as {DEMO_ARTISAN} (demo)
        </button>
      </div>

      <p className="text-center text-xs text-ink-muted pb-6">
        {APP_NAME_EN} · your craft, your business
      </p>
    </div>
  );
}
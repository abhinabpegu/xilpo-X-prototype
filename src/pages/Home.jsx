import { motion } from "framer-motion";
import { Plus, Mic, Package, IndianRupee, TrendingUp } from "lucide-react";
import WeaveBorder from "../components/WeaveBorder";

// Placeholder — will be sourced from the artisan's profile once auth exists.
const ARTISAN_NAME = "Reeta";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Greeting */}
      <header className="bg-indigo px-6 pt-8 pb-7 text-cotton rounded-b-[2rem]">
        <p className="font-sans text-sm text-ochre-light font-medium">Good morning</p>
        <h1 className="font-display text-3xl font-bold mt-1 leading-tight">
          Welcome, {ARTISAN_NAME}
        </h1>
        <p className="font-sans text-sm text-cotton/80 mt-2 max-w-[26ch]">
          Here is how your handloom business is doing today.
        </p>
      </header>

      <WeaveBorder />

      {/* Quick stats */}
      <section className="px-5 -mt-1 grid grid-cols-2 gap-3" aria-label="Business summary">
        <StatCard icon={Package} label="Products listed" value="12" tone="bg-ochre/15 text-ochre" />
        <StatCard icon={IndianRupee} label="Earned this month" value="Rs 8,400" tone="bg-paddy/15 text-paddy" />
      </section>

      {/* Primary call to action */}
      <section className="px-5 mt-6">
        <motion.button
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-madder text-cotton font-display font-bold text-xl py-5 rounded-3xl shadow-lg shadow-madder/30"
          animate={{ scale: [1, 1.035, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          whileTap={{ scale: 0.96 }}
        >
          <Plus size={26} strokeWidth={3} aria-hidden="true" />
          Add New Product
        </motion.button>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 mt-3 border-2 border-indigo/15 text-indigo font-sans font-semibold py-3.5 rounded-3xl active:bg-indigo/5"
        >
          <Mic size={20} aria-hidden="true" />
          Speak instead
        </button>
      </section>

      {/* Recent activity */}
      <section className="px-5 mt-7 mb-6">
        <h2 className="font-display font-semibold text-lg text-ink mb-3">Recent activity</h2>
        <div className="flex flex-col gap-2.5">
          <ActivityRow
            icon={TrendingUp}
            title="New order received"
            detail="Mekhela chador · Buyer in Guwahati"
          />
          <ActivityRow
            icon={Package}
            title="Product listed"
            detail="Ribi-pattern gamosa · Added yesterday"
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, tone }) {
  return (
    <div className="bg-white rounded-2xl border border-ink/5 p-4 flex flex-col gap-2">
      <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${tone}`}>
        <Icon size={18} aria-hidden="true" />
      </span>
      <p className="font-display font-bold text-xl text-ink leading-none">{value}</p>
      <p className="font-sans text-xs text-ink/55 leading-snug">{label}</p>
    </div>
  );
}

function ActivityRow({ icon: Icon, title, detail }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl border border-ink/5 p-3.5">
      <span className="w-10 h-10 shrink-0 rounded-xl bg-indigo/10 text-indigo flex items-center justify-center">
        <Icon size={18} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-sans font-semibold text-sm text-ink truncate">{title}</p>
        <p className="font-sans text-xs text-ink/50 truncate">{detail}</p>
      </div>
    </div>
  );
}

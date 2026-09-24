import { ArrowLeft } from "lucide-react";
import { useFlow } from "../flow.jsx";

/**
 * Full-screen on a phone. On a laptop it shows as a centred phone-sized card
 * so you can still preview it. Overlays like the camera are absolutely
 * positioned against this frame (it is `relative`).
 */
export default function AppFrame({ children }) {
  const { step, back } = useFlow();

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-[#e6dccb] md:p-6">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-cream md:h-[820px] md:max-h-full md:w-[400px] md:rounded-[2.5rem] md:border-10 md:border-ink md:shadow-2xl">
        <header className="flex items-center gap-1 px-3 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <button
            type="button"
            onClick={back}
            aria-label="Back"
            className={`flex h-11 w-11 items-center justify-center rounded-full ${step === 0 ? "invisible" : ""}`}
          >
            <ArrowLeft size={24} aria-hidden="true" />
          </button>
          <div className="leading-tight">
            <p className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold tracking-wide">Xilpo</span>
              <span lang="as" className="text-base text-muted">শিল্প</span>
            </p>
            <p className="text-[11px] text-muted">An AI assistant for artisans</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-5 pb-6 pt-2">{children}</main>
      </div>
    </div>
  );
}

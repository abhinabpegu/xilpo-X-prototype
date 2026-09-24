import { useState } from "react";
import { Camera, Check, Sparkles } from "lucide-react";
import CameraCapture from "../components/CameraCapture.jsx";
import { useFlow } from "../flow.jsx";

const SHOTS = [
  { key: "front", label: "Front", hint: "Spread the whole cloth flat and fit it in the box" },
  { key: "back", label: "Back", hint: "Turn the cloth over and show the back" },
  { key: "closeup", label: "Close-up", hint: "Move close to the border or pattern" },
];

export default function Photos() {
  const { photos, setPhoto, next } = useFlow();
  const [active, setActive] = useState(null); // key of the shot being taken
  const taken = SHOTS.filter((s) => photos[s.key]).length;
  const activeShot = SHOTS.find((s) => s.key === active);

  return (
    <div>
      <h1 className="text-[22px] font-bold leading-tight">Show your product</h1>
      <p className="mb-4 mt-1 text-[13px] text-muted">Take 3 photos: front, back and close-up. Tap each box.</p>

      <div className="grid grid-cols-3 gap-2">
        {SHOTS.map(({ key, label }) => {
          const photo = photos[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              aria-label={photo ? `Retake ${label} photo` : `Take ${label} photo`}
              className={[
                "relative flex aspect-3/4 flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl transition-transform active:scale-[0.97]",
                photo ? "border-2 border-leaf" : "border-2 border-dashed border-ink/25 bg-white text-muted",
              ].join(" ")}
            >
              {photo ? (
                <>
                  <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-linear-to-t from-black/75 to-transparent pb-1.5 pt-6 text-xs font-semibold text-white">
                    <Check size={14} strokeWidth={3} aria-hidden="true" />
                    {label}
                  </span>
                </>
              ) : (
                <>
                  <Camera size={28} aria-hidden="true" />
                  <span className="text-xs font-semibold">{label}</span>
                </>
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-[13px] text-muted" aria-live="polite">
        {taken} of 3 photos taken
      </p>

      <button
        type="button"
        disabled={taken < 3}
        onClick={next}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-rust py-4 text-base font-semibold text-white disabled:opacity-40"
      >
        <Sparkles size={20} aria-hidden="true" />
        Analyse photos
      </button>

      {activeShot && (
        <CameraCapture
          key={activeShot.key}
          label={activeShot.label}
          hint={activeShot.hint}
          onClose={() => setActive(null)}
          onCapture={(dataUrl) => {
            setPhoto(activeShot.key, dataUrl);
            setActive(null);
          }}
        />
      )}
    </div>
  );
}

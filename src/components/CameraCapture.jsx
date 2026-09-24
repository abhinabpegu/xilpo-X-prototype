import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, Camera, Check, RotateCcw, CameraOff, Image as ImageIcon } from "lucide-react";

/**
 * CameraCapture
 * Full-frame camera overlay (covers AppFrame). Live viewfinder -> shutter ->
 * review (Retake / Use this photo). Rear camera on phones, webcam on laptops.
 * The saved photo is cropped to exactly what the viewfinder shows.
 *
 * If the live camera is unavailable (permission denied, no camera, plain http)
 * it falls back to the phone's camera app / gallery via <input type="file">,
 * so the flow never dead-ends.
 */

const MAX_EDGE = 1280;

const ERROR_TEXT = {
  NotAllowedError: "Camera is blocked. Allow camera access in your browser, or use the buttons below.",
  NotFoundError: "No camera found on this device. Use the buttons below.",
  NotReadableError: "Camera is being used by another app. Close it and try again, or use the buttons below.",
  Unsupported: "Live camera is not available here. Use the buttons below.",
};

function drawToDataUrl(source, sw, sh, sx = 0, sy = 0) {
  const scale = Math.min(1, MAX_EDGE / Math.max(sw, sh));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(sw * scale);
  canvas.height = Math.round(sh * scale);
  canvas.getContext("2d").drawImage(source, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.85);
}

async function fileToDataUrl(file) {
  const bitmap = await createImageBitmap(file);
  const url = drawToDataUrl(bitmap, bitmap.width, bitmap.height);
  bitmap.close?.();
  return url;
}

export default function CameraCapture({ label, hint, onCapture, onClose }) {
  const videoRef = useRef(null);
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const [status, setStatus] = useState("starting"); // starting | live | error
  const [errorCode, setErrorCode] = useState(null);
  const [shot, setShot] = useState(null); // data URL awaiting confirmation
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    let stream = null;
    let cancelled = false;

    (async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setErrorCode("Unsupported");
        setStatus("error");
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        const video = videoRef.current;
        video.srcObject = stream;
        await video.play().catch(() => {});
        setStatus("live");
      } catch (err) {
        if (!cancelled) {
          setErrorCode(err.name);
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const capture = () => {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    // Crop the frame to the aspect ratio actually visible on screen (object-cover).
    const box = v.getBoundingClientRect();
    const target = box.width / box.height;
    let sw = v.videoWidth;
    let sh = v.videoHeight;
    if (sw / sh > target) sw = sh * target;
    else sh = sw / target;
    setShot(drawToDataUrl(v, sw, sh, (v.videoWidth - sw) / 2, (v.videoHeight - sh) / 2));
    setFlashKey((k) => k + 1);
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      setShot(await fileToDataUrl(file));
    } catch {
      /* unreadable image: stay on the camera screen */
    }
  };

  const showLive = status === "live" && !shot;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Take photo: ${label}`}
      className="absolute inset-0 z-40 flex flex-col bg-ink text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <video
        ref={videoRef}
        playsInline
        muted
        className={`absolute inset-0 h-full w-full object-cover ${showLive ? "" : "invisible"}`}
      />
      {shot && (
        <img src={shot} alt={`Preview of ${label} photo`} className="absolute inset-0 h-full w-full object-cover" />
      )}

      {flashKey > 0 && (
        <motion.div
          key={flashKey}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-white"
          initial={{ opacity: 0.85 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between gap-3 bg-linear-to-b from-black/70 to-transparent px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close camera"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50"
        >
          <X size={24} strokeWidth={2.5} aria-hidden="true" />
        </button>
        <p className="text-xl font-bold">{label}</p>
        <span className="w-12" aria-hidden="true" />
      </div>

      {/* Middle: framing guide / status */}
      <div className="pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        {status === "starting" && <p className="text-sm text-white/80">Opening camera…</p>}

        {showLive && (
          <div className="aspect-3/4 max-h-full w-full max-w-[280px] rounded-3xl border-2 border-dashed border-white/70" />
        )}

        {status === "error" && !shot && (
          <div className="flex flex-col items-center gap-3">
            <CameraOff size={44} aria-hidden="true" />
            <p className="max-w-[28ch] text-sm text-white/90">
              {ERROR_TEXT[errorCode] ?? "The camera could not be opened. Use the buttons below."}
            </p>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="relative z-10 bg-linear-to-t from-black/80 to-transparent px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-6">
        {shot ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShot(null)}
              className="flex min-h-16 flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-white/40 bg-black/40 text-lg font-bold"
            >
              <RotateCcw size={22} aria-hidden="true" />
              Retake
            </button>
            <button
              type="button"
              onClick={() => onCapture(shot)}
              className="flex min-h-16 flex-[1.4] items-center justify-center gap-2 rounded-2xl bg-leaf text-lg font-bold"
            >
              <Check size={24} strokeWidth={3} aria-hidden="true" />
              Use this photo
            </button>
          </div>
        ) : (
          <>
            {hint && <p className="mb-4 text-center text-sm font-medium">{hint}</p>}

            {status === "error" ? (
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex min-h-16 items-center justify-center gap-2 rounded-2xl bg-rust text-lg font-bold"
                >
                  <Camera size={22} aria-hidden="true" />
                  Open phone camera
                </button>
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="flex min-h-16 items-center justify-center gap-2 rounded-2xl border-2 border-white/40 bg-black/40 text-lg font-bold"
                >
                  <ImageIcon size={22} aria-hidden="true" />
                  Choose from gallery
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 items-start">
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="flex flex-col items-center gap-1 justify-self-start px-1 py-1 text-xs font-semibold"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50">
                    <ImageIcon size={22} aria-hidden="true" />
                  </span>
                  Gallery
                </button>

                <button
                  type="button"
                  onClick={capture}
                  disabled={status !== "live"}
                  aria-label="Take photo"
                  className="flex flex-col items-center gap-1 justify-self-center text-xs font-semibold disabled:opacity-40"
                >
                  <span className="flex h-19 w-19 items-center justify-center rounded-full border-4 border-white">
                    <span className="h-14 w-14 rounded-full bg-white transition-transform active:scale-90" />
                  </span>
                  Take photo
                </button>

                <span aria-hidden="true" />
              </div>
            )}
          </>
        )}
      </div>

      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onFile} />
      <input ref={galleryInputRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
    </motion.div>
  );
}

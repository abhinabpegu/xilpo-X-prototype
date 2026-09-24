import { createContext, useCallback, useContext, useMemo, useState } from "react";

/**
 * Flow state for the whole "add a product" journey.
 * `step` indexes into SCREENS (src/screens/index.js); each new step adds its
 * own fields here as it gets built.
 */
const EMPTY_PHOTOS = { front: null, back: null, closeup: null };
const FlowContext = createContext(null);

export function FlowProvider({ total, children }) {
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState(EMPTY_PHOTOS);

  const next = useCallback(() => setStep((s) => Math.min(s + 1, total - 1)), [total]);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);
  const goTo = useCallback((i) => setStep(Math.max(0, Math.min(i, total - 1))), [total]);
  const setPhoto = useCallback((key, dataUrl) => setPhotos((p) => ({ ...p, [key]: dataUrl })), []);
  const reset = useCallback(() => {
    setPhotos(EMPTY_PHOTOS);
    setStep(0);
  }, []);

  const value = useMemo(
    () => ({ step, next, back, goTo, photos, setPhoto, reset }),
    [step, next, back, goTo, photos, setPhoto, reset]
  );
  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow() {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error("useFlow must be used inside <FlowProvider>");
  return ctx;
}

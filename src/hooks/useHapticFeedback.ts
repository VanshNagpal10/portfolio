import { useCallback } from "react";

const useHapticFeedback = () => {
  const triggerHaptics = useCallback((_light?: boolean) => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(_light ? 10 : 25);
      } catch {
        // Ignore if vibration is blocked
      }
    }
  }, []);

  return { triggerHaptics };
};

export default useHapticFeedback;

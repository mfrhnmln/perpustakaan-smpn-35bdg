import { useEffect } from "react";

export function useDisableBodyScroll(active) {
  useEffect(() => {
    const original = document.body.style.overflow;

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original;
    }

    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
}

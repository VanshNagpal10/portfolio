import { useEffect, useRef, useState } from "react";
import useTimeout from "@/hooks/utils/useTimeout";

interface UseScrollIntoViewOptions {
  activeIndex: number;
  itemCount: number;
  mountDelay?: number;
  scrollNextItem?: boolean;
}

const useScrollIntoView = ({
  activeIndex,
  itemCount,
  mountDelay = 0,
  scrollNextItem = false,
}: UseScrollIntoViewOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(mountDelay === 0);

  useTimeout(
    () => setIsMounted(true),
    mountDelay || 0
  );

  useEffect(() => {
    if (isMounted && containerRef.current && itemCount) {
      const { children } = containerRef.current;
      if (scrollNextItem) {
        (children[activeIndex + 1] as HTMLElement)?.scrollIntoView({ block: "nearest" });
      } else {
        (children[activeIndex] as HTMLElement)?.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex, isMounted, itemCount, scrollNextItem]);

  return containerRef;
};

export default useScrollIntoView;

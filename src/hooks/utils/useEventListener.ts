import { useRef, useEffect } from "react";

const useEventListener = <TEvent extends string>(
  eventName: TEvent,
  handler: (...args: any) => void,
  element = typeof window === "undefined" ? undefined : window
) => {
  const savedHandler = useRef<any>(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [eventName, handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: any) =>
      savedHandler && savedHandler.current && savedHandler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default useEventListener;

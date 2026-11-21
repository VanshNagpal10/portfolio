import { useCallback } from "react";
import useHapticFeedback from "@/hooks/useHapticFeedback";
import useViewContext from "./useViewContext";
import useEventListener from "@/hooks/utils/useEventListener";
import { IpodEvent } from "@/utils/events";

const useMenuHideView = (id: string) => {
  const { hideView, viewStack } = useViewContext();
  const { triggerHaptics } = useHapticFeedback();

  const handleClick = useCallback(() => {
    if (viewStack[viewStack.length - 1].id === id) {
      triggerHaptics();
      hideView();
    }
  }, [hideView, id, viewStack, triggerHaptics]);

  useEventListener<IpodEvent>("menuclick", handleClick);
};

export default useMenuHideView;

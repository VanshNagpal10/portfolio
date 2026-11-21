import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { SelectableListOption } from "@/components";
import { ViewId } from "@/components/views/registry";
import useHapticFeedback from "@/hooks/useHapticFeedback";
import { IpodEvent, ScrollEventDetail } from "@/utils/events";
import { VELOCITY_SKIP_THRESHOLDS } from "@/components/ClickWheel/constants";
import useEventListener from "@/hooks/utils/useEventListener";
import useViewContext from "./useViewContext";

const getSkipCount = (event: Event): number => {
  const velocity =
    event instanceof CustomEvent
      ? (event as CustomEvent<ScrollEventDetail>).detail?.velocity ?? 0
      : 0;

  let skip = 1;
  for (const tier of VELOCITY_SKIP_THRESHOLDS) {
    if (velocity >= tier.minVelocity) {
      skip = tier.skip;
    }
  }
  return skip;
};

const getInitIndex = (
  options: SelectableListOption[] = [],
  selectedOption?: SelectableListOption
): number => {
  if (selectedOption) {
    const selectedOptionIndex = options.findIndex(
      (option) => option === selectedOption
    );

    if (selectedOptionIndex > -1) {
      return selectedOptionIndex;
    }
  }

  return 0;
};

const useScrollHandler = (
  id: ViewId | "keyboard" | string,
  options: SelectableListOption[] = [],
  selectedOption?: SelectableListOption,
  onNearEndOfList?: (currentLength: number) => void
): [number] => {
  const { triggerHaptics } = useHapticFeedback();
  const { viewStack, setPreview } = useViewContext();
  const [index, setIndex] = useState(getInitIndex(options, selectedOption));
  const isActive = viewStack[viewStack.length - 1].id === id;

  const updatePreview = useCallback(
    (i: number) => {
      if (!isActive || !options[i]) return;
      const preview = options[i].preview;
      if (preview) {
        setPreview(preview);
      }
    },
    [isActive, options, setPreview]
  );

  const debouncedUpdatePreview = useDebouncedCallback(updatePreview, 750);

  const handleForwardScroll = useCallback(
    (event: Event) => {
      if (isActive) {
        triggerHaptics(true);
      }

      const skip = getSkipCount(event);

      setIndex((prevIndex) => {
        if (prevIndex < options.length - 1 && isActive) {
          const nextIndex = Math.min(prevIndex + skip, options.length - 1);
          debouncedUpdatePreview(nextIndex);

          if (nextIndex >= Math.round(options.length / 2)) {
            onNearEndOfList?.(options.length);
          }

          return nextIndex;
        }

        return prevIndex;
      });
    },
    [
      debouncedUpdatePreview,
      isActive,
      onNearEndOfList,
      options.length,
      triggerHaptics,
    ]
  );

  const handleBackwardScroll = useCallback(
    (event: Event) => {
      if (isActive) {
        triggerHaptics(true);
      }

      const skip = getSkipCount(event);

      setIndex((prevIndex) => {
        if (prevIndex > 0 && isActive) {
          const nextIndex = Math.max(prevIndex - skip, 0);
          debouncedUpdatePreview(nextIndex);
          return nextIndex;
        }

        return prevIndex;
      });
    },
    [debouncedUpdatePreview, isActive, triggerHaptics]
  );

  useEffect(() => {
    if (options.length && index > options.length - 1) {
      setIndex(0);
    }
  }, [index, options.length]);

  useEffect(() => {
    debouncedUpdatePreview(index);
  }, [index, debouncedUpdatePreview]);

  useEventListener<IpodEvent>("forwardscroll", handleForwardScroll);
  useEventListener<IpodEvent>("backwardscroll", handleBackwardScroll);

  return [index];
};

export default useScrollHandler;

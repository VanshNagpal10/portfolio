import { useCallback, useEffect, useRef } from "react";
import { SelectableListOption } from "@/components";
import { ViewId } from "@/components/views/registry";
import useHapticFeedback from "@/hooks/useHapticFeedback";
import useEventListener from "@/hooks/utils/useEventListener";
import useViewContext from "./useViewContext";
import { IpodEvent } from "@/utils/events";

interface UseOptionSelectOptions {
  id: ViewId | "keyboard" | string;
  options: SelectableListOption[];
  index: number;
}

const useOptionSelect = ({ id, options, index }: UseOptionSelectOptions) => {
  const { triggerHaptics } = useHapticFeedback();
  const { showView, showPopup, showActionSheet, viewStack } = useViewContext();

  const indexRef = useRef(index);
  useEffect(() => {
    indexRef.current = index;
  });

  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  const isActive = viewStack[viewStack.length - 1].id === id;

  const handleCenterClick = useCallback(async () => {
    const option = optionsRef.current[indexRef.current];
    if (!isActive || !option) return;
    triggerHaptics();

    switch (option.type) {
      case "link":
        window.open(option.url, "_blank");
        break;
      case "view":
        showView(option.viewId, option.props, option.headerTitle);
        break;
      case "action":
        option.onSelect();
        break;
      case "popup":
        showPopup({
          title: option.title,
          description: option.description,
          listOptions: option.listOptions,
          defaultSelectedIndex: option.defaultSelectedIndex,
        });
        break;
      case "actionSheet":
        showActionSheet({
          listOptions: option.listOptions,
        });
        break;
    }
  }, [isActive, triggerHaptics, showView, showPopup, showActionSheet]);

  const handleCenterLongClick = useCallback(async () => {
    const option = optionsRef.current[indexRef.current];
    if (!isActive || !option) return;

    if (option.longPressOptions) {
      showActionSheet({
        listOptions: option.longPressOptions,
      });
    }
  }, [isActive, showActionSheet]);

  useEventListener<IpodEvent>("centerclick", handleCenterClick);
  useEventListener<IpodEvent>("centerlongclick", handleCenterLongClick);
};

export default useOptionSelect;

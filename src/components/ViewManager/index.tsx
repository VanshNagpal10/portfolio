import SplitScreenViewManager from "@/components/ViewManager/SplitScreenViewManager";
import { VIEW_REGISTRY } from "@/components/views/registry";
import { useEventListener, useViewContext } from "@/hooks";
import {
  ViewInstance,
  ScreenViewInstance,
} from "@/providers/ViewContextProvider";
import styled from "styled-components";
import { IpodEvent } from "@/utils/events";

const Mask = styled.div`
  z-index: 100;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
`;

const hasSplitScreenPreview = (viewId: string) => {
  const config = VIEW_REGISTRY[viewId as keyof typeof VIEW_REGISTRY];
  return config?.isSplitScreen ?? false;
};

const isScreenView = (view: ViewInstance): view is ScreenViewInstance =>
  view.type === "screen";

export const ViewManager = () => {
  const { viewStack, resetViews } = useViewContext();

  const screenViews = viewStack.filter(isScreenView);
  const splitScreenViews = screenViews.filter(
    (view) => hasSplitScreenPreview(view.id)
  );
  const fullScreenViews = screenViews.filter(
    (view) => !hasSplitScreenPreview(view.id)
  );

  const currentView = viewStack[viewStack.length - 1];
  const shouldDisableLongPress =
    currentView?.type === "screen" &&
    VIEW_REGISTRY[currentView.id as keyof typeof VIEW_REGISTRY]?.disableLongPress;

  const handleMenuLongPress = () => {
    if (!shouldDisableLongPress) {
      resetViews();
    }
  };

  useEventListener<IpodEvent>("menulongpress", handleMenuLongPress);

  return (
    <div>
      <SplitScreenViewManager
        viewStack={splitScreenViews}
        menuHidden={fullScreenViews.length > 0}
        allHidden={false}
      />
      <Mask />
    </div>
  );
};

export default ViewManager;

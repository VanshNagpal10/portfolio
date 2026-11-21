import { useCallback, useContext } from "react";
import { SplitScreenPreview } from "@/components/previews";
import { VIEW_REGISTRY, ViewId, ViewProps } from "@/components/views/registry";
import {
  ActionSheetInstance,
  generateActionSheetId,
  generatePopupId,
  KeyboardInstance,
  PopupInstance,
  ScreenViewInstance,
  ViewContext,
  ViewInstance,
} from "@/providers/ViewContextProvider";

const useViewContext = () => {
  const [viewContextState, setViewContextState] = useContext(ViewContext);

  const setHeaderTitle = useCallback(
    (headerTitle?: string) => {
      setViewContextState((prevState) => ({
        ...prevState,
        headerTitle,
      }));
    },
    [setViewContextState]
  );

  const showView = useCallback(
    <TViewId extends ViewId>(
      viewId: TViewId,
      props?: ViewProps[TViewId],
      headerTitle?: string
    ) => {
      const config = VIEW_REGISTRY[viewId];
      if (!config) {
        console.error(`View not found in registry: ${viewId}`);
        return;
      }

      const viewInstance: ScreenViewInstance<TViewId> = {
        type: "screen",
        id: viewId,
        props,
        headerTitle,
      };

      setViewContextState((prevViewState) => ({
        ...prevViewState,
        viewStack: [...prevViewState.viewStack, viewInstance],
        headerTitle: headerTitle ?? config.title ?? viewId,
      }));
    },
    [setViewContextState]
  );

  const showActionSheet = useCallback(
    (options: Omit<ActionSheetInstance, "type" | "id">) => {
      const viewInstance: ActionSheetInstance = {
        type: "actionSheet",
        id: generateActionSheetId(),
        ...options,
      };

      setViewContextState((prevViewState) => ({
        ...prevViewState,
        viewStack: [...prevViewState.viewStack, viewInstance],
      }));
    },
    [setViewContextState]
  );

  const showPopup = useCallback(
    (options: Omit<PopupInstance, "type" | "id">) => {
      const viewInstance: PopupInstance = {
        type: "popup",
        id: generatePopupId(),
        ...options,
      };

      setViewContextState((prevViewState) => ({
        ...prevViewState,
        viewStack: [...prevViewState.viewStack, viewInstance],
      }));
    },
    [setViewContextState]
  );

  const showKeyboard = useCallback(
    (options: Omit<KeyboardInstance, "type">) => {
      const viewInstance: KeyboardInstance = {
        type: "keyboard",
        ...options,
      };

      setViewContextState((prevViewState) => ({
        ...prevViewState,
        viewStack: [...prevViewState.viewStack, viewInstance],
      }));
    },
    [setViewContextState]
  );

  const hideView = useCallback(
    (id?: string) => {
      if (viewContextState.viewStack.length === 1) return;
      setViewContextState((prevViewState) => {
        const newViewStack = id
          ? prevViewState.viewStack.filter((view) => view.id !== id)
          : prevViewState.viewStack.slice(0, -1);
        const newTopView = newViewStack[newViewStack.length - 1];

        let headerTitle: string | undefined;
        if (newTopView.type === "screen") {
          const config = VIEW_REGISTRY[newTopView.id as ViewId];
          headerTitle = newTopView.headerTitle ?? config?.title;
        } else if ("headerTitle" in newTopView) {
          headerTitle = newTopView.headerTitle;
        }

        return {
          ...prevViewState,
          headerTitle,
          viewStack: newViewStack,
        };
      });
    },
    [setViewContextState, viewContextState.viewStack.length]
  );

  const resetViews = useCallback(() => {
    setViewContextState((prevState) => ({
      ...prevState,
      viewStack: prevState.viewStack.slice(0, 1),
    }));
  }, [setViewContextState]);

  const isViewActive = useCallback(
    (id: string) => {
      const { viewStack } = viewContextState;
      const curView = viewStack[viewStack.length - 1];
      return curView.id === id;
    },
    [viewContextState]
  );

  const setScreenViewOptions = useCallback(
    (
      viewId: ViewInstance["id"],
      options: Partial<Omit<ScreenViewInstance, "id">>
    ) => {
      setViewContextState((prevState) => {
        const viewIndex = prevState.viewStack.findIndex(
          ({ id }) => id === viewId
        );

        if (viewIndex === -1) {
          console.error("View not found: ", viewId);
          return prevState;
        }

        const view = prevState.viewStack[viewIndex];

        if (view?.type !== "screen") {
          console.error("View is not a screen: ", view);
          return prevState;
        }

        const updatedView = { ...view, ...options };
        const newViewStack = [...prevState.viewStack];
        newViewStack[viewIndex] = updatedView;

        return {
          ...prevState,
          viewStack: newViewStack,
        };
      });
    },
    [setViewContextState]
  );

  const setPreview = useCallback(
    (preview: SplitScreenPreview) => {
      setViewContextState((prevState) => ({
        ...prevState,
        preview,
      }));
    },
    [setViewContextState]
  );

  return {
    showView,
    showActionSheet,
    showPopup,
    showKeyboard,
    hideView,
    resetViews,
    isViewActive,
    preview: viewContextState.preview,
    viewStack: viewContextState.viewStack,
    headerTitle: viewContextState.headerTitle,
    setScreenViewOptions,
    setHeaderTitle,
    setPreview,
  };
};

export default useViewContext;

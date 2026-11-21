"use client";
import { createContext, useState } from "react";
import { SelectableListOption } from "@/components/SelectableList";
import { SplitScreenPreview } from "@/components/previews";
import { ViewId, ViewProps, VIEW_REGISTRY } from "@/components/views/registry";

export const generatePopupId = () => `popup-${crypto.randomUUID()}`;
export const generateActionSheetId = () => `action-sheet-${crypto.randomUUID()}`;

export type ScreenViewInstance<TViewId extends ViewId = ViewId> = {
  type: "screen";
  id: TViewId;
  props?: ViewProps[TViewId];
  headerTitle?: string;
  onClose?: (..._args: any[]) => void;
  styles?: Record<string, any>;
};

export type ActionSheetInstance = {
  type: "actionSheet";
  id: string;
  listOptions: SelectableListOption[];
  headerTitle?: string;
  onClose?: (..._args: any[]) => void;
};

export type PopupInstance = {
  type: "popup";
  id: string;
  title: string;
  description?: string;
  listOptions?: SelectableListOption[];
  defaultSelectedIndex?: number;
  onClose?: (..._args: any[]) => void;
};

export type KeyboardInstance = {
  type: "keyboard";
  id: "keyboard";
  initialValue?: string;
  onClose?: (..._args: any[]) => void;
};

export type CoverFlowInstance = {
  type: "coverFlow";
  id: string;
  onClose?: (..._args: any[]) => void;
};

export type ViewInstance =
  | ScreenViewInstance
  | ActionSheetInstance
  | PopupInstance
  | KeyboardInstance
  | CoverFlowInstance;

interface ViewContextState {
  viewStack: ViewInstance[];
  headerTitle?: string;
  preview: SplitScreenPreview;
}

type ViewContextStateType = [
  ViewContextState,
  React.Dispatch<React.SetStateAction<ViewContextState>>,
];

export const ViewContext = createContext<ViewContextStateType>([
  {
    viewStack: [],
    headerTitle: "Vansh Nagpal",
    preview: SplitScreenPreview.Projects,
  },
  () => {},
]);

interface Props {
  children: React.ReactNode;
}

const ViewContextProvider = ({ children }: Props) => {
  const baseView: ScreenViewInstance<"home"> = {
    type: "screen",
    id: "home",
  };

  const viewStack: ViewInstance[] = [baseView];
  const [viewContextState, setViewContextState] = useState<ViewContextState>({
    viewStack,
    headerTitle: VIEW_REGISTRY.home.title,
    preview: SplitScreenPreview.Projects,
  });

  return (
    <ViewContext.Provider value={[viewContextState, setViewContextState]}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContextProvider;

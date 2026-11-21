import { HomeView } from "./HomeView";

export const VIEW_REGISTRY = {
  home: HomeView.viewConfig,
} as const;

export type ViewId = keyof typeof VIEW_REGISTRY;

type ExtractProps<T> =
  T extends { component: (...args: infer A) => any }
    ? A extends [infer P, ...any[]]
      ? P
      : {}
    : never;

export type ViewProps = {
  [K in ViewId]: ExtractProps<(typeof VIEW_REGISTRY)[K]>;
};

export type { ViewType, ViewConfigDef } from "./defineView";

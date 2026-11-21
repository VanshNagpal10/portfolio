"use client";
import { useMemo } from "react";
import { defineView } from "@/components/views/defineView";
import { SelectableListOption } from "@/components/SelectableList";
import SelectableListView from "@/components/SelectableListView";
import { SplitScreenPreview } from "@/components/previews";

const _HomeView = () => {
  const options: SelectableListOption[] = useMemo(
    () => [
      {
        type: "action",
        label: "Projects",
        preview: SplitScreenPreview.Projects,
        onSelect: () => window.location.assign("/projects"),
      },
      {
        type: "action",
        label: "Experience",
        preview: SplitScreenPreview.Experience,
        onSelect: () => window.location.assign("/experience"),
      },
      {
        type: "action",
        label: "Honors & Wins",
        preview: SplitScreenPreview.Honors,
        onSelect: () => window.location.assign("/honors"),
      },
      {
        type: "action",
        label: "About & Leadership",
        preview: SplitScreenPreview.About,
        onSelect: () => window.location.assign("/about"),
      },
      {
        type: "action",
        label: "Contact & Resume",
        preview: SplitScreenPreview.Contact,
        onSelect: () => window.location.assign("/contact"),
      },
    ],
    []
  );

  return <SelectableListView viewId="home" options={options} />;
};

export const HomeView = Object.assign(_HomeView, {
  viewConfig: defineView({
    component: _HomeView,
    type: "split",
    title: "Vansh Nagpal",
    isSplitScreen: true,
  }),
});

import * as Theme from "@/utils/constants/Theme";

const supportedThemes = {
  silver: "silver",
  black: "black",
  u2: "u2",
};

export type DeviceThemeName = keyof typeof supportedThemes;

export const getTheme = (deviceTheme: DeviceThemeName): Theme.DeviceTheme => {
  switch (deviceTheme) {
    case "black":
      return Theme.Black;
    case "u2":
      return Theme.U2;
    default:
      return Theme.Silver;
  }
};

export const getThemeParam = () => {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const themeParam = params.get("theme")?.toLowerCase();

  if (!themeParam || !(themeParam in supportedThemes)) {
    return;
  }

  localStorage.setItem("ipodSelectedDeviceTheme", themeParam);
  return themeParam as DeviceThemeName;
};

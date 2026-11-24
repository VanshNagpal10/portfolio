"use client";
import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { DeviceThemeName, getThemeParam } from "@/utils/themes";

export const DEVICE_COLOR_KEY = "ipodSelectedDeviceTheme";

export interface SettingsState {
  deviceTheme: DeviceThemeName;
}

type SettingsContextType = [
  SettingsState,
  React.Dispatch<React.SetStateAction<SettingsState>>,
];

export const SettingsContext = createContext<SettingsContextType>([
  { deviceTheme: "black" },
  () => {},
]);

export type SettingsHook = SettingsState & {
  setDeviceTheme: (deviceTheme: DeviceThemeName) => void;
};

export const useSettings = (): SettingsHook => {
  const [state, setState] = useContext(SettingsContext);

  const setDeviceTheme = useCallback(
    (deviceTheme: DeviceThemeName) => {
      setState((prevState) => ({ ...prevState, deviceTheme }));
      if (typeof window !== "undefined") {
        localStorage.setItem(DEVICE_COLOR_KEY, deviceTheme);
      }
    },
    [setState]
  );

  return {
    ...state,
    setDeviceTheme,
  };
};

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<SettingsState>(() => {
    if (typeof window !== "undefined") {
      const urlTheme = getThemeParam();
      if (urlTheme) return { deviceTheme: urlTheme };
      const savedTheme = localStorage.getItem(DEVICE_COLOR_KEY) as DeviceThemeName;
      if (savedTheme) return { deviceTheme: savedTheme };
    }
    return { deviceTheme: "black" };
  });

  return (
    <SettingsContext.Provider value={[state, setState]}>
      {children}
    </SettingsContext.Provider>
  );
};

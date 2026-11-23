"use client";
import { memo } from "react";
import { SettingsContext, SettingsProvider } from "@/hooks/utils/useSettings";
import { ClickWheel } from "@/components/ClickWheel";
import { ViewManager } from "@/components/ViewManager";
import {
  ScreenContainer,
  ClickWheelContainer,
  Shell,
  Sticker,
  Sticker2,
  Sticker3,
  HeadphoneJackPort,
} from "@/components/Ipod/Styled";
import ViewContextProvider from "@/providers/ViewContextProvider";
import { GlobalStyles } from "@/components/Ipod/GlobalStyles";
import { useAudio } from "@/context/AudioContext";

const Ipod = () => {
  const { isPlugged } = useAudio();

  return (
    <SettingsProvider>
      <GlobalStyles />
      <ViewContextProvider>
        <SettingsContext.Consumer>
          {([{ deviceTheme }]) => (
            <Shell $deviceTheme={deviceTheme}>
              <HeadphoneJackPort id="ipod-headphone-jack" $isPlugged={isPlugged} />
              <Sticker $deviceTheme={deviceTheme} />
              <Sticker2 $deviceTheme={deviceTheme} />
              <Sticker3 $deviceTheme={deviceTheme} />
              <ScreenContainer>
                <ViewManager />
              </ScreenContainer>
              <ClickWheelContainer>
                <ClickWheel />
              </ClickWheelContainer>
            </Shell>
          )}
        </SettingsContext.Consumer>
      </ViewContextProvider>
    </SettingsProvider>
  );
};

export default memo(Ipod);

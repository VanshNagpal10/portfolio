import styled from "styled-components";
import { Screen, Unit } from "@/utils/constants";
import { DeviceThemeName, getTheme } from "@/utils/themes";

export const Shell = styled.div<{ $deviceTheme: DeviceThemeName }>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 560px;
  width: 350px;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 30px;
  box-shadow: inset 0 0 2.4em #555, 0 24px 60px rgba(0, 0, 0, 0.65);
  background: ${({ $deviceTheme }) => getTheme($deviceTheme).body.background};
  -webkit-box-reflect: below 2px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(60%, transparent), to(rgba(255, 255, 255, 0.2)));
  animation: descend 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
    box-shadow: inset 0 0 2.4em rgba(0, 0, 0, 0.8), 0 24px 60px rgba(0, 0, 0, 0.9);
  }

  ${Screen.SM.MediaQuery} {
    animation: none;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    -webkit-box-reflect: unset;
  }

  @keyframes descend {
    0% {
      transform: scale(0.6);
      opacity: 0;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const ScreenContainer = styled.div`
  position: relative;
  height: 260px;
  margin: ${Unit.LG} ${Unit.LG} 0;
  border: 4px solid black;
  border-radius: ${Unit.XS};
  overflow: hidden;
  background: white;
  animation: fadeFromBlack 0.5s;

  @keyframes fadeFromBlack {
    0% {
      filter: brightness(0);
    }
  }

  ${Screen.SM.MediaQuery} {
    margin: calc(${Unit.MD} + env(safe-area-inset-top)) ${Unit.MD} 0;
  }
`;

export const ClickWheelContainer = styled.div`
  margin: auto;
`;

export const Sticker = styled.div<{ $deviceTheme: DeviceThemeName }>`
  position: absolute;
  background: ${({ $deviceTheme }) =>
    getTheme($deviceTheme).body.sticker1?.background};
  ${({ $deviceTheme: deviceTheme }) =>
    getTheme(deviceTheme).body.sticker1?.styles ?? {}};
`;

export const Sticker2 = styled.div<{ $deviceTheme: DeviceThemeName }>`
  position: absolute;
  background: ${({ $deviceTheme }) =>
    getTheme($deviceTheme).body.sticker2?.background};
  ${({ $deviceTheme: deviceTheme }) =>
    getTheme(deviceTheme).body.sticker2?.styles ?? {}};
`;

export const Sticker3 = styled.div<{ $deviceTheme: DeviceThemeName }>`
  position: absolute;
  background: ${({ $deviceTheme }) =>
    getTheme($deviceTheme).body.sticker3?.background};
  ${({ $deviceTheme: deviceTheme }) =>
    getTheme(deviceTheme).body.sticker3?.styles ?? {}};
`;

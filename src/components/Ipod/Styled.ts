import styled from "styled-components";
import { Screen, Unit } from "@/utils/constants";
import { DeviceThemeName, getTheme } from "@/utils/themes";

export const Shell = styled.div<{ $deviceTheme: DeviceThemeName }>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 590px;
  width: 370px;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 30px;
  box-shadow: inset 0 0 2.4em rgba(0, 0, 0, 0.9), 0 24px 60px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.1);
  background: ${({ $deviceTheme }) => getTheme($deviceTheme).body.background};
  -webkit-box-reflect: below 2px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(60%, transparent), to(rgba(255, 255, 255, 0.15)));
  animation: descend 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
    box-shadow: inset 0 0 2.4em black;
  }

  ${Screen.SM.MediaQuery} {
    animation: none;
    width: 100vw;
    max-height: unset;
    border-radius: 0;
    -webkit-box-reflect: unset;
  }

  @keyframes descend {
    0% {
      transform: scale(0.3);
      opacity: 0;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const HeadphoneJackPort = styled.div<{ $isNear?: boolean; $isPlugged?: boolean }>`
  position: absolute;
  top: 6px;
  left: 32px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #181818 0%, #000000 65%, #2a2a2a 100%);
  border: 1.5px solid #777777;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.95), 0 1px 1px rgba(255, 255, 255, 0.25);
  z-index: 10;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;

  ${({ $isNear }) =>
    $isNear &&
    `
    border-color: #388EE9;
    box-shadow: 0 0 14px #388EE9, inset 0 0 5px #388EE9;
    transform: scale(1.2);
  `}

  ${({ $isPlugged }) =>
    $isPlugged &&
    `
    border-color: #22c55e;
    box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
  `}
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

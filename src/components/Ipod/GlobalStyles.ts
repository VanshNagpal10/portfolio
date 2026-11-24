import { createGlobalStyle } from "styled-components";
import { Screen } from "@/utils/constants";

export const GlobalStyles = createGlobalStyle`
  body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    color: #e2e4e9;
    background: #090a0d;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  @media (display-mode: standalone) {
    body {
      height: 100vh;
    }
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
    body {
      background: black;
    }
  }
`;

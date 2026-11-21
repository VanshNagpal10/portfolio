import styled from "styled-components";

export enum SplitScreenPreview {
  Projects = "projects",
  Experience = "experience",
  Honors = "honors",
  About = "about",
  Contact = "contact",
}

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 16px;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const Emoji = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;

const Title = styled.h3`
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 700;
  color: #111;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 11px;
  color: #666;
  line-height: 1.4;
`;

const ProjectsPreview = () => (
  <PreviewContainer>
    <Emoji>💿</Emoji>
    <Title>6 Shipped Builds</Title>
    <Subtitle>Ping · KWIK · RIMO · CodeGenie · BrickByte · IntelliDocs</Subtitle>
  </PreviewContainer>
);

const ExperiencePreview = () => (
  <PreviewContainer>
    <Emoji>💼</Emoji>
    <Title>Software Developer</Title>
    <Subtitle>KhwaaishAI · Digital Dreams · VIPS-TC (9.04 CGPA)</Subtitle>
  </PreviewContainer>
);

const HonorsPreview = () => (
  <PreviewContainer>
    <Emoji>🏆</Emoji>
    <Title>Apple SSC '26 Winner</Title>
    <Subtitle>Reliance Foundation Scholar · 9× Hackathon Winner</Subtitle>
  </PreviewContainer>
);

const AboutPreview = () => (
  <PreviewContainer>
    <Emoji>⚡</Emoji>
    <Title>Full-Stack & iOS Engineer</Title>
    <Subtitle>Swift · React · Next.js · TypeScript · SceneKit · Python</Subtitle>
  </PreviewContainer>
);

const ContactPreview = () => (
  <PreviewContainer>
    <Emoji>✉️</Emoji>
    <Title>Let's Connect</Title>
    <Subtitle>GitHub · LinkedIn · X · Email</Subtitle>
  </PreviewContainer>
);

export const Previews: Record<SplitScreenPreview, React.FC> = {
  [SplitScreenPreview.Projects]: ProjectsPreview,
  [SplitScreenPreview.Experience]: ExperiencePreview,
  [SplitScreenPreview.Honors]: HonorsPreview,
  [SplitScreenPreview.About]: AboutPreview,
  [SplitScreenPreview.Contact]: ContactPreview,
};

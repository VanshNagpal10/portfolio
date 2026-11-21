import { fade } from "@/animation";
import { motion } from "motion/react";
import styled from "styled-components";
import LoadingIndicator from "@/components/LoadingIndicator";

interface ContainerProps {
  $backgroundColor?: string;
}

const Container = styled(motion.div)<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: ${(props) => props.$backgroundColor};
`;

interface Props {
  size?: number;
  backgroundColor?: string;
}

const LoadingScreen = ({ size, backgroundColor }: Props) => {
  return (
    <Container {...fade} $backgroundColor={backgroundColor}>
      <LoadingIndicator size={size || 24} />
    </Container>
  );
};

export default LoadingScreen;

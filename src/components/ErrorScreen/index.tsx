import styled from "styled-components";
import { Unit } from "@/utils/constants";

const RootContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
`;

const Text = styled.p`
  margin-top: ${Unit.MD};
  font-size: 14px;
  max-width: 180px;
  color: rgb(100, 100, 100);
`;

interface Props {
  message?: string;
  showImage?: boolean;
}

const ErrorScreen = ({ message = "Something went wrong" }: Props) => {
  return (
    <RootContainer>
      <div>
        <Text>{message}</Text>
      </div>
    </RootContainer>
  );
};

export default ErrorScreen;

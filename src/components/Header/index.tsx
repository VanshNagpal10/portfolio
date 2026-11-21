import BatteryIndicator from "@/components/BatteryIndicator";
import { useViewContext } from "@/hooks";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
  height: 20px;
  background: linear-gradient(180deg, #feffff 0%, #b1b6b9 100%);
  border-bottom: 1px solid #7995a3;
  min-width: 0;
`;

const Text = styled.h3`
  margin: 0;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
  flex: 1;
`;

const StyledBatteryIndicator = styled(BatteryIndicator)`
  margin-left: 8px;
`;

const Header = () => {
  const { headerTitle } = useViewContext();

  return headerTitle ? (
    <Container>
      <Text>{headerTitle}</Text>
      <StyledBatteryIndicator />
    </Container>
  ) : null;
};

export default Header;

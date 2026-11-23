import BatteryIndicator from "@/components/BatteryIndicator";
import { useViewContext } from "@/hooks";
import styled from "styled-components";
import { useAudio } from "@/context/AudioContext";

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

const PlayTriangle = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 6px solid #222;
  margin-right: 6px;
`;

const Text = styled.h3`
  margin: 0;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
`;

const StyledBatteryIndicator = styled(BatteryIndicator)`
  margin-left: 8px;
`;

const Header = () => {
  const { headerTitle } = useViewContext();
  const { isPlugged, isPlaying } = useAudio();

  return headerTitle ? (
    <Container>
      <Text>
        {isPlugged && isPlaying && <PlayTriangle title="Now Playing" />}
        {headerTitle}
      </Text>
      <StyledBatteryIndicator />
    </Container>
  ) : null;
};

export default Header;

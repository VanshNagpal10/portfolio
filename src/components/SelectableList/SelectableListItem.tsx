import styled, { css } from "styled-components";
import { Unit } from "@/utils/constants";
import { SelectableListOption } from ".";

const LabelContainer = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: ${Unit.MD};
`;

const Label = styled.h3`
  margin: 0;
  padding: ${Unit.XXS};
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Sublabel = styled(Label)`
  padding: 0 ${Unit.XXS} ${Unit.XXS};
  margin-top: -4px;
  font-weight: normal;
  font-size: 12px;
  color: rgb(100, 100, 100);
`;

const Container = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  overflow: auto;
  cursor: pointer;
  user-select: none;

  ${(props) =>
    props.$isActive &&
    css`
      ${LabelContainer} {
        padding-right: 0;
      }

      ${Label}, ${Sublabel} {
        color: white;
      }
      background: linear-gradient(rgb(60, 184, 255) 0%, rgb(52, 122, 181) 100%);
    `};
`;

const Image = styled.img`
  height: 3rem;
  width: 3rem;
  margin-right: ${Unit.XXS};
`;

const Icon = styled.img<{ $size?: number }>`
  margin-left: auto;
  width: ${({ $size }) => ($size ? `${$size}px` : "auto")};
  height: ${({ $size }) => ($size ? `${$size}px` : "auto")};
`;

interface Props {
  option: SelectableListOption;
  isActive: boolean;
}

const SelectableListItem = ({ option, isActive }: Props) => {
  const handleClick = () => {
    if (option.type === "action" && option.onSelect) {
      option.onSelect();
    }
  };

  return (
    <Container $isActive={isActive} onClick={handleClick}>
      {option.imageUrl && <Image alt="List item" src={option.imageUrl} />}
      <LabelContainer>
        <Label>{option.label}</Label>
        {option.sublabel && <Sublabel>{option.sublabel}</Sublabel>}
      </LabelContainer>
      {isActive && <Icon src="/arrow_right.svg" alt="Active" />}
    </Container>
  );
};

export default SelectableListItem;

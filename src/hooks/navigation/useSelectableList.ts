import { SelectableListOption } from "@/components";
import useMenuHideView from "./useMenuHideView";
import useScrollHandler from "./useScrollHandler";
import useOptionSelect from "./useOptionSelect";

interface UseSelectableListOptions {
  viewId: string;
  options: SelectableListOption[];
  selectedOption?: SelectableListOption;
  onNearEndOfList?: (currentLength: number) => void;
  hideOnMenu?: boolean;
}

interface UseSelectableListResult {
  activeIndex: number;
}

const useSelectableList = ({
  viewId,
  options,
  selectedOption,
  onNearEndOfList,
  hideOnMenu = true,
}: UseSelectableListOptions): UseSelectableListResult => {
  if (hideOnMenu) useMenuHideView(viewId);

  const [activeIndex] = useScrollHandler(
    viewId,
    options,
    selectedOption,
    onNearEndOfList
  );

  useOptionSelect({ id: viewId, options, index: activeIndex });

  return { activeIndex };
};

export default useSelectableList;

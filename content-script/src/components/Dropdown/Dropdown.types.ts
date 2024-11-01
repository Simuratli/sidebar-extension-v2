import { APP_LOCATION, DROPDOWN_TYPE, IN_OUT } from "../../types/global.types";

export interface DropdownData {
  name: string;
  id: string;
  data: string[];
}

export interface DropdownPropTypes {
  withLabel?: boolean;
  createNewData: DropdownData;
  dataForExistedElements: DropdownData[];
  onViewMore: () => void;
  hideViewMore?: boolean;
  location: APP_LOCATION;
  onCreateNew?: () => void;
  inOut: IN_OUT;
  label?: string;
  withSearch?: boolean;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
  loader?: boolean;
  type?: DROPDOWN_TYPE;
  withRadioButton?: boolean;
  error?: string | null;
}

export interface DropdownElementPropTypes {
  createNew?: boolean;
  name: string;
  data: string[];
  onClickEdit?: () => void;
  onClickRedirect?: () => void;
  onCreateNew?: () => void;
  withRadioButton?: boolean;
  elementId: string;
}

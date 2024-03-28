type TSelectProps = {
  name: string;
  data: TSelectItem[];
  className: string;
  onSelect: (selectedItem: TSelectItem) => void; 
  multiple:Boolean
  
};

type TSelectItem = {
  index: number;
  data: string;
};

export type { TSelectProps, TSelectItem };

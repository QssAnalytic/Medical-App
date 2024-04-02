type TSelectProps = {
  name: string;
  data: TSelectItem[];
  className: string;
  onSelect: (selectedItem: TSelectItem) => void; 
  multiple:Boolean
  
};

type TSelectItem = {
  id: number;
  name: string;
};

export type { TSelectProps, TSelectItem };
 
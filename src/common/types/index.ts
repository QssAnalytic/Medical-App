type TSelectItem = {
  id: number;
  name: string;
  color?: string;
};

type TSelectProps = {
  name: string; 
  data: TSelectItem[];
  className: string;
  onSelect: (selectedItem: TSelectItem) => void; 
  multiple:Boolean;
  
};



export type { TSelectProps, TSelectItem };
 
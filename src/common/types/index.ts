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
  multiple: Boolean;
};

type TFormValues = {
  annotate_type?: string;
  hospital_ids?: number[];
  service_id?: number;
  service_id_st?: number;
  service_id_nd?: number;
  dates?: {
    year: number;
    month: number;
    day: number;
  };
};

export type { TSelectProps, TSelectItem, TFormValues };

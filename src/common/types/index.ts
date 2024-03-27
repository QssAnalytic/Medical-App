type TSelectProps = {
  name: string;
  data: TSelectItem[];
  className:string
};

type TSelectItem = {
  index: number;
  data: string;
};

export type { TSelectProps, TSelectItem };

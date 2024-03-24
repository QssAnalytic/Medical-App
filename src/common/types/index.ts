type TSelectProps = {
  name: string;
  data: TSelectItem[];
};

type TSelectItem = {
  index: number;
  data: string;
};

export type { TSelectProps, TSelectItem };

type THospital = {
  name: string;
  id: number;
};

type THospitalSecondary = {
  name: string;
  data: number;
};

interface IHospitalStatistic {
  statistics: THospitalSecondary[];
  max_count: number;
}

type TYear = {
  data: number;
  id: number;
};

type TMonth = {
  data: string;
  id: number;
};

enum ANNOTATES {
  Price = "price",
  Count = "count",
  Patients = "number_patients",
}

type TDay = TYear;

export type { THospital, THospitalSecondary, IHospitalStatistic, TDay, TMonth, TYear};
export {ANNOTATES}

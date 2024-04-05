interface FilterEndpoints {
  hospitals: (hos: string) => string;
  services: string;
}

const filterEndpoints: FilterEndpoints = {
  hospitals: (hospital) => `${hospital}/`,
  services: "services/",
};

export { filterEndpoints };

interface FilterEndpoints {
  hospitals: (hos: string) => string;
  services: string;
}

const filterEndpoints: FilterEndpoints = {
  hospitals: (hos) => `api/${hos}/`,
  services: "api/services/",
};

export { filterEndpoints };

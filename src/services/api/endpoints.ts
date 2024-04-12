const hospitalEndpoints = new (class {
  base = "hospitals/";
  services = `${this.base}services/`;
  lineBar = `${this.services}line-bar/`;
  charts = `${this.services}chart/`;
})();

export { hospitalEndpoints };

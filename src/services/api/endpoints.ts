const authEndpoints = new (class {
  signIn = `api/account/login/`;
  currentUser = "api/account/user/";
})();

const hospitalEndpoints = new (class {
  base = "hospitals/";
  services = `${this.base}services/`;
  lineBar = `${this.services}line-bar/`;
  charts = `${this.services}chart/`;
})();

const servicesEndpoints = new (class {
  base = "services/";
  lineBar = `${this.base}hospitals/line-bar/`;
})();

export { hospitalEndpoints, authEndpoints, servicesEndpoints };

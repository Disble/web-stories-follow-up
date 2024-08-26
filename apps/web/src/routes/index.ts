function path(root: string, ...sublink: string[]) {
  return `${root}${sublink.join("")}`;
}

const ROOTS_DASHBOARD = "/dashboard";
const ROOTS_AUTH = "/auth";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  default: path(ROOTS_DASHBOARD),
  users: {
    list: path(ROOTS_DASHBOARD, "/users"),
    create: path(ROOTS_DASHBOARD, "/users", "/create"),
    update: path(ROOTS_DASHBOARD, "/users", "/update"),
  },
  binnacles: path(ROOTS_DASHBOARD, "/binnacles"),
  settings: {
    root: path(ROOTS_DASHBOARD, "/settings"),
  },
} as const;

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signin: path(ROOTS_AUTH, "/login"),
  signup: path(ROOTS_AUTH, "/register"),
} as const;

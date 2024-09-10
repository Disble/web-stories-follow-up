function path(root: string, ...sublink: string[]) {
  const joinedSublink = sublink.join("/");
  return root === "/" ? `/${joinedSublink}` : `${root}/${joinedSublink}`;
}

const ROOTS_DASHBOARD = "/";
const ROOTS_AUTH = "/auth";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  default: path(ROOTS_DASHBOARD),
  users: {
    list: path(ROOTS_DASHBOARD, "users"),
    create: path(ROOTS_DASHBOARD, "users", "create"),
    update: path(ROOTS_DASHBOARD, "users", "update"),
  },
  novels: {
    list: path(ROOTS_DASHBOARD, "novels"),
    create: path(ROOTS_DASHBOARD, "novels", "create"),
    update: path(ROOTS_DASHBOARD, "novels", "update"),
  },
  authors: {
    list: path(ROOTS_DASHBOARD, "authors"),
    create: path(ROOTS_DASHBOARD, "authors", "create"),
    update: path(ROOTS_DASHBOARD, "authors", "update"),
  },
  publications: {
    list: path(ROOTS_DASHBOARD, "publications"),
    create: path(ROOTS_DASHBOARD, "publications", "create"),
    update: path(ROOTS_DASHBOARD, "publications", "update"),
  },
  settings: {
    list: path(ROOTS_DASHBOARD, "settings"),
  },
} as const;

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signin: path(ROOTS_AUTH, "/login"),
  signup: path(ROOTS_AUTH, "/register"),
} as const;

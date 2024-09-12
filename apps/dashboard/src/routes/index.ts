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

export const enumPathDashboard = {
  root: {
    path: PATH_DASHBOARD.root,
    title: "Inicio",
  },
  novels: {
    list: {
      path: PATH_DASHBOARD.novels.list,
      title: "Lista de novelas",
    },
    create: {
      path: PATH_DASHBOARD.novels.create,
      title: "Agregar novela",
    },
    update: {
      path: PATH_DASHBOARD.novels.update,
      title: "Actualizar novela",
    },
  },
  users: {
    list: {
      path: PATH_DASHBOARD.users.list,
      title: "Lista de usuarios",
    },
    create: {
      path: PATH_DASHBOARD.users.create,
      title: "Agregar usuario",
    },
    update: {
      path: PATH_DASHBOARD.users.update,
      title: "Actualizar usuario",
    },
  },
} as const;

export const getTitle = (pathname: string): string => {
  const findTitle = (
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    obj: Record<string, any>,
    path: string
  ): string | undefined => {
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        if (
          "path" in obj[key] &&
          "title" in obj[key] &&
          obj[key].path === path
        ) {
          return obj[key].title;
        }
        const result = findTitle(obj[key], path);
        if (result) return result;
      }
    }
    return undefined;
  };

  const title = findTitle(enumPathDashboard, pathname);

  if (title) return title;

  // Fallback: extract the last part of the path
  const parts = pathname.split("/");
  return (
    parts[parts.length - 1].charAt(0).toUpperCase() +
    parts[parts.length - 1].slice(1)
  );
};

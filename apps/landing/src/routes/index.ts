const ROOT = "/";

function path(root: string, ...sublink: string[]) {
  const joinedSublink = sublink.join("/");
  return root === "/" ? `/${joinedSublink}` : `${root}/${joinedSublink}`;
}

export const PATH_LANDING = {
  root: ROOT,
  privacyAndPolicy: path(ROOT, "privacy-and-policy"),
  termsAndConditions: path(ROOT, "terms-and-conditions"),
};

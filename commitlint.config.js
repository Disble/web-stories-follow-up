module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "root",
        "web",
        "config-auth",
        "config-eslint",
        "config-tailwind",
        "config-typescript",
        "layer-fetch",
        "layer-prisma",
        "types",
        "ui",
        "components",
        "actions",
        "app",
        "api"
      ]
    ]
  }
}

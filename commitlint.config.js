module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "root",
        "dashboard",
        "landing",
        "app",
        "components",
        "api",
        "packages",
      ]
    ]
  }
}

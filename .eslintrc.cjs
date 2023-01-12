module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:ava/recommended",
  ],
  rules: {
    "eqeqeq": ["error", "always", {null: "never"}],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {prefer: "type-imports", fixStyle: "inline-type-imports"},
    ],
    "@typescript-eslint/consistent-type-exports": "error",
  },
};

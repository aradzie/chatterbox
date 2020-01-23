module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["ava", "import", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:ava/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  rules: {
    "@typescript-eslint/no-use-before-define": "off",
  },
  overrides: [
    {
      files: ["*.test.ts"],
      rules: {
        "ava/no-ignored-test-files": "off",
      },
    },
  ],
};

const baseConfig = require('eslint-config-yenz')


module.exports = {
  ...baseConfig,
  "env": {
    "es2022": true,
    "jest": true,
    "node": true
  },
  "extends": [
    ...baseConfig.extends,
    "plugin:import/warnings",
    "plugin:import/typescript"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    ...baseConfig.parserOptions,
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname,
  },
  "plugins": [
    ...baseConfig.plugins,
    "@typescript-eslint",
    "perfectionist",
    "@typescript-eslint",
    "import"
  ],
  "rules": {
    ...baseConfig.rules,
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",

    // In theory these rules are nice, but more often than not it's just not applicable/useful
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",

    "perfectionist/sort-enums": "off",
    "no-console": "off",
    'no-magic-numbers': ['error',
      { ignoreArrayIndexes: true, ignore: [...baseConfig.rules['no-magic-numbers'][1].ignore] }],
  },
  "overrides": [
    {
      files: ["**/*.test.*"],
      rules: {
        "no-magic-numbers": "off"
      }
    },
    {
      files: ["src/migrations/**"],
      rules: {
        "all": "off" // Disable all rules for this directory
      }
    }
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  }
}

const config = {
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "es2020": true
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "import/no-dynamic-require": "off"
  }
};

module.exports = config;
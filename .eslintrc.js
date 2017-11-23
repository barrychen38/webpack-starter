// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // allow window
  eslintConfig: {
    globals: {
      window: true
    }
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  'rules': {
    // allow never used
    'no-unused-vars': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': 0
  }
}

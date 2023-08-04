module.exports = {
  root: true,
  rules: {
    // Rule 5: Require the use of semicolons
    semi: ['error', 'always'],

    // Rule 6: Disallow the use of
    'no-console': 'error',
    selector: 'ImportDeclaration',
    message: "Don't use 'import' as a reserved keyword.",
  },
};

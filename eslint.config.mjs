import antfu from '@antfu/eslint-config';

export default antfu(
  {
    ignores: ['*', '!app/**'],
    typescript: true,
    react: true,
  },
  {
    rules: {
      'style/semi': 'off',
      'style/member-delimiter-style': 'off',
      'style/jsx-quotes': ['error', 'prefer-single'],
      'antfu/top-level-function': 'off',
      'style/comma-dangle': 'off',
      'antfu/consistent-list-newline': 'off',
      'style/jsx-closing-bracket-location': 'off',
      'style/multiline-ternary': 'off',
      'style/indent': 'off',
      'style/eol-last': 'off',
      'style/brace-style': 'off',
      'style/arrow-parens': 'off',
    },
  }
);

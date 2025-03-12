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
      'style/jsx-quotes': ['error', 'prefer-single']
    },
  }
);

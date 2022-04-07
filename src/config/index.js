const env = process.env.NODE_ENV || 'development';

export const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: process.env.PORT || '3000',
  secrets: {
    jwt:  'learneverything',
    jwtExp: '100d',
  },
};

const env = process.env.NODE_ENV || 'development';

export const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: process.env.NODE_DOCKER_PORT || '8080',
  secrets: {
    jwt: 'learneverything',
    jwtExp: '100d',
  },
};

module.exports = {
  apps: [
    {
      name: 'node',
      cwd: './node',
      script: 'nodemon server.js',
    },
    {
      name: 'vue',
      cwd: './frontend',
      script: 'npm',
      args: 'run serve',
    },
    {
      name: 'strapi',
      cwd: './strapi',
      script: 'npm',
      args: 'run develop',
    },
  ],
};

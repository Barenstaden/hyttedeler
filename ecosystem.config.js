module.exports = {
  apps: [
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

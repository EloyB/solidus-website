module.exports = {
  apps: [
    {
      name: 'solidus',
      script: 'pnpm',
      args: 'start',
      cwd: '/var/www/solidus-website',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
    },
  ],
}

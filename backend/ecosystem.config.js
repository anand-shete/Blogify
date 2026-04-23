module.exports = {
  apps: [
    {
      name: "blogify",
      script: "./src/server.js",
      cwd: ".",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      autorestart: true,
      max_memory_restart: "280M",
      node_args: "--max-old-space-size=192",
      exp_backoff_restart_delay: 100,
      kill_timeout: 5000,
      listen_timeout: 8000,
      env_production: {
        NODE_ENV: "production",
      },
      out_file: "./logs/blogify-out.log",
      error_file: "./logs/blogify-error.log",
      merge_logs: true,
      time: true,
    },
  ],
};

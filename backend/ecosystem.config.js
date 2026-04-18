module.exports = {
  apps: [
    {
      name: "blogify",
      script: "./src/server.js",
      cwd: ".",
      instances: 1, // 1 node process
      exec_mode: "cluster",
      watch: false,
      autorestart: true,
      max_memory_restart: "350M",
      node_args: "--max-old-space-size=256",
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

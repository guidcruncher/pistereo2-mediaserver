
module.exports = {
  apps : [
  {
    name   : "API",
    cwd    : "/app/mediaserver",
    script : "main.js",
    env_production: {
    },
    env_development: {
    }
  },
  {
    name   : "Librespot",
    cwd    : "/app/librespot",
    script : "librespot.sh",
    env_production: {
    },
    env_development: {
    }
  },
  {
    name   : "MPV",
    cwd    : "/app/mpv",
    script : "mpv.sh",
    env_production: {
    },
    env_development: {
    }
  },
  {
    name   : "Server",
    cwd    : "/app/server",
    script : "start.sh",
    env_production: {
       NODE_ENV: "production",
    },
    env_development: {
       NODE_ENV: "development",
    }
  }
  ]
}


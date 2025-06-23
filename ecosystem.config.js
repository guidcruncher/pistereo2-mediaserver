
module.exports = {
  apps : [
  {
    name   : "API",
    cwd    : "/app/mediaserver",
    script : "api.sh",
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
  }
  ]
}


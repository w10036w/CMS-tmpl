module.exports = {
  "apps": [{
    "name": "back",
    "script": "index.js",
    "instances"  : 4,
    "exec_mode"  : "cluster",
    "watch": true,
    "env": {
      "NODE_ENV": "production"
    },
    "max_memory_restart": "256M",
    "log_date_format": "YYYY - MM - DD HH: mm Z"
  }]
}

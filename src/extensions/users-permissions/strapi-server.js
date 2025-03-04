"use strict";
const config = require("./server/config");
module.exports = (plugin) => {
  plugin.config = config;
  return plugin;
};

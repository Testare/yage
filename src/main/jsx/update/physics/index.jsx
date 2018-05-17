const fp = require("lodash/fp")
const collision = require('./collision-broad')

module.exports.updateState = fp.update('map', collision.runCollision)
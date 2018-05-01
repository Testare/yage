const _ = require('lodash')
module.exports.updatePhysics = (state, spriteName, physicsUpdate) => _.update(state,`map.spriteList.${spriteName}.physics`, (phys) => (Object.assign(phys, physicsUpdate)))
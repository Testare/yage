const _ = require('lodash/fp')
let cache = []

const getSpritesForGroup = (group, spriteList) => (
    _.map(
        spr=>spriteList[spr],
        (cache[group] || (cache[group] = _.map(spr=>spr.name, _.filter(spr => (spr.groups & group), spriteList))))
    )
)

const invalidateCache = _ => {
    cache = []
}
module.exports = {getSpritesForGroup, invalidateCache}
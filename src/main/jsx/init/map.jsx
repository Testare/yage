const _ = require('lodash')
const _fp = require('lodash/fp')
const sprite = require("./sprite")

// TODO This can probably be updated with some lodash functions and mapping the values
// CLEANUP
const spriteRemap = (assets, sprList, spriteGroupMap) => Object.keys(sprList).reduce(
    ([spAcm, mspAcm], key) => {
        const spr = {...sprite.init(assets)(sprList[key], spriteGroupMap), name:key}
        return (_.isEmpty(spr.physics) 
            ? [spAcm, {
                ...mspAcm,
                [key]:spr
            }]
            : [{
                ...spAcm,
                [key]:spr
            }, mspAcm]
        )
    }, 
    [{},{}]
)

const audioInit = ({tracks={},soundBoards=["all"], ...audio}) => ({
    fadeRate: 0,
    tracks: _.mapValues(tracks,v=>[v]),
    soundBoards:soundBoards,
    ...audio,
    sounds: {}, // Switch this and the previous line to allow sounds at start of map
    soundCounter: 0
})

const getAnimations = _fp.compose(
    _fp.uniq,
    _fp.filter(_fp.identity),
    _fp.flatMap(sprite => _fp.map(anim => anim.src, sprite.player.actor))
)

const init = assets => ({audio, spriteList:sprites,...initState}, spriteGroups) => {
    const [spriteList, masterSpriteList] = spriteRemap(assets, sprites, spriteGroups)
    return {
        viewportX:0,
        viewportY:0,
        audio: audioInit(audio),
        ...initState,
        spriteList,
        masterSpriteList,
        animations:getAnimations({...spriteList, ...masterSpriteList})
    }
}

const loadMap = assets => mapName => state => ({...state, map:init(assets)(assets.maps[mapName], state.spriteGroups)})

module.exports = {init, loadMap}

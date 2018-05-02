const sprite = require("./sprite")

// TODO This can probably be updated with some lodash functions and mapping the values
const spriteRemap = (assets, sprList) => Object.keys(sprList).reduce(
    (acm,key) => ({
        ...acm,
        [key]:sprite.init(assets)({name:key,...sprList[key]})
    }),
    {}
)

module.exports.init = assets => ({spriteList,...initState}) => ({
    viewportX:0, //defaults
    viewportY:0,
    ...initState,
    spriteList:spriteRemap(assets, spriteList)
})


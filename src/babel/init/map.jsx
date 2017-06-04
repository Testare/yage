const sprite = require("./sprite")

const spriteRemap = (sprList) => Object.keys(sprList).reduce(
    (acm,key) => ({
        ...acm,
        [key]:sprite.init({name:key,...sprList[key]})
    }),
    {}
)

module.exports.init = ({spriteList,...initState}) => ({
    viewportX:0, //defaults
    viewportY:0,
    ...initState,
    spriteList:spriteRemap(spriteList)
})


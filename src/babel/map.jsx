const sprite = require("./sprite")
const transform = require("./transform")
module.exports.init = (initState) => {
    const spriteRemap = (sprList) => {
        return Object.keys(sprList).reduce((acm,key) => {
            return {...acm,[key]:sprite.init({name:key,...sprList[key]})}
        },{})
    }
    return transform(initState,{spriteList:spriteRemap})
}


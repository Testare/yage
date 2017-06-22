const fp = require("lodash/fp")

const moveSprites = fp.mapValues(
    ({ physics: { posX, posY, velX, velY, ...physics },
        ...sprite }) => {
        //RUN COLLISION CHECKS HERE
        return {
            ...sprite,
            physics: {
                ...physics,
                posX: posX + velX,
                posY: posY + velY,
                velX: velX,
                velY: velY
            }
        }
    }
)

module.exports.updateState = fp.update('map.spriteList',moveSprites)
const fp = require("lodash/fp")
const collision = require('./collision-broad')

//Probably redundant
const moveSprites = spriteList=>fp.mapValues(
    ({ physics: { posX, posY, velX, velY, ...physics },
        ...sprite }) => {
        // for (spr in spriteList) {
        //     console.log("finding",spriteList[spr].name,sprite.name)
        //     console.log("equals",spriteList[spr].name === sprite.name)
        // }
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
    }, spriteList)

module.exports.updateState = fp.update('map',collision.runCollision)
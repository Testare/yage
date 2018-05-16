const fp = require("lodash/fp")
const {checkCollision} = require('./collision-narrow');
//Should be renamed, since this has to move the sprites as well
const runCollision = ({spriteList,...map}) => {
    //later I can work in init on creating the collision arary
    return {
        ...map,
        spriteList:fp.reduce(runCollisionInstance,spriteList,getMovingSprites(spriteList))
    }

    // return {...map,spriteList:spriteList}
}

const getSimplePhysics = ({physics,player}) => {
    const animation = player.actor[player.animation]
    const newX = physics.posX + physics.velX 
    const newY = physics.posY + physics.velY 
    return {
        newX:newX,
        newY:newY,
        newX_W:newX + animation.width,
        newY_H:newY + animation.height,
        posX:physics.posX,
        posY:physics.posY,
        velX:physics.velX,
        velY:physics.velY
    }
}
const runCollisionInstance = (spriteList, instanceSprite) => {
    const mePhys = getSimplePhysics(instanceSprite)
    const overlaps = fp.filter(
        other => {
            if (other.name === instanceSprite.name) {
                return false
            }
            otherPhys = getSimplePhysics(other)
            return (
                otherPhys.newX <= mePhys.newX_W
                && mePhys.newX <= otherPhys.newX_W
                && otherPhys.newY <= mePhys.newY_H
                && mePhys.newY <= otherPhys.newY_H
            )
        }, spriteList
    )
    if (overlaps.length != 0) {
        // NARROW PHASE COLLISION
        // COLLISION HANDLING
        const collisionResults = overlaps.map(overlap=>checkCollision(spriteList, instanceSprite, overlap))
        // Determine if a collision has occured
        // Determine if the collision should affect movement
        // Determine how much the collision should affect movement
        // ... Currently just says "Just cancel the movement"
        return spriteList
    } else {
        // MOVEMENT LOGIC
        // THIS NEEDS TO BE REFACTORED TO SOMETHING
        return {
            ...spriteList,
            [instanceSprite.name]:{
                ...instanceSprite,
                physics:{
                    ...instanceSprite.physics,
                    posX:mePhys.newX,
                    posY:mePhys.newY
                }
            }
        }
    }
}




const getMovingSprites = fp.filter(sprite=>{
    const {velX,velY} = sprite.physics
    return (velX !== 0 || velY !== 0)
})

module.exports.runCollision = runCollision;
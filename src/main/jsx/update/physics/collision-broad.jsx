const groups = require('./groups')
const fp = require("lodash/fp")
const {checkCollision} = require('./collision-narrow');
//Should be renamed, since this has to move the sprites as well
const runCollision = ({spriteList, ...map}) => {
    // This works bug free, but to best optimize it this only needs to be 
    // called when sprites are added or removed from the sprite list, or
    // if a sprite changes sprite groups or collision groups.
    // spriteList passed as a parameter, but current it is not used.
    groups.invalidateCache()
    return {
        ...map,
        spriteList:fp.reduce(runCollisionInstance, spriteList, getMovingSprites(spriteList))
    }
}

const getSimplePhysics = ({physics, player}) => (
    animation = player.actor[player.animation],
    newX = physics.posX + physics.velX,
    newY = physics.posY + physics.velY,
    {
        newX:newX,
        newY:newY,
        newX_W:newX + animation.width,
        newY_H:newY + animation.height,
        posX:physics.posX,
        posY:physics.posY,
        velX:physics.velX,
        velY:physics.velY
    }
)

const runCollisionInstance = (spriteList, instanceSprite) => {
    const mePhys = getSimplePhysics(instanceSprite)
    const spritesInGroup = groups.getSpritesForGroup(instanceSprite.collidesWith, spriteList)
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
        }, spritesInGroup
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
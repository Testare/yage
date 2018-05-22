const groups = require('./groups')
const fp = require("lodash/fp")
const {checkCollision} = require('./collision-narrow');

// Should probably have a config value
const COLLISION_SENSITIVITY = 0.05

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
        ...physics,
        newX,
        newY,
        newX_W:newX + animation.width,
        newY_H:newY + animation.height
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
        const collisionResults = fp.flatMap(overlap=>checkCollision(spriteList, instanceSprite, overlap, true), overlaps)
        const hits = fp.filter(collision=>collision.hit, collisionResults)
        // Determine if a collision has occured
        // Determine if the collision should affect movement
        // Determine how much the collision should affect movement
        // ... Currently just says "Just cancel the movement"
        if (fp.isEmpty(hits)) {
            return fp.update([instanceSprite.name, "physics"], phys=>({...phys,posX:mePhys.newX, posY:mePhys.newY}), spriteList)
        } else {
            const firstHit = fp.head(fp.sortBy(col=>(col.deltaX + col.deltaY), hits))
            const [velX, velY] = firstHit.slideVector()
            /* If the difference is two small, we don't care about it.*/
            if  (Math.abs(velX) > COLLISION_SENSITIVITY || Math.abs(velY) > COLLISION_SENSITIVITY) {
                const updatedSprList = fp.update([instanceSprite.name, "physics"], phys=>({...phys, posX:phys.posX+firstHit.deltaX, posY:phys.posY+firstHit.deltaY, velX, velY}), spriteList)
                const completingVelocity = runCollisionInstance (updatedSprList, updatedSprList[instanceSprite.name])
                // There should be a setting for what type of thing happens here
                // Should I set the velocity vectors back after? Currently I do.
                const finalSprList = fp.update([instanceSprite.name, "physics"], phys=>({...phys, velX:mePhys.velX, velY:mePhys.velY}), completingVelocity)
                return finalSprList
            } else {
                const updatedSprList = fp.update([instanceSprite.name, "physics"], phys=>({...phys, posX:phys.posX+firstHit.deltaX, posY:phys.posY+firstHit.deltaY, velX, velY}), spriteList)
                return updatedSprList
            }
        }
    } else {
        // MOVEMENT LOGIC
        // THIS NEEDS TO BE REFACTORED TO SOMETHING
        return fp.update([instanceSprite.name, "physics"], phys=>({...phys,posX:mePhys.newX, posY:mePhys.newY}), spriteList)
    }
}

const getMovingSprites = fp.filter(sprite=>{
    const {velX,velY} = sprite.physics
    return (velX !== 0 || velY !== 0)
})

module.exports.runCollision = runCollision;
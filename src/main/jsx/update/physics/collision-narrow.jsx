/**
 * Contains information about a collision.
 * @typedef {Object} Collision
 * @property {!boolean} collisionOccured - Indicates whether or not a narrow collision actually happened.
 * @property {?number} overlapDistance - The distance of the overlap
 * @property {?number} collisionVector - The 
 */

const NO_COLLISION = {collisionOccured:false}

const parseCoords = args => args.split(",")
const twoCircles = ({physics:sourcePhysics}, sourceCoords, targetSprite, targetCoords) => {
    const deltaX = sourcePhysics.posX + sourceCoords[0] - targetSprite.physics.posX - targetCoords[0];
    const deltaY = sourcePhysics.posY + sourceCoords[1] - targetSprite.physics.posY - targetCoords[1];
    const radiusSum = sourceCoords[2] + targetCoords[2];
    const diffRadius = Math.hypot(deltaX, deltaY);
    if (radiusSum > diffRadius) {
        return NO_COLLISION;
    }
    return {
        collisionOccured: true,
        overlapDistance: radiusSum - diffRadius,
        collisionVector: deltaY/deltaX
    }
}
/**
 * Returns collision objects that describe if a collision occured, and what type, etc.
 *   
 * @param {Object} spriteList 
 * @param {*} sourceSprite 
 * @param {*} targetSprite 
 * @returns {Collision} The Collision object
 */

const checkCollision = (spriteList, sourceSprite, targetSprite) => {

    return {
        collisionOccured: true,
        collisionType:"fatal"
    }

}

module.exports.checkCollision = checkCollision;
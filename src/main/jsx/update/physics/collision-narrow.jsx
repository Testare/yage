const _ = require('lodash/fp')
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

const flipCD = animation => _.map(
    _.cond([
        [ ({shape})=>['circle'].indexOf(shape) != -1, cd => (
            [x,y,r] = parseCD(cd).coords,
            {
                ...cd,
                coords:[animation.width - x, animation.height - y, r]
            }
        )],
        [ ({shape})=>['box','rect'].indexOf(shape) != -1, cd => (
            [x,y,w,h] = parseCD(cd).coords,
            {
                ...cd,
                coords:[animation.width - x, animation.height - y, w, h]
            }
        )],
        [ _.stubTrue, ({shape})=>{throw Erroh(`Invalid collision shape "${shape}"`)}]
    ])
)

const parseCD = _.cond([
    [({coords}) => _.isString(coords), ({coords, ...cd}) => ({...cd, coords:coords.split(',')})],
    [({coords}) => _.isArray(coords), _.identity],
    [_.stubTrue, ({coords, ...obj}) => {throw Error(`Can't recognize coord format "${coords}" in ${obj}!`)}]
])

const getCollisionData = ({player}, physicalOnly) => (
    player.flipped 
        ? flipCD(player.animation) 
        : _.map(parseCD)
    )((physicalOnly
        ? _.filter(cd=>cd.physical)
        : _.identity
    )(player.actor[player.animation].frames[player.currentFrame].collisionData))

const checkCD = (sourceCD, targetCD) => "m!"

/**
 * Returns collision objects that describe if a collision occured, and what type, etc.
 *   
 * @param {Object} spriteList 
 * @param {*} sourceSprite 
 * @param {*} targetSprite 
 * @returns {Collision} The Collision object
 */
const checkCollision = (spriteList, sourceSprite, targetSprite, physicalOnly=false) => {
    const sourceCD = getCollisionData(sourceSprite, physicalOnly)
    const targetCD = getCollisionData(targetSprite, physicalOnly)
    const results = _.flatMap(sCD=>_.map(tCD=>checkCD(sCD,tCD),targetCD), sourceCD)
    
    return {
        collisionOccured: true,
        collisionType:"fatal",
        hit:!_.isEmpty(results),
        results
    }

}

module.exports.checkCollision = checkCollision;
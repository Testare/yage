const _ = require('lodash/fp')
/**
 * This is currently invalid
 * 
 * Contains information about a collision.
 * @typedef {Object} Collision
 * @property {!boolean} collisionOccured - Indicates whether or not a narrow collision actually happened.
 * @property {?number} overlapDistance - The distance of the overlap
 * @property {?number} collisionVector - The 
 */

const NO_COLLISION = {collisionOccured:false, hit: false, slideVector:_=>[0,0]}

const pointVectorCircleCollision = ([sx,sy],[vx,vy],[tx, ty, radius]) => {
    const velocityMagnitude = Math.hypot(vx,vy)
    // Difference vector
    const [ax,ay] = [tx-sx, ty-sy]

    // I don't know if this will occur often enough to merit the extra calculation
    // START - Optimization?
    const cantHit = (ax*ax + ay*ay) > Math.pow(radius + velocityMagnitude, 2) 
    /*if (cantHit) {
        return NO_COLLISION
    }*/
    // END - Optimization?

    // Unit velocity vector
    const [uvx,uvy] = [vx/velocityMagnitude, vy/velocityMagnitude] 
    // We project the center point onto the velocity vector and its orthogonal
    // vector. We use this as a coordinate system, with source (x,y) as the 
    // origin, (x,y) becoming (b,c), b being along the velocity vector and 
    // c being along the orthogonal.
    // This is the dot product, using the unit velocity vector.
    // c calculated first to determine if a collision is possible. If the 
    // radius is less than c, there will never be a collision along this line.

    const c = Math.abs(uvy*ax - uvx*ay)
    if (radius <= c) {
        return NO_COLLISION
    }
    const b = uvx*ax + uvy*ay
    // Potential unnecessary optimization: If b is less than 0, the point is 
    // moving away from the circle.
    // This is unlikely to happen too often, since we only run narrow collision
    // on objects with overlaping bounding boxes.
    // Might not be though: Haven't figured out how to handle map collision data
    if (b < 0) {
        return NO_COLLISION
    }
    // Distance from the center of the circle along the b axis until the point hits the radius
    const e = Math.sqrt(radius*radius-c*c)

    // Distance the point will travel along the vector until it hits the circle
    const dist = b - e

    if (velocityMagnitude <= dist) {
        return NO_COLLISION
    }
    const [qx,qy] = [uvx*dist, uvy*dist]
    return {
        hit: true,
        deltaX:qx,
        deltaY:qy,
        slideVector:(_=> {
            // Can probably optimize this later using c and b or something
            const [normalX,normalY] = [(sy+qy-ty)/radius,-(sx+qx-tx)/radius]
            const remainingVel = velocityMagnitude - dist 
            const projDist = remainingVel*(uvx*normalX+uvy*normalY)
            const slideVec = [normalX*projDist, normalY*projDist]
            return slideVec
        })
    }

}


const overlapAxisWindow = (sx, sw, tx, tw, vel) => {
    // X is the point on the axis, w is the width on the axis
    if (vel == 0) {
        return (tx < sx + sw && sx < tx + tw)
            ? [Number.MIN_SAFE_INTEGER, 1] // Full interval
            : [2, -1] // Invalid values
    } else {
        const deltaX = tx - sx
        const a = (deltaX + tw)/vel
        const b = (deltaX - sw)/vel
        return (vel < 0)
            ? [a, b]
            : [b, a]
    }
}

const checkCD = (sourceSprite, sourceCD, targetSprite, targetCD) => 
    collisionCheckForShapes[sourceCD.shape][targetCD.shape]
        (sourceSprite, sourceCD.coords, targetSprite, targetCD.coords)

const twoCircles = ({physics:sourcePhysics}, [sx, sy, sradius], {physics:targetPhysics}, [tx,ty,tradius]) => 
    pointVectorCircleCollision(
        [sourcePhysics.posX + sx, sourcePhysics.posY + sy],
        [sourcePhysics.velX,sourcePhysics.velY],
        [tx + targetPhysics.posX,ty + targetPhysics.posY, sradius + tradius]
    )

const circleAndBox = _=>NO_COLLISION
const boxAndCircle = _=>NO_COLLISION

const twoBoxes = ({physics:sp}, [sx,sy,sw,sh], {physics:tp}, [tx,ty,tw,th]) => {
    // The windows are in units of "frames", just as the velocities are in units of "pixels/frame"
    const [xMin, xMax] = overlapAxisWindow(sp.posX + sx, sw, tp.posX + tx, tw, sp.velX)
    if (xMax < 0 || xMin > 1) { 
        return NO_COLLISION
    }
    const [yMin, yMax] = overlapAxisWindow(sp.posY + sy, sh, tp.posY + ty, th, sp.velY)
    if (yMax < 0 || yMin > 1) {
        return NO_COLLISION
    }
    // The collision occurs when the windows overlap, which happens
    // at the greater of the two windows's minimums.
    // But only if this is greater than the other window's maximum
    // Otherwise, no collision
    // The window that was entered last is the axis that is stopped
    // by the collision
    if (yMin < xMin) {
        //hitTime is xMin, missTime is yMax
        if (yMax < xMin) {
            return NO_COLLISION;
        } else {
            // Collision occured at xMin
            return {
                hit: true, 
                deltaX:xMin * sp.velX,
                deltaY:xMin * sp.velY,
                slideVector:_=>[0,sp.velY]
            }
        }
    } else {
        //hitTime is yMin, missTime is xMax
        if (xMax < yMin) {
            return NO_COLLISION;
        } else {
            // Collision occured at yMin
            return {
                hit: true, 
                deltaX:yMin * sp.velX,
                deltaY:yMin * sp.velY,
                slideVector:_=> [sp.velX,0]
            }
        }
    }
}

const collisionCheckForShapes = {
    "circle": {
        "circle" : twoCircles,
        "box": circleAndBox,
        "rect": circleAndBox
    },
    "box" : {
        "circle" : boxAndCircle,
        "box": twoBoxes,
        "rect": twoBoxes
    },
    "rect" : {
        "circle": boxAndCircle,
        "box": twoBoxes,
        "rect": twoBoxes
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
                coords:[animation.width - (x + w), animation.height - (y + h), w, h]
            }
        )],
        [ _.stubTrue, ({shape})=>{throw Erroh(`Invalid collision shape "${shape}"`)}]
    ])
)

// TODO Refactor this, it really should happen in the init module
const parseCD = _.cond([
    [({coords}) => _.isString(coords), ({coords, ...cd}) => ({...cd, coords:_.map(_.toNumber,coords.split(','))})],
    [({coords}) => _.isArray(coords), _.map(_.toNumber)],
    [_.stubTrue, ({coords, ...obj}) => {throw Error(`Can't recognize coord format "${coords}" in ${obj}!`)}]
])

const getCollisionData = ({player}, physicalOnly) => (
    player.flipped 
        ? flipCD(player.actor[player.animation]) 
        : _.map(parseCD)
    )((physicalOnly
        ? _.filter(cd=>cd.physical)
        : _.identity
    )(player.actor[player.animation].frames[player.currentFrame].collisionData))


/**
 * This is currently invalid.
 * 
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
    const results = _.flatMap(sCD=>_.map(
        tCD=>checkCD(sourceSprite, sCD, targetSprite, tCD), targetCD),
        sourceCD
    )
    const hit = _.any(k=>k.hit,results)
    return results

}

module.exports.checkCollision = checkCollision;
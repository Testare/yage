let animations;

module.exports = (animation) => {
    let ret = animations[animation]
    if(!ret)
        ret = require(`../assets/animations/${animation}`);
        animations[animation] = ret
    return ret
}
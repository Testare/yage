const _ = require('lodash/fp')
const standardBehavior = behavior => _.isString(behavior) ? [behavior, {}] : behavior

// Should catch object errors here?
const initializeBehaviors = (assets, obj) => _.reduce(
    (obj_, behavior)=>(
        [bName, params] = standardBehavior(behavior),
        result = (assets.behaviors[bName].init || _.identity)(obj_, params),
        (result) ? result : (console.error(`error initialization behavior "${bName}" for ${obj.name}`), obj_)
    ),
    obj,
    obj.behaviors
)

/*const applyBehavior = state => {

}
*/
const initBehaviorsForMe = (getBehaviorsFn, me) => state => _.reduce(
    (state_, behavior)=>(
        [bName, params] = standardBehavior(behavior),
        result = (assets.behaviors[bName].init || (_=>s=>s))({me, params})(state_),
        (result) ? result : (console.error(`error initialization behavior "${bName}" for ${me}`), state_)
    ),
    state,
    getBehaviorsFn(state)
)
const initSpriteBehaviors = state => _.reduce(
    (state_, me) => initBehaviorsForMe(x=>x.map.spriteList[me].behaviors, me)(state_),
    state,
    _.keys(state.map.spriteList)
)
const initMapBehaviors = initBehaviorsForMe(x=>x.map.behaviors, "MAP")
const initGameBehaviors = initBehaviorsForMe(x=>x.behaviors, "GAME")

module.exports = {initializeBehaviors}
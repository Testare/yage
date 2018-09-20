const _ = require('lodash/fp')
const standardBehavior = behavior => _.isString(behavior) ? [behavior, {}] : behavior

// There are really 2 types of behavior initialization
// 1. Initialization of the behavior object itself (Behavior creation)
// 2. Initialization of an object WITH REGARD TO certain behavior

// "init" is type 1
// STUB 
// 
// Takes behavior and then global state, and returns either a new behavior
// using the behavior's create method or the same behavior
// Undecided: Should this return just a behavior object, or also a new state
// object?
// Also, it should probably be passed the behavior modification library
const init = behavior => (behavior.create || _.constant(behavior)) //x => x


// Should catch object errors here?
// type 2
// Rename: initWithBehaviors, to avoid confusion with "type 1" above.
const initializeBehaviors = (assets, obj) => _.reduce(
    (obj_, behavior)=>{
        const [bName, params] = standardBehavior(behavior)
        const result = (assets.behaviors[bName].init || _.identity)(obj_, params)
        return (result) ? result : (console.error(`error initialization behavior "${bName}" for ${obj.name}`), obj_)
    },
    obj,
    obj.behaviors
)

// None of these are tested, but would be superior to initializeBehaviors, since
// we eventually want the init method to include the state and match the sort of
// parameters passed to the behavior's update method.

const initBehaviorsForMe = (getBehaviorsFn, me) => state => _.reduce(
    (state_, behavior)=>{
        const [bName, params] = standardBehavior(behavior)
        const result = (assets.behaviors[bName].init || (_=>s=>s))({me, params})(state_)
        return (result) ? result : (console.error(`error initialization behavior "${bName}" for ${me}`), state_)
    },
    state,
    getBehaviorsFn(state)
)

// These are all for initializing behaviors of an object out of state
const initSpriteBehaviors = state => _.reduce(
    (state_, me) => initBehaviorsForMe(x=>x.map.spriteList[me].behaviors, me)(state_),
    state,
    _.keys(state.map.spriteList)
)
const initMapBehaviors = _.compose(initSpriteBehaviors, initBehaviorsForMe(x=>x.map.behaviors, "MAP"))
const initGameBehaviors = _.compose(initMapBehaviors, initBehaviorsForMe(x=>x.behaviors, "GAME"))

module.exports = {init, initializeBehaviors}
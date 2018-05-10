const _ = require('lodash/fp')

// Should catch object errors here?
const initializeBehaviors = (assets, obj) => _.reduce(
    (obj_, behavior)=>(
        [bName, params] = (_.isString(behavior) ? [behavior, {}] : behavior),
        result = (assets.behaviors[bName].init || _.identity)(obj_, params),
        (result) ? result : (console.error(`error initialization behavior "${bName}" for ${obj.name}`), obj_)
    ),
    obj,
    obj.behaviors
)

module.exports = {initializeBehaviors}
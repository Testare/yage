const _ = require('lodash');

module.exports.update = 
    ({utils:{sprites:{getAnimation, setAnimation}}, state, me}) => (!ui.checkPress('KeyB'))
        ? state
        : setAnimation(
            state,
            me,
            (getAnimation(state, me) === 'waiting') ? 'spinning' : 'waiting'
        )
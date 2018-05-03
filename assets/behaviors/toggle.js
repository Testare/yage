const _ = require('lodash');

module.exports.update = 
    ({utils:{audio:{playSound}, sprites:{getAnimation, setAnimation}}, state, me}) => (!ui.checkPress('KeyB'))
        ? state
        : playSound(
            setAnimation(
                state,
                me,
                (getAnimation(state, me) === 'waiting') ? 'spinning' : 'waiting'
            ),
            "ping.mp3"
        )
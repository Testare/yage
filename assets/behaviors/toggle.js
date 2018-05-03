const _ = require('lodash');

module.exports.update = 
    ({utils:{audio:{playSound,setTrack}, sprites:{getAnimation, setAnimation}}, state, me}) => (!ui.checkPress('KeyB'))
        ? state
        : (k=>{_.once(console.log)(k); return k})(setTrack(
            playSound(
                setAnimation(
                    state,
                    me,
                    (getAnimation(state, me) === 'waiting') ? 'spinning' : 'waiting'
                ),
                "switch.mp3"
            ),
            "main",
            ["switch.mp3",1.0]
        ))
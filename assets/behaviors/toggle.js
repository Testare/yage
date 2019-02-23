const _ = require('lodash/fp');

module.exports.update = 
    ({utils:{audio:{playSound,setTrack}, sprites:{getAnimation, setAnimation}}, me}) =>
        (!ui.checkPress('KeyB'))
            ? _.identity
            : state => {
                const toggledAnimation = (getAnimation(me, state) === 'waiting') ? 'spinning' : 'waiting';
                return _.pipe(
                    setAnimation(me, toggledAnimation),
                    playSound("switch.mp3"),
                    setTrack("main",["ticker.mp3",0.3])
                )(state)
            }
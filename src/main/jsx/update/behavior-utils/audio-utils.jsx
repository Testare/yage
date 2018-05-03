const _ = require('lodash')

// Audio doesn't necessarily seem to belong to maps, if we can have multiple maps per screen.
// This might become a bit more complicated in that case
// On the other hand, it might be as simple as providing the map name to these functions

module.exports.playSound = (state, sound) => _.update(state,'map.audio',
    ({sounds, soundCounter, ...audio})=> ({
        ...audio,
        soundCounter:(soundCounter + 1),
        sounds: {
            ...sounds,
            [soundCounter]:sound
        }
    }))

module.exports.switchTrack = (state, trackName, trackSource) => state
module.exports.setTrack = (state, trackName, trackSource) => state //No fading
module.exports.clearTrack = (state, trackName) => state
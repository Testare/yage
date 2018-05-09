const _ = require('lodash/fp')

// Audio doesn't necessarily seem to belong to maps, if we can have multiple maps per screen.
// This might become a bit more complicated in that case
// On the other hand, it might be as simple as providing the map name to these functions

const playSound = (sound, state) => _.update('map.audio',
    ({sounds, soundCounter, ...audio})=> ({
        ...audio,
        soundCounter:(soundCounter + 1),
        sounds: {
            ...sounds,
            [soundCounter]:sound
        }
    }), state)

const switchTrack = (trackName, song, state) => state
const setTrack = (trackName, song, state) => _.update(`map.audio.tracks['${trackName}']`,_.constant([song]), state) //No fading
const clearTrack = (trackName, state) => state

const functions = {
    playSound,
    setTrack
}

module.exports = _.mapValues(_.curry, functions)
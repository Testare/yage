const fp = require('lodash/fp')
let soundsToCleanup = []

module.exports.markForCleanup = (name) => soundsToCleanup.push(name)

// This is the only audio function exported outside the ui module, for cleanup purposes
module.exports.cleanupSound = (state) => {
    sounds = soundsToCleanup
    console.log(`omit:${soundsToCleanup}`)
    soundsToCleanup = []
    return fp.update('map.audio.sounds', fp.omitAll(sounds), state)
}
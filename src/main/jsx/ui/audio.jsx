const fp = require('lodash/fp')
let soundsToCleanup = []

// Transforms different valid audio formats to a standard bituple of ["name" /*track name*/, 0.6 /*Volume*/]
// Note: Having a negative volume could be used to  that a volume < 0 means
module.exports.toStandardAudio = (track) => (typeof track === 'string') ? [track, 1.0] : Object.assign([,1.0],track)

// Removed, not available outside ui
module.exports.markForCleanup = (name) => soundsToCleanup.push(name)

// This is the only audio function exported outside the ui module, for cleanup purposes
module.exports.cleanupSound = (state) => {
    sounds = soundsToCleanup
    soundsToCleanup = []
    return fp.update('map.audio.sounds', fp.omitAll(sounds), state)
}
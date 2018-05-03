module.exports = {
    cleanupSound: require('./audio').cleanupSound,
    ...require('./draw'),
    ...require('./input')
} 
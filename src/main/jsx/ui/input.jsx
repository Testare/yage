const fp = require("lodash/fp")

const FLAG_RELEASE = 0b010
const FLAG_PRESS = 0b100
const KEY_UP = 0b0 //0
const KEY_DOWN = 0b1 //1
const KEY_RELEASE = FLAG_RELEASE | KEY_UP //2
const KEY_UNDEF1 = FLAG_RELEASE | KEY_DOWN //This state shouldn't be reached
const KEY_UNDEF2 = FLAG_PRESS | KEY_UP //This state shouldn't be reached either
const KEY_PRESS = FLAG_PRESS | KEY_DOWN //5
const KEY_RERELEASE = FLAG_PRESS | FLAG_RELEASE | KEY_UP //6
const KEY_REPRESS = FLAG_PRESS | FLAG_RELEASE | KEY_DOWN //7 //HAHA REPRESS

const ON_KEY_UP = [
    KEY_UP, KEY_RELEASE,
    KEY_RELEASE, KEY_UNDEF1,
    KEY_UNDEF2, KEY_RERELEASE,
    KEY_RERELEASE, KEY_RERELEASE
]

const ON_KEY_DOWN = [
    KEY_PRESS, KEY_DOWN,
    KEY_REPRESS, KEY_UNDEF1,
    KEY_UNDEF2, KEY_PRESS,
    KEY_REPRESS, KEY_REPRESS
]
/**
 * The use is, the current state gets a new state on key-up or key-down events
 * through accessing this array newState = ON_KEY_UP[currentState]
 * There are gaps because the state uses bitflags, and some permutations are invalid states
 */

// const ON_KEY_DOWN = [KEY_PRESS,KEY_DOWN,KEY_PRESS,KEY_PRESS]

//WORK SHOULD BE DONE TO MAKE THIS CONCURRENCY SAFE, LIKE A REAL ATOM

let currentAtom = {}
let nextAtom = {}
let screenX = 0, screenY = 0, mapY = 0, mapX = 0

module.exports.checkDown = code => !!(currentAtom[code] & KEY_DOWN)
module.exports.checkUp = code => !(currentAtom[code] & KEY_DOWN)
module.exports.checkRelease = code => !!(currentAtom[code] & FLAG_RELEASE)
module.exports.checkPress = code => !!(currentAtom[code] & FLAG_PRESS)
module.exports.derefAtom = _ => ({ ...currentAtom })

//Might be modified in the future to handle mouse position even when the mouse is outside the viewport.
module.exports.cursorPos = (props, mapScale) => event => {
    screenX = event.clientX - Math.ceil(parseFloat(event.currentTarget.style.marginLeft))
    screenY = event.clientY - Math.ceil(parseFloat(event.currentTarget.style.marginTop))
    let {viewportX,viewportY} = props.map
    mapX = (screenX/mapScale + viewportX)
    mapY = (screenY/mapScale + viewportY)
}

module.exports.mapPos = _ => [mapX, mapY]

module.exports.inputDown = (event) => {
    console.log("INPUT:" + event.code);
    code = event.code || ("Mouse" + event.button)
    nextAtom[code] = ON_KEY_DOWN[nextAtom[code] || KEY_UP]
}

module.exports.inputUp = (event) => {
    code = event.code || ("Mouse" + event.button)
    nextAtom[code] = ON_KEY_UP[nextAtom[code] || KEY_UP]
}

module.exports.nextInput = _ => {
    currentAtom = nextAtom
    nextAtom = fp.mapValues(v => (v & 1))(nextAtom)
    return currentAtom
}

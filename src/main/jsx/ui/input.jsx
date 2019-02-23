const fp = require("lodash/fp")

const FLAG_RELEASE = 0b010 //2
const FLAG_PRESS = 0b100 //4
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

let currentAtom = {}
let nextAtom = {}
let screenX = 0, screenY = 0, mapY = 0, mapX = 0

// Check if a key/button is down 
module.exports.checkDown = code => !!(currentAtom[code] & KEY_DOWN)
// Check if a key/button is up 
module.exports.checkUp = code => !(currentAtom[code] & KEY_DOWN)
// Check if a key/button was released this frame
module.exports.checkRelease = code => !!(currentAtom[code] & FLAG_RELEASE)
// Check if a key/button was pressed this frame
module.exports.checkPress = code => !!(currentAtom[code] & FLAG_PRESS)
// Gets a copy of the current atom
module.exports.derefAtom = _ => ({ ...currentAtom })
// Checks the scroll wheel
module.exports.checkWheel = _ => currentAtom["wheel"]
// Gets the position of the cursor relevant to the map
module.exports.mapPos = _ => [mapX, mapY]

// Sets the cursor position relevant to the screen and map
module.exports.cursorPos = (props, mapScale) => event => {
    screenX = event.clientX - Math.ceil(parseFloat(event.currentTarget.style.marginLeft))
    screenY = event.clientY - Math.ceil(parseFloat(event.currentTarget.style.marginTop))
    let {viewportX,viewportY} = props.map
    mapX = (screenX/mapScale + viewportX)
    mapY = (screenY/mapScale + viewportY)
    // NOTE If we get multiple maps, this will need to change. We can store the
    // screenX/mapScale (mapScale really being screenScale, since the maps are
    // all made to fit the screen resolution specified), but the viewportX and
    // viewportY of the different maps would have to be added for individual
    // maps.
}

// Sets the wheel details on a wheel event
module.exports.wheelScroll = event => {
    nextAtom["wheel"] = [event.deltaX, event.deltaY, event.deltaZ]
}

// When an input button is down
module.exports.inputDown = (event) => {
    const code = event.code || ("Mouse" + event.button)
    nextAtom[code] = ON_KEY_DOWN[nextAtom[code] || KEY_UP]
}

// When an input button is up
module.exports.inputUp = (event) => {
    const code = event.code || ("Mouse" + event.button)
    nextAtom[code] = ON_KEY_UP[nextAtom[code] || KEY_UP]
}

// Rotates the input from last frame into the current atom
module.exports.nextInput = _ => {
    currentAtom = nextAtom
    nextAtom = fp.mapValues(v => (v & 1))(nextAtom)
    return currentAtom
}

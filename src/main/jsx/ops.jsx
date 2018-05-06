const _ = require('lodash')

const runOps = ({ops, ...state}, document) => ({
    ops:[],
    ..._.reduce(
        ops,
        (state_, [opName,opParams])=> opActs[opName][1](state_,document,opParams),
        state
    )
})
const log = (state, document, {message, displayState}) => {
    console.log(message)
    if (displayState) {
        console.log("^", state)
    }
    return state;
}

// Different ops
const loadMap = (state, document, params) => {
    console.log("load map!");
    return state;
}

const loadState = (state, document, params) => {
    console.log("load state!");
    return state;
}

const pause = (state, document, params) => {
    console.log("pause!");
    return state;
}

const saveState = (state, document, params) => {
    console.log("pause!");
    return state;
}

const screenshotMap = (state, document, params) => {
    console.log("screenshot!");
    return state;
}

// Op directory
// Form: identifier: [string-identifier, function]
const opActs = {
    loadMap:["load-map", loadMap],
    loadState:["load-state", loadState],
    log:["log", log],
    pause:["pause", pause],
    saveState:["save-state", saveState],
    screenshot:["screenshot", screenshotMap]    
}

// Use for when ops are registered
const optags = _.mapValues(opActs, ([k])=>k)

module.exports = {optags, runOps}
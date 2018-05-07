const _ = require('lodash')
const html2canvas = require('html2canvas')
const fs = require('fs')

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

const screenshotMap = (state, document, {target="img.png", mapHtmlId="render-screen", h2cparams={logging:false}, errHandler=(error=>{if(error) console.error(error)})}) => {
    // There are two bugs in html2canvas that make this a bit more difficult.
    // The first bug has to do with the size of the canvas when the rendered
    // element is transformed. A work around for this has been put in place
    // in the draw-map: Rendering a div with the proper height and width.
    //
    // Current bug in HTML2CANVAS: Images rotated with scaleX(), but where only
    // part of the image is rendered, will have the wrong half of them rendered
    // This means the screenshot will be buggy around the edges.
    //
    // It might be possible to have a work around where we change render-screen
    // and draw-map to overflow:visible, and then have another div around them
    // with overflow:hidden. We then render the one with overflow:visible.
    //
    // https://github.com/niklasvh/html2canvas/issues/1524
    html2canvas(document.getElementById(mapHtmlId), h2cparams).then(
        screenshot=>{
            img = screenshot.toDataURL()
            var data = img.replace(/^data:image\/\w+;base64,/, "");
            var buf = new Buffer(data, 'base64');
            fs.writeFileSync(target, buf)
        }).catch(errHandler)
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
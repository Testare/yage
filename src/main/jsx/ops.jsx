const _ = require('lodash')
const html2canvas = require('html2canvas')
const fs = require('fs')
const path = require('path')

// This runs all the specified ops in the state
const runOps = ({ops, ...state}, document) => ({
    ops:[],
    ..._.reduce(
        ops,
        (state_, [opName,opParams])=> opActs[opName](state_,document,opParams),
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

// Most of these parameters can be figured out from the saveState function.
// * segment: If not specified, the segment will be used from the save file. If
//   it IS specified, this segment WILL be used.
// * loadHandler: Is passed the whole save frame, not just the saved Object
//   ({saveObject, version, segment}). The returned value is used for the rest
//   of the function. For example, you can update the state yourself, and return
//   an object with only the saveObject property to load that. Or, if you need
//   to change the segment dynamically, you can return the save frame with a
//   modified segment value (only if you don't specify one as a parameter).
//   A good idea is if you have a specific save format, save with version
//   numbers and use this callback to update previous formats to current
//   ones.
//
//   Technically speaking, you can use this loadHandler to specify any
//   changes in state you want to perform from the "op" timeslot, instead of
//   the normal update cycle timeslot.

const loadState = (state, document, {fileLocation, segment, saveName="sav.json", loadHandler=_.identity}) => {
    const saveLocation = fileLocation || path.join(state.assetPath,"saves",saveName)
    const loadFrame = loadHandler(JSON.parse(fs.readFileSync(saveLocation,'utf8')))
    const trueSegment = segment || loadFrame.segment
    const loadedState = trueSegment ? _.update(state, trueSegment, _=>loadFrame.saveObject) : loadFrame.saveObject
    return loadedState;
}

const pause = (state, document, params) => {
    console.log("pause!");
    return state;
}

// Default saves to sav.json in the assets/saves folder (not the best default folder perhaps)
// params:
// * fileLocation: specify a file to save to
// * segment: If specified, will only save this "path" of the object instead
//   of the whole state. See lodash's _.get to see how to specify the path.
// * saveName: if a fileLocation is not specified, will save to a save file
//   with this name in the saves folder
// * version: Can specify a version, or what type of save this is. Might be 
//   useful for load handlers
// * saveHandler: Can be used to change what is saved. If specified, it will 
//   get passed the object specified by segment. The returned object will be 
//   saved.
//
// The savefile format is a json object with {segment, version, saveObject}.
// The other two are the values specified in the parameters
const saveState = (state, document, {fileLocation, segment, saveName="sav.json", version="0", saveHandler=_.identity}) => {
    const saveLocation = fileLocation || path.join(state.assetPath,"saves",saveName)
    const saveObject = saveHandler(segment ? _.get(state, segment) : state)
    const saveFrame = {
        version,
        segment,
        saveObject
    }
    fs.writeFileSync(saveLocation, JSON.stringify(saveFrame,'utf8'));
    return state;
}

// Takes a screenshot of the map and saves it to a file
// parameter specs:
// * target: the location to save the image
// * mapHtmlId: The HTML element ID to render with html2canvas. Probably not 
//   going to be changed a lot from default
// * h2cparams: html2canvas parameters. Default is just turning off logging.
// * errHandler: Handles errors, duh

const screenshot = (state, document, {fileLocation="img.png", mapHtmlId="render-screen", h2cparams={logging:false}, errHandler=(error=>{if(error) console.error(error)})}) => {
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
            fs.writeFileSync(fileLocation, buf)
        }).catch(errHandler)
    return state;
}

// Op directory
// Form: identifier: [string-identifier, function]
// Probably can change it to just being opActs= {loadMap, loadState, ...}
const opActs = {
    loadMap,
    loadState,
    log,
    pause,
    saveState,
    screenshot
}
/*const opActs = {
    loadMap:["loadMap", loadMap],
    loadState:["loadState", loadState],
    log:["log", log],
    pause:["pause", pause],
    saveState:["saveState", saveState],
    screenshot:["screenshot", screenshotMap]    
}*/

// Use for when ops are registered
const optags = _.mapValues(opActs, (__,k)=>k)

module.exports = {optags, runOps}
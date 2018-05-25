const _fp = require('lodash/fp')
const html2canvas = require('html2canvas')
const fs = require('fs')
const path = require('path')
const init = require('./init')

// This runs all the specified ops in the state
const runOps = ({ops, ...state}, utils) => ({
    ops:[],
    ..._fp.reduce(
        (state_, [opName,opParams])=> opActs[opName](state_, opParams, utils),
        state,
        ops
    )
})

// Logs to console
// * message: The message to log
// * displayState: if true, will log the state to the console as well
const log = (state, {message, displayState}) => {
    console.log(message)
    if (displayState) {
        console.log("^", state)
    }
    return state;
}

// Pretty simple op: Loads one of the map assets
// Only one property of the params object, mapName. It is the
// only property, but it is a necessary property with no default
// value.
// * mapName: Name of the map to load. ".json" not necessary.
const loadMap = (state, {mapName}, {assets}) => ({
    ...state,
    map:init.map(assets)(assets.maps[mapName])
})

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
// * errHandler: Similar to the errHandler in save state, but the object
//   passed to it these properties
//   * error, state, saveLocation: Same as in saveState
//   * segment: The segment specified to load into.
//   It does not have the saveFrame object. Default behavior logs this
//   object as an error and continues as normal.

const loadState = (state, {
        fileLocation,
        segment,
        saveName="sav.json",
        loadHandler=_fp.identity,
        errHandler=(errObj=>(console.error(errObj), errObj.state))
}) => {
    const saveLocation = fileLocation || path.resolve(state.assetPath, '../', state.defaultSaveLocation, saveName)
    try {
        const loadFrame = loadHandler(JSON.parse(fs.readFileSync(saveLocation,'utf8')))
        const trueSegment = segment || loadFrame.segment
        const loadedState = trueSegment ? _fp.update(trueSegment, _=>loadFrame.saveObject, state) : loadFrame.saveObject
        return loadedState
    } catch (error) {
        return errHandler({error, saveLocation, segment, state})
    }
}

// Pauses the game
// * pause: If this is a boolean value, it sets paused to this value. If this
//   is a function, it applies it to the current value of 
const pause = (state, {pause}) => {
    const paused = (typeof pause === 'boolean') ? pause : pause(state.paused);
    return {...state, paused} 
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
// * errHandler: Handles errors when trying to read a save from a file. This
//   function returns a new state object, and is passed an object with the
//   following attributes
//    * error: The error object thrown.
//    * saveLocation: The location we're trying to save to
//    * saveFrame: The object that would be written to a save file
//    * state: the state before this op.
//   By default, a failed save will just console.error log this object and 
//   perform no changes on the state. Very rarely should failure to save
//   affect state directly, other than to indicate on the HUD that the save
//   failed.
//
// The savefile format is a json object with {segment, version, saveObject}.
// The other two are the values specified in the parameters
const saveState = (state, {
        fileLocation,
        segment,
        saveName="sav.json",
        version="0",
        saveHandler=_fp.identity, 
        errHandler=(obj=>(console.error(obj), state))
}) => {
    const saveLocation = fileLocation || path.resolve(state.assetPath, '../', state.defaultSaveLocation, saveName)
    const saveObject = saveHandler(segment ? _fp.prop(segment, state) : state)
    const saveFrame = {
        version,
        segment,
        saveObject
    }
    try {
        fs.writeFileSync(saveLocation, JSON.stringify(saveFrame,'utf8'));
    } catch (error) {
        return errHandler({error, saveLocation, saveFrame, state})
    }
    return state;
}

const quitGame = (state, params, {runAtom}) => {
    runAtom.running = false;
    return state
}

// Takes a screenshot of the map and saves it to a file
// parameter specs:
// * target: the location to save the image
// * mapHtmlId: The HTML element ID to render with html2canvas. Probably not 
//   going to be changed a lot from default
// * h2cparams: html2canvas parameters. Default is just turning off logging.
// * errHandler: Handles errors, duh

const screenshot = (state, {
        fileLocation="img.png",
        mapHtmlId="render-screen",
        h2cparams={logging:false},
        errHandler=(error=>{if(error) console.error(error)})
    }, {document}) => {
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
const opActs = {
    loadMap,
    loadState,
    log,
    pause,
    saveState,
    screenshot,
    quitGame
}

// Use for when ops are registered
const optags = _fp.mapValues.convert({cap:false})((v,k)=>k, opActs)

module.exports = {optags, runOps}
const React = require("react")
const DrawSprite = require("./draw-sprite")
const input = require('./input')
const AudioPlayer = require('./ui-audio')
const _ = require('lodash')
const path = require('path')


// TODO Is this the best place for this?
const calcScale = ({resolution:[width,height]}) => Math.min(
    ((window.innerWidth - 6)/width),
    ((window.innerHeight - 6)/height)
)
const renderscreenStyle = (state) => {
    const scale = calcScale(state)
    const [width,height] = state.resolution
    return {
        width:width*scale,
        height:height*scale,
        marginTop: `${((window.innerHeight - height*scale)/2)}px`,
        marginLeft: `${((window.innerWidth - width*scale)/2)}px`
    }
}

const viewportStyle = (state) => {
    const scale = calcScale(state)
    const [width,height] = state.resolution
    return {
        width:width,
        height:height,
        transform: `scale(${scale}`,
        marginLeft:0,
        marginRight:0
    } // TODO Possibility of stretch-rendering?
}

// TODO This assets folder line should not be hard-coded
const mapStyle = (assetPath, state) => ({
    backgroundImage: `url('${path.join(assetPath,'maps/images/',state.src)}')`,
    width: state.width,
    height: state.height,
    left: -state.viewportX,
    top: -state.viewportY
})
// TODO clean all this up, remove update from this and draw.jsx
//For some reason, onMouseMove isn't getting called anymore?
const DrawMap = (props) => (
    <div 
        id="render-screen"
        style={renderscreenStyle(props)}
    >
        <PreloadAnimations assetPath={props.assetPath} animations={props.map.animations} />
        <div
            id="draw-viewport"
            style={viewportStyle(props)}
            onMouseMove={input.cursorPos(props, calcScale(props))} // NOTE If we ever make a game have multiple maps, this will need to move
            onWheel={input.wheelScroll}
        >
            <div
                className="drawmap"
                style={mapStyle(props.assetPath, props.map)}
            >
                <SpriteList update={update} {..._.pick(props,['assetPath','debug'])} {...props.map.spriteList} />
                <AudioPlayer {...props.map.audio} {..._.pick(props,['assetPath','debug'])} />
            </div>
        </div>
    </div>
)

const PreloadAnimations = ({assetPath, animations}) => (
    <div style={{display:"none"}}>
        {animations.map(src => <img key={src} src={path.join(assetPath,"animations", src)} />)}
    </div>
)

const SpriteList = ({update, assetPath, debug, ...props}) => (
    <div>{
        Object.keys(props).map(sprKey => 
            props[sprKey].physics 
            ? (
            <DrawSprite
                update={update}
                debug={debug}
                assetPath={assetPath}
                key={sprKey}
                {...props[sprKey]}
            />) 
            : undefined
        )}
    </div>
)

module.exports = DrawMap

const React = require("react")
const DrawSprite = require("./draw-sprite")
const input = require('./input')

// TODO Is this the best place for this?
const calcScale = ({resolution:[width,height]}) => Math.min(
    ((window.innerWidth - 6)/width),
    ((window.innerHeight - 6)/height)
)

const viewportStyle = (state) => {
    let scale = calcScale(state)
    let [width,height] = state.resolution
    return {
        // cursor:"none", // TODO Should probably clean this up
        width:width,
        height:height,
        transform: `scale(${scale}`,
        marginTop: `${((window.innerHeight - height*scale)/2)}px`,
        marginLeft: `${((window.innerWidth - width*scale)/2 )}px`
    } //Later: Possibility of stretch-rendering?
}

// TODO This assets folder line should not be hard-coded
const mapStyle = (state) => ({
    backgroundImage: `url('../assets/maps/images/${state.src}')`,
    width: state.width,
    height: state.height,
    left: -state.viewportX,
    top: -state.viewportY
})
// TODO clean all this up, remove update from this and draw.jsx
//For some reason, onMouseMove isn't getting called anymore?
const DrawMap = ({update,...props}) => (
    <div
        id="draw-viewport"
        style={viewportStyle(props)}
        onMouseMove={input.cursorPos(props,calcScale(props))} // NOTE If we ever make a game have multiple maps, this will need to move
        onWheel={input.wheelScroll}
    >
        <div
            className="drawmap"
            style={mapStyle(props.map)}
        >
            <SpriteList update={update} {...props.map.spriteList} />
        </div>
    </div>
)

SpriteList = ({update,...props}) => (
    <div>{
        Object.keys(props).map(sprKey => (
            <DrawSprite
                update={update}
                key={sprKey}
                {...props[sprKey]}
            />)
        )}
    </div>
)

module.exports = DrawMap

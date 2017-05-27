const React = require("react")
const Sprite = require("./draw-sprite")
const transform = require("./transform")

SpriteList = (props) => (
    <div>{
        Object.keys(props).map(sprKey => (
            <Sprite
                key={sprKey}
                {...props[sprKey]}
            />)
        )}
    </div>
)


const mapStyle = (state) => ({
    width: state.width,
    height: state.height,
    left: -state.viewportX,
    top: -state.viewportY
})

const DrawMap = (props) => (
    <div id="draw-viewport">
        <div
            className="drawmap"
            style={mapStyle(props)}
        >   
            <SpriteList {...props.spriteList} />
        </div>
    </div>
)


module.exports = DrawMap

const React = require("react")
const DrawSprite = require("./draw-sprite")

const viewportStyle = ({resolution:[width,height]}) => {
    let scale = Math.min(
        ((window.innerWidth - 6)/width),
        ((window.innerHeight - 6)/height)
    )
    return {
        width:width,
        height:height,
        transform: `scale(${scale}`,
        marginTop: `${((window.innerHeight - height*scale)/2)}px`,
        marginLeft: `${((window.innerWidth - width*scale)/2 )}px`
    } //Later: Possibility of stretch-rendering?
}

const mapStyle = (state) => ({
    backgroundImage: `url('../assets/maps/images/${state.src}')`,
    width: state.width,
    height: state.height,
    left: -state.viewportX,
    top: -state.viewportY
})

const DrawMap = (props) => (
    <div
        id="draw-viewport"
        style={viewportStyle(props)}
    >
        <div
            className="drawmap"
            style={mapStyle(props.map)}
        >
            <SpriteList {...props.map.spriteList} />
        </div>
    </div>
)

SpriteList = (props) => (
    <div>{
        Object.keys(props).map(sprKey => (
            <DrawSprite
                key={sprKey}
                {...props[sprKey]}
            />)
        )}
    </div>
)

module.exports = DrawMap

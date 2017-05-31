const {remote} = require("electron")
const React = require("react")
const Sprite = require("./draw-sprite")
const assets = require("../assets") //Should be remote.require, but for some reason that doesn't work!
console.log(assets)
console.log(assets.config)

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
    backgroundImage: `url('../assets/maps/images/${state.src}')`,
    width: state.width,
    height: state.height,
    left: -state.viewportX,
    top: -state.viewportY
})

const resolution = [640,400] //Hard-coded for now

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

const DrawMap = (props) => (
    <div
        id="draw-viewport"
        style={viewportStyle(assets.config)}
    >
        <div
            className="drawmap"
            style={mapStyle(props)}
        >
            <SpriteList {...props.spriteList} />
        </div>
    </div>
)


module.exports = DrawMap

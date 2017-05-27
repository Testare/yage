const React = require("react")
const assets = require("../assets")
const player = require("./player")

const spriteStyle = (props) => ({
        left: props.physics.posX,
        top: props.physics.posY,
        zIndex : props.zFrame,
        ...player.styleFor(props.player)
    }
)

const DrawSprite = (props) => (
    <span
        className="drawsprite"
        style={spriteStyle(props)}
    >
        <img />
    </span>
)

module.exports = DrawSprite
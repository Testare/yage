const React = require('react')

const pAnimation = ({actor,animation}) => actor[animation]

const playerStyle = ({currentFrame,...player}) => ({
    backgroundImage: `url('../assets/actors/strips/${pAnimation(player).src}')`,
    backgroundPositionX: -currentFrame * (1+ pAnimation(player).width), //The 1+ gives room for dividing lines
    width: pAnimation(player).width,
    height: pAnimation(player).height,
    transform: (player.flipped)?"scaleX(-1)":"none"
})

const spriteStyle = (props) => ({
        left: props.physics.posX,
        top: props.physics.posY,
        zIndex : props.zFrame,
        ...playerStyle(props.player)
    }
)

const DrawSprite = props => (
    <span
        className="drawsprite"
        style={spriteStyle(props)}
    >
    </span>
)

module.exports = DrawSprite

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

const report = msg => value => {console.log(msg);return value;}

const AreaMap = ({ update, name, player }) => (
    <div>{
        pAnimation(player).frames.map((frame,index) => (
            <map
                key={`${name}-${index}マップ`} 
                name={`${name}-${index}マップ`} 
            >
                {(frame.collisionData || []).map(
                    (x, i) => (<area
                        key={i}
                        onMouseEnter={e => { e.preventDefault(); update("area")(e) }}
                        onMouseLeave={e => {e.preventDefault(); update("area1")(e) }}
                        href="" {...x}
                />))}
            </map>   
        ),[])
    }
        {/*<map name={`${name}マップ`}>
            {(pAnimation(player).frames[player.currentFrame].collisionData || []).map(
            (x, i) => (<area
                key={i}
                onClick={e => { e.preventDefault(); update("area")(e) }}
                href="" {...x}
            />))
        }
        </map>*/}
    </div>
)

const DrawSprite = props => (
    <span
        className="drawsprite"
        style={spriteStyle(props)}
    >
        <AreaMap {...props} />
        <img useMap={`#${props.name}-${props.player.currentFrame}マップ`}/>
    </span>
)

module.exports = DrawSprite

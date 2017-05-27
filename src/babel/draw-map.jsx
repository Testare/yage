const React = require("react")
const Sprite = require("./draw-sprite")
const transform = require("./transform")

SpriteList = (props) => {
    const sprites = Object.keys(props).map((sprKey,j) => {
        return <Sprite key={sprKey} {...props[sprKey]}/>
        //Will need better ids if I ever make sprite-lists modifiable... Which I probably will
    })
    return <div>{sprites}</div>
}

class DrawMap extends React.Component {
    state = {...this.props}
    style = (state) => ({
        width: state.width,
        height: state.height,
    })
    render = () => (
        <div className="drawmap" style={this.style(this.state)}>
            <SpriteList {...this.state.spriteList} />
        </div>
    )
}

module.exports = DrawMap

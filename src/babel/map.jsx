const React = require("react")
const Sprite = require("./sprite")
SpriteList = (props) => {
        const sprites = props.sprites.map((spr,j) => {
            return <Sprite key={`${j}`} {...spr}/>
            //Will need better ids if I ever make sprite-lists modifiable... Which I probably will
        })
        return <div>{sprites}</div>
}

class Map extends React.Component {
    state = {
        sprites: this.props.sprites || [],
        name: this.props.name || "unnamed" //Probably should raise an error for unnamed maps, this should be unique
    }
    render() {
        const {sprites,name} = this.state;
        return (
        <div>
            <SpriteList mapname={name} sprites={sprites} />
        </div>
        )
    }
}

module.exports = Map
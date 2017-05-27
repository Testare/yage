const React = require("react")
const assets = require("../assets")
const player = require("./player")

class Sprite extends React.Component {
    state = {...this.props};
    componentWillReceiveProps(nextProps){
        this.setState(nextProps)
    }
    style(state){
        return {
            left: state.physics.posX,
            top: state.physics.posY,
            zIndex : state.z,
            ...player.styleFor(state.player)
        }
    };
    update = _ => this.setState((prevState) => ({
        physics: { //Nice to know we can do this, but it isn't really a necessary feature
            ...prevState.physics,
            posX:(prevState.physics.posX-10),
            posY:(prevState.physics.posY-10)
        }
    }))
    update2 = _ => {
        console.log("Am i the problem?")
        this.setState((prevState) => {
            return {
                x:prevState.physics.posX-10,
                y:prevState.physics.poxY-10,
            }
        })
    }
    render() {
        return <span className="drawsprite"
                  onMouseOver={this.update}
                  //onMouseOut={this.update2}
                  style={this.style(this.state)} ><img /></span>
    }
}

module.exports = Sprite
const React = require("react")

class Sprite extends React.Component {
    static default_state = {
        x: 0,
        y: 0,
        z: 20,
        name: "unnamed",
    }
    state = Object.assign({},Sprite.default_state,this.props)
    style(){
        return {
            left: this.state.x,
            top: this.state.y,
            backgroundColor: this.state.color,
            zIndex : this.state.z
        }
    };
    update = _ => {
        this.setState((prevState) => {
            return {
                x:prevState.x+10,
                y:prevState.y+10,
            }
        })
    }
    render() {
        return <p className="sprite"
                  onClick={this.update}
                  style={this.style()}>{this.state["name"]}</p>
    }
}

module.exports = Sprite
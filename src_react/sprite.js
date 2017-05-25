const React = require("react")

class Sprite extends React.Component {
    static default_state = {
        x: 0,
        y: 0,
        z: 20,
        name: "unnamed",
    }
    state = Object.assign({},Sprite.default_state,this.props)
    componentWillReceiveProps(nextProps){
        this.setState(nextProps)
    }
    animationStyle(state){
        return {
            left: state.x,
            top: state.y,
            backgroundImage:`url('../assets/animations/${state.animation}.png')`,
            width:100,
            height:90,
            zIndex : state.z
        }
    }
    style(state){
        return {
            left: state.x,
            top: state.y,
            backgroundColor: state.color,
            zIndex : state.z
        }
    };
    update = _ => {
        console.log("click registered")
        this.setState((prevState) => {
            console.log(prevState);
            return {
                x:prevState.x+10,
                y:prevState.y+10,
            }
        })
    }
    render() {
        if(this.state.animation) {
            return <span className="spriteimg"
                        onClick={this.update}
                        style={this.animationStyle(this.state)}></span>
        }
        return <p className="sprite"
                  onClick={this.update}
                  style={this.style(this.state)}>{this.state["name"]}</p>
    }
}

module.exports = Sprite
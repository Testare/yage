var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const React = require("react");

class Sprite extends React.Component {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this.state = _extends({}, Sprite.default_state, this.props), this.update = _ => {
            this.setState(prevState => {
                console.log(prevState);
                return {
                    x: prevState.x + 10,
                    y: prevState.y + 10
                };
            });
        }, this.update2 = _ => {
            this.setState(prevState => {
                return {
                    x: prevState.x - 10,
                    y: prevState.y - 10
                };
            });
        }, _temp;
    }

    //Object.assign({},Sprite.default_state,this.props)
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }
    animationStyle(state) {
        return {
            left: state.x,
            top: state.y,
            backgroundImage: `url('../assets/animations/${state.animation}.png')`,
            width: 100,
            height: 90,
            zIndex: state.z
        };
    }
    style(state) {
        return {
            left: state.x,
            top: state.y,
            backgroundColor: state.color,
            zIndex: state.z
        };
    }
    render() {
        if (this.state.animation) {
            return React.createElement("span", { className: "spriteimg",
                onMouseEnter: this.update,
                onMouseLeave: this.update2,
                style: this.animationStyle(this.state) });
        }
        return React.createElement(
            "p",
            { className: "sprite",
                onMouseOver: this.update,
                onMouseOut: this.update2,
                style: this.style(this.state) },
            this.state["name"]
        );
    }
}

Sprite.default_state = {
    x: 0,
    y: 0,
    z: 20,
    name: "unnamed"
};
module.exports = Sprite;
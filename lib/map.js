var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const React = require("react");
const Sprite = require("./sprite");
SpriteList = props => {
    const sprites = props.sprites.map((spr, j) => {
        return React.createElement(Sprite, _extends({ key: `${j}` }, spr));
        //Will need better ids if I ever make sprite-lists modifiable... Which I probably will
    });
    return React.createElement(
        "div",
        null,
        sprites
    );
};

class Map extends React.Component {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this.state = {
            sprites: this.props.sprites || [],
            name: this.props.name || "unnamed" //Probably should raise an error for unnamed maps, this should be unique
        }, _temp;
    }

    render() {
        const { sprites, name } = this.state;
        return React.createElement(
            "div",
            null,
            React.createElement(SpriteList, { mapname: name, sprites: sprites })
        );
    }
}

module.exports = Map;
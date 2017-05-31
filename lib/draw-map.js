var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const { remote } = require("electron");
const React = require("react");
const Sprite = require("./draw-sprite");
const assets = require("../assets"); //Should be remote.require, but for some reason that doesn't work!
console.log(assets);
console.log(assets.config);

SpriteList = props => React.createElement(
    "div",
    null,
    Object.keys(props).map(sprKey => React.createElement(Sprite, _extends({
        key: sprKey
    }, props[sprKey])))
);

const mapStyle = state => ({
    backgroundImage: `url('../assets/maps/images/${state.src}')`,
    width: state.width,
    height: state.height,
    left: -state.viewportX,
    top: -state.viewportY
});

const resolution = [640, 400]; //Hard-coded for now

const viewportStyle = ({ resolution: [width, height] }) => {
    let scale = Math.min((window.innerWidth - 6) / width, (window.innerHeight - 6) / height);
    return {
        width: width,
        height: height,
        transform: `scale(${scale}`,
        marginTop: `${(window.innerHeight - height * scale) / 2}px`,
        marginLeft: `${(window.innerWidth - width * scale) / 2}px`
    }; //Later: Possibility of stretch-rendering?
};

const DrawMap = props => React.createElement(
    "div",
    {
        id: "draw-viewport",
        style: viewportStyle(assets.config)
    },
    React.createElement(
        "div",
        {
            className: "drawmap",
            style: mapStyle(props)
        },
        React.createElement(SpriteList, props.spriteList)
    )
);

module.exports = DrawMap;
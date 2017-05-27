var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const sprite = require("./sprite");
const transform = require("./transform");
module.exports.init = initState => {
    const spriteRemap = sprList => {
        return Object.keys(sprList).reduce((acm, key) => {
            return _extends({}, acm, { [key]: sprite.init(_extends({ name: key }, sprList[key])) });
        }, {});
    };
    return transform(initState, { spriteList: spriteRemap });
};
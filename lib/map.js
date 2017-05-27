var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const sprite = require("./sprite");
const transform = require("./transform");

const spriteRemap = sprList => Object.keys(sprList).reduce((acm, key) => _extends({}, acm, {
    [key]: sprite.init(_extends({ name: key }, sprList[key]))
}), {});

module.exports.init = (_ref) => {
    let { spriteList } = _ref,
        initState = _objectWithoutProperties(_ref, ["spriteList"]);

    return _extends({
        viewportX: 0, //defaults
        viewportY: 0
    }, initState, {
        spriteList: spriteRemap(spriteList)
    });
};
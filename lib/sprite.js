var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const assets = require('../assets');
const { init: playerInit } = require('./player');

let templateCount = 0;

const template = (templateName, rawState) => {
    console.log("hey!");console.log(templateName, rawState);return _extends({}, assets.templateSprites[templateName], {
        name: `${templateName}-${templateCount}つ` }, rawState);
};

const init = (_ref) => {
    let { fromTemplate } = _ref,
        rawState = _objectWithoutProperties(_ref, ['fromTemplate']);

    return !fromTemplate ? _extends({}, rawState, {
        player: playerInit(rawState.player)
    }) : init(template(fromTemplate, rawState));
};

module.exports.init = init;
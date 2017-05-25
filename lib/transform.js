var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

module.exports = (obj, transforms) => Object.keys(transforms).reduce((acm, transkey) => {
    const { [transkey]: oldValue } = acm,
          res = _objectWithoutProperties(acm, [transkey]);
    const transOp = transforms[transkey];
    if (transOp === null) {
        return res;
    } else if (typeof transOp === 'function') {
        return _extends({}, res, { [transkey]: transOp(oldValue, obj) });
    } else {
        return _extends({}, res, { [transkey]: transOp });
    }
}, _extends({}, obj));
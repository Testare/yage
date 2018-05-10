const _ = require('lodash/fp')
module.exports.init = (obj, params) => _.update(
    'behaviors',
    _.filter(b=>(b[0] != "secretmessage")),
    _.update(
        'data',
        data=>Object.assign({'message':params.message}, data), 
        obj
    )
)
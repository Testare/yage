const _ = require('lodash/fp')


const update = ({me, utils, ui, params, sprites}) => utils.sm(me, "burningSM", {
    "init":"cool",
    "states": {
        "cool": {
            "init":sprites.setAnimation(me,"walking"),
            "edges":[
                ["hot", _=>ui.checkDown(params.key || 'KeyV')]
            ]
        },
        "hot": {
            "init":utils.sprites.setAnimation(me,"burning"),
            "edges":[
                ["cool", _=>ui.checkUp(params.key || 'KeyV')]
            ]
        }
    },
})

module.exports = {update}
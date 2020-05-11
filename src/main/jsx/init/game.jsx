import { compose, head, reduce } from 'lodash/fp'
import { init as mapInit } from "./map"
import { initializeBehaviors } from './behaviors'

const initSpriteGroups = compose(
    head,
    reduce(
        ([obj,n], groupName) => (groupName === 'map') 
            ? [obj,n] 
            : [{...obj, [groupName]:n}, 0b10*n],
        [{"map":0b1},0b10]
    ),
)

const gameInit = assets => {
    const spriteGroups = initSpriteGroups(assets.config.spriteGroups || [])
    return initializeBehaviors(assets, {
        behaviors:[],
        data:{},
        ops:[],
        paused:false,
        defaultSaveLocation:"assets/saves",
        ...assets.config,
        spriteGroups,
        map: mapInit(assets)(assets.maps[assets.config.map], spriteGroups),
        assetPath:assets.assetPath
        //Load assets and config and initialize from there
    })
}

export const init = gameInit

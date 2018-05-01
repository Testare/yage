//This module is for storing and exporting all the data the game requires.
//It will handle caching for all the assets, but each asset type's index.js must provide a function that performs any
//transformations that must

//This defines all the types of assets, and the functions to clean them
assetReaders = {
    "actors":require("./actors"),
    "behaviors":require("./behaviors"),
    "maps":require("./maps"),
    "templateSprites":require("./templateSprites")
}

//requires the asset, and then passes json to the asset's assetReader to perform any necessary cleaning
const reqAsset = (assetType,assetName) => Object.assign({name:assetName},assetReaders[assetType](require(`./${assetType}/${assetName}`)))

module.exports = new Proxy({},{
    get: (cache,assetType) => (!assetReaders[assetType]) ? (
        (assetType === 'config')?require('./config'):undefined
    ) : ( //If not a type defined in assetReaders, return undefined
        cache[assetType] || (cache[assetType] = new Proxy({},{ //returns a proxy for that assetType from the cache (creating if necessary)
            get: (subCache,assetName) => subCache[assetName] || (subCache[assetName] = reqAsset(assetType,assetName))
            //Gets an asset of that type from the class, after being read.
        }))
    )
})


//module.exports = require("./")

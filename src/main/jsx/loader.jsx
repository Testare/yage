const path = require('path')

// This will create a cache that loads assets as needed for second-level assets
// (assets divided into folders, basically everything outside of config)
const secondLevelAssets = (assetPath, assetType) => new Proxy({},{ 
    get: (cache, assetName) => 
        cache[assetName] 
        || (cache[assetName] = Object.assign({name:assetName},
                require(path.join(assetPath, assetType, assetName))))
                //Object is loaded and given a "name" attribute
})

// Creates the assets object from an asset path
module.exports.loadAssetsFromPath = assetPath => ({
    "actors":secondLevelAssets(assetPath, "actors"),
    "behaviors":secondLevelAssets(assetPath, "behaviors"),
    "maps":secondLevelAssets(assetPath, "maps"),
    "templateSprites":secondLevelAssets(assetPath, "templateSprites"),
    "config":require(path.join(assetPath, "config")),
    "assetPath":assetPath
})
module.exports = new Proxy({},{
    get: (cache,asset) => cache[asset] || (cache[asset] = readSprite(asset))
})

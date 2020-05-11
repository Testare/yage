const map = require('../map');
const sprite = require('../sprite')
const behaviors = require('../behaviors')

jest.mock('../sprite')
jest.mock('../behaviors')

const mapInput = {
    "src":"asdf.png",
    "spriteList": {
        "bob": {
            "physics": "asdf",
            "player":{"actor":"asdf"}
        },
        "george": {
            "player":{"actor":"george"}
        }
    }
}
const mapOutput = {

}


test("testMap", ()=>{
    sprite.init.mockReturnValue((x,y)=>x)
    const retVal = map.init({"tracks":[]})(mapInput)
})
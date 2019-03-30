const _ = require('lodash/fp')
const {init} = require('../sprite')
const players = require('../player')
const behaviors = require('../behaviors')
const {stubs, testcases, assets} = require('./sprite_test_data')

jest.mock('../player')
jest.mock('../behaviors')

const runSimpleTestCase = str => {
    const testcase = testcases[str]
    players.init.mockReturnValue(x=>"PLAYER_STUB")

    const result = init(testcase.assets)(testcase.given, stubs.spriteGroups)

    expect(players.init).toHaveBeenCalled()
    expect(result).toEqual(testcase.expected)
}

const runSimpleTestCase2 = str => {
    const testcase = testcases[str]
    players.init.mockReturnValue(x=>stubs.player)
    behaviors.initializeBehaviors.mockImplementation((y,x)=>x)

    const result = init(testcase.assets)(testcase.given, stubs.spriteGroups)

    expect(players.init).toHaveBeenCalled()
    expect(result).toEqual(testcase.expected)
}

test("simple_master",()=>{runSimpleTestCase("simple_master")})
test("simple_template_master",()=>{runSimpleTestCase("simple_template_master")})
test("overridden_template_master",()=>{runSimpleTestCase("overridden_template_master")})
test("simple_nonmaster",()=>{runSimpleTestCase2("simple_nonmaster")})
test("simple_template_nonmaster",()=>{runSimpleTestCase2("simple_template_nonmaster")})
test("overridden_template_nonmaster",()=>{runSimpleTestCase2("overridden_template_nonmaster")})

// TODO Maybe instead of sprites being labeled "master" by not having physics, make them "master" only if they don't have position?
// I probably should have better test cases for specific things, but this will do for now
test("offsetApplied", ()=> {
    const OFFSET_AMOUNT = 58;// This value should not matter

    const exampleCase = testcases["simple_nonmaster"]
    const given = exampleCase.given
    const newPlayer = _.update(['actor',stubs.player.animation,'offsetX'],x=>x+OFFSET_AMOUNT,stubs.player)
    players.init.mockReturnValue(x=>newPlayer)

    const expected = _.pipe(
        _.update("physics.posX",x=>x-OFFSET_AMOUNT),
        _.set("player",newPlayer)
    )(exampleCase.expected)

    const result = init({})(given, stubs.spriteGroups)

    expect(result).toEqual(expected)
})

// Note: Need to test spritegroups and spritegroup flags
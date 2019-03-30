const {init} = require('../player')
const {assets,inputs,outputs,stubs} = require('./player_test_data')
const actor = require('../actor') 

jest.mock('../actor')

const runSimpleTestCase = str => test(str, ()=> {
    actor.init.mockReturnValue(stubs.initializedActor)
    const result = init(assets)(inputs[str])
    expect(result).toEqual(outputs[str])
    expect(actor.init).toBeCalledWith(stubs.actor)
})

// Tests a load case where we initialize the player from a simple actor name
runSimpleTestCase("test_load_string")

// Tests a load case where we initialize the player from some data with just an actor name
runSimpleTestCase("test_load_data_simple")

// Tests a load case where we initialize the player with some other data
runSimpleTestCase("test_load_data")


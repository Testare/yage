const {init} = require('../actor')
const {testcases, stubs} = require('./actor_test_data')

// Note: It is important to know that the "name" attribute is added to the actor
// object when loaded, and it is not necessary to add it to the actor file

const runSimpleTestCase = str => test(str, ()=> {
    const testcase = testcases[str]
    const result = init(testcase.given)
    expect(result).toEqual(testcase.expected)
})

runSimpleTestCase("simple_actor")
runSimpleTestCase("simple_animation")
runSimpleTestCase("two_animations")
runSimpleTestCase("complex_actor")

// Test collision data parsing
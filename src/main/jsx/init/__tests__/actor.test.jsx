import { init } from '../actor'

// Note: It is important to know that the "name" attribute is added to the actor
// object when loaded, and it is not necessary to add it to the actor definition file

const TEST_ACTOR_NAME = "ACTOR"
const STUB_ANIMATION = {
    "height": 10,
    "width": 10
}

const SIMPLE_ACTOR_DEFINITION = {
    "name": TEST_ACTOR_NAME,
    "main": STUB_ANIMATION
} 

describe("animation src property conventions", () => {
    const notDefaultSrc = "Not default string"
    const notMain = "notMain"
    const actor = init({
        "name": TEST_ACTOR_NAME,
        "main": STUB_ANIMATION,  
        notMain: STUB_ANIMATION,
        "nonDefault": {...STUB_ANIMATION, "src": notDefaultSrc}
    })

    test("when animation name is \"main\", src is <actorName>.png", ()=>{
        expect(actor["main"].src).toEqual(`${TEST_ACTOR_NAME}.png`)
    })
    test("when animation name is not \"main\", src is <actorName>.<animationName>.png", ()=>{
        expect(actor["nonDefault"].src).not.toEqual(`${TEST_ACTOR_NAME}.${notMain}.png`)
    })
    test("when specified, does not use default value", () => {
        expect(actor["nonDefault"].src).not.toEqual(`${TEST_ACTOR_NAME}.${notMain}.png`)
        expect(actor["nonDefault"].src).toEqual(notDefaultSrc)
    })

})

describe.each(["offsetX", "offsetY", "src"])("non-required property %s", propertyName => {
    test("initialized with default value", ()=>{
        const actor = init(SIMPLE_ACTOR_DEFINITION)
        expect(actor["main"][propertyName]).not.toBeNull()
        expect(actor["main"][propertyName]).not.toBeUndefined()
    })
    test("definition overrides default value", () => {
        const testValue = "not the default"
        const actor = init({
            "name": TEST_ACTOR_NAME,
            "main": {
                ...STUB_ANIMATION,
                [propertyName]: testValue
            }
        })
        expect(actor["main"][propertyName]).not.toBeNull()
        expect(actor["main"][propertyName]).not.toBeUndefined()
        expect(actor["main"][propertyName]).toEqual(testValue)
    })


})

describe("defaults created for all non-required animation properties, such as", () => {
    const actor = init(SIMPLE_ACTOR_DEFINITION)
    test("offsetX", () => {expect(actor["main"].offsetX).not.toBeNull()})
    test("offsetY", () => {expect(actor["main"].offsetY).not.toBeNull()})
    test("src", () => {expect(actor["main"].src).not.toBeNull()})
})

//
// Incomplete specs
//

describe("frames property", () => {
    test.skip("eachFrameInitialized", () => {

    })
    test.skip("if ticks not present and there are more than one frame, validation fails", () => {})

    // Probably should change to have a default frame
    test("is empty if not specified", () => {
        const actor = init(SIMPLE_ACTOR_DEFINITION)
        expect(actor["main"].frames).not.toBeNull()
        expect(actor["main"].frames).not.toBeUndefined()
        expect(actor["main"].frames).toEqual([])
    })
})

//
// Unimplemented specs 
//

describe.skip("collision data", () => {
    test("is optional", () => {

    })
    test("can have more than one shape per frame", () => {})
    describe("coords property", ()=> {
        test("parses a string", () => {

        })
        test("parses an array", () => {

        })
        test("If invalid format, becomes <some sort of object that validations will detect as broken>", () => {
            // Current behavior is throwing an error now anyways
        })
    })
    describe("shapes", () => {
        describe.each([
                ["circle", 2],
                ["box", 4],
                ["rect", 4]
            ])("%s", (shape, coordCount) => {
                test("is a valid shape", () =>{})
                test(`Validates with ${coordCount} coords`, () => {})
                test(`Fails validation with ${coordCount + 1} coords`, () => {})
            }
        )
        test("Fails validation with invalid shape", () => {})
    })
    
})
test.skip("actorRequiresWidthAndHeight", () => {
    // After we add validation calls
})


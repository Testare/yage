/**
 * This file is me expirementing, trying to figure out a good way to define behavior in a functional way.
 */
const demoState = {
    name:"George",
    friends:{
        "leroy":"hateful",
        "georgina":"sister",
        "bob":"cheery"
    }
}

const demoGetFriend = []

const demoBehavior = (friend) => [
    ["let","x",_ => 5],
    ["do",({x},state)=>console.log(x)]
]

const implementBehavior = behavior => state => (
    behavior.reduce(([behaviorScope,[cmd,value1,value2 = null]])=>{
        switch(cmd) {
            case "do": //Do something, discard value
                [_, nextState] = value1(behaviorScope)
                return [behaviorScope,state]
            case "get": //Stated assignment ops
                break;
            case "let": //Stateless assignment ops
                return [{
                    ...behaviorScope,
                    [value1]:value2(behaviorScope)
                },state]
            default:
                console.log("Erroneous behavior here!")
        }
    },[{},state])[1]
)


console.log("Yo!")

const fp = require('lodash/fp')
const ui = require('../ui')
const behaviorUtils = require('../behavior/utils')

const { update: playerUpdate } = require("./update-player")
const {updateState: physicsUpdate} = require("./physics")

const updatePlayers = fp.update('map.spriteList',
    fp.mapValues(fp.update('player', playerUpdate))
)

// Check that the state still looks something like a state
// Might be updated later, but best to keep it simple
const checkStateReturned = fp.compose(
    fp.every(fp.identity),
    fp.juxt([
        fp.hasIn('map'),
        fp.hasIn('name')
    ]))

// If an error returns an invalid state, ignore the change and send an error message to console
const errorCheckBehavior = (behaviorName, safeState) => state => 
    checkStateReturned(state) 
        ? state 
        : (
            console.error(`Behavior "${behaviorName}" produced invalid state`),
            console.error(state),
            safeState
        )

const getBehaviorNameAndParams = (behavior) => fp.isString(behavior)
        ? [behavior, {}]
        : behavior

const updateSpriteBehavior = behaviors => state => fp.reduce(
        (state_, sprName) =>  fp.reduce(
            (state__, behavior) => {
                const [behNam, params] = getBehaviorNameAndParams(behavior)
                return errorCheckBehavior(behNam, state__)
                    (behaviors[behNam].update(
                        {ui, params, me:sprName, ...behaviorUtils, utils:behaviorUtils})
                        (state__))
            },
            state_,
            state.map.spriteList[sprName].behaviors
        ),
        state,
        Object.keys(state.map.spriteList)
    )

// Update the state!
const runUpdate = assets => fp.pipe(
        (state => state.paused 
            ? state
            : physicsUpdate(updatePlayers(state))
        ),
        updateSpriteBehavior(assets.behaviors)
    )

module.exports = runUpdate

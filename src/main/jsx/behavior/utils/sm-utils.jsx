const _ = require('lodash/fp')

const createStateMachine = (me, stateMachineName, stateMachine, state) => {
    const stateLabel = state.map.spriteList[me].data[stateMachineName] || stateMachine.init
    const currentSMState = stateMachine.states[stateLabel]
    const update = stateMachine.states[stateLabel].update || _.identity
    const updatedState = update(state)
    const edgeIndex = _.findIndex(edge=>edge[1](updatedState), (currentSMState.edges || []))
    if (edgeIndex == -1) {
        return updatedState;
    } else {
        const nStateLabel = currentSMState.edges[edgeIndex][0]; 
        return _.pipe(
            _.update(`map.spriteList['${me}'].data['${stateMachineName}']`, _.constant(nStateLabel)),
            (stateMachine.states[nStateLabel].init || _.identity)
        )(updatedState)
    }
}

let sm = _.curry(createStateMachine) //(stateMachine, state) => (state) ? createStateMachine(stateMachine)(state) : createStateMachine(stateMachine)

module.exports = _.curry(createStateMachine)

const React = require('react')
const Map = require('./map')

class Game extends React.Component {
    render() {
        return (<Map {...props} />)
    }
}

module.exports = Game
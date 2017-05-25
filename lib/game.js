const React = require('react');
const Map = require('./map');

class Game extends React.Component {
    render() {
        return React.createElement(Map, props);
    }
}

module.exports = Game;
const React = require("react")
const ReactDOM = require("react-dom")
console.log(React)
console.log(ReactDOM)
const Test = _ => {
    return (
        <p>Testing testing 1-2-3</p>
    );
}
class Sprite extends React.Component {
    state = {
        x: 100,
        y: 100
    }
    style = _ => {
        return {
            left: this.state.x,
            top: this.state.y
        }
    };
    render() {
        return <p className="sprite"
                  style={this.style()}>Testy</p>
    }
}
class App extends React.Component {
    state = {};
    render() {
        return <Sprite />
    }
}

ReactDOM.render(<App />,document.getElementById("react-mount"));
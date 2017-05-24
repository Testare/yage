const React = require("react")
const ReactDOM = require("react-dom")
console.log(React)
console.log(ReactDOM)
const Test = _ => {
    return (
        <p>Testing testing 1-2-3</p>
    );
}

ReactDOM.render(<Test />,document.body);
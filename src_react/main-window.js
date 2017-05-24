const React = require("react")
const ReactDOM = require("react-dom")
const example_map = require("../assets/maps/default")
const Map = require("./map")

ReactDOM.render(<Map {...example_map}/>,document.getElementById("react-mount"));
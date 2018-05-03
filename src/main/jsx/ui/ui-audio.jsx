const React = require("react")
const path = require('path')
const audio = require('./audio')

class Song extends React.Component {
    constructor(props) {
        super(props)
        this.audio = null
    }
    componentDidMount() {
        this.audio.volume = this.props.volume
    }
    render() {
        const {volume, ...mainProps} = this.props
        if(this.audio) {this.audio.volume=volume}
        return <audio autoPlay loop ref={(audio)=>{this.audio = audio}} {...mainProps} />
    }
}

const Sound = ({name, src}) => <audio autoPlay src={src} onEnded={_=>audio.markForCleanup(name)} />
const Track = ({assetpath, srcs}) => <div>
        {srcs.map(audio.toStandardAudio).map(src=> <Song volume={src[1]} key={src[0]} src={path.join(assetpath, src[0])} />)}
    </div>

const AudioPlayer = ({tracks, sounds}) => (
    <div>
        <div key="tracks">
            {Object.keys(tracks).map((name) => <Track key={name} assetpath="../assets/audio/" srcs={tracks[name]} />)}
        </div>
        <div key="sounds">
            {Object.keys(sounds).map((name) => <Sound key={name} name={name} src={`../assets/audio/${sounds[name]}`} />)}
        </div>
    </div>
)

module.exports = AudioPlayer
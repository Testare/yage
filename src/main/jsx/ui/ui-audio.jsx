const React = require('react')
const path = require('path')
const audio = require('./audio')
const fs = require('fs')

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

const Track = ({assetPath, srcs}) => <div>
        {srcs.map(audio.toStandardAudio).map(src=> <Song volume={src[1]} key={src[0]} src={path.join(assetPath, 'audio', src[0])} />)}
    </div>

const SoundBoard = ({assetPath, name}) => {
    const sounds = (name === "all") ? fs.readdirSync(path.join(assetPath, 'audio')) : [] // TODO implement optional soundboards
    return <div key='sb'>
        {sounds.map(src=><audio src={path.join(assetPath,'audio',src)} key={src} />)}
    </div>
}

const Sound = ({assetPath, name, src}) => <audio autoPlay src={path.join(assetPath, 'audio', src)} onEnded={_=>audio.markForCleanup(name)} />

const AudioPlayer = ({assetPath, soundBoards, tracks, sounds}) => ( 
    <div>
        <div key="tracks">
            {Object.keys(tracks).map((name) => <Track key={name} assetPath={assetPath} srcs={tracks[name]} />)}
        </div>
        <div key="soundBoards">
            {soundBoards.map((name) => <SoundBoard key={name} assetPath={assetPath} name={name} />)}
        </div>
        <div key="sounds">
            {Object.keys(sounds).map((name) => <Sound key={name} name={name} assetPath={assetPath} src={sounds[name]} />)}
        </div>
    </div>
)

module.exports = AudioPlayer
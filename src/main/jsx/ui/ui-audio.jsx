const React = require("react")
const path = require('path')
const audio = require('./audio')

const Sound = ({name, src}) => <audio autoPlay src={src} onEnded={_=>audio.markForCleanup(name)} />
const Track = ({assetpath, srcs}) => <audio autoPlay loop src={path.join(assetpath, srcs[0])} />

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
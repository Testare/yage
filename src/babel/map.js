const React = require("react")
const Sprite = require("./sprite")
SpriteList = (props) => {
        /*const z_lists = props.sprites.reduce((acm, spr) => {
            //This has been deemed unecessary, since z-index works fine. However,
            //I'm keeping this code here for just one commit just in case I need 
            //to restructure the architecture in the future
            //Separates sprites into z-lists
            const spr_z = spr.z || Sprite.default_state.z;
            const z_lst = (acm[spr_z] || []).concat([spr])
            return Object.assign([],acm,{[spr_z]:z_lst}) //Functional!
        },[]).map((z_lst, i) => {
            const z_key = `z-${i}` 
            const sprites = z_lst.map((spr,j) => {
                return <Sprite key={`${z_key}-s-${j}`} {...spr}/>
                //Will need better ids if I ever make sprite-lists modifiable... Which I probably will
            })
            return <div className="z-list" >{sprites}</div>
        })
        return <div>{z_lists}</div>
        */
        const sprites = props.sprites.map((spr,j) => {
            return <Sprite key={`${j}`} {...spr}/>
            //Will need better ids if I ever make sprite-lists modifiable... Which I probably will
        })
        return <div>{sprites}</div>
}

class Map extends React.Component {
    state = {
        sprites: this.props.sprites || [],
        name: this.props.name || "unnamed" //Probably should raise an error for unnamed maps, this should be unique
    }
    render() {
        const {sprites,name} = this.state;
        return (
        <div>
            <SpriteList mapname={name} sprites={sprites} />
        </div>
        )
    }
}

module.exports = Map
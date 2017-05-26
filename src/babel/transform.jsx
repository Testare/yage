module.exports = (obj, transforms) => 
    Object.keys(transforms).reduce( (acm, transkey) => {
        const {[transkey]:oldValue, ...res} = acm
        const transOp = transforms[transkey]
        if( transOp === null) {
            return res
        } else if (typeof transOp === 'function') {
            return {...res,[transkey]:transOp(oldValue,obj)}
        } else {
            return {...res,[transkey]:transOp}
        }
    },{...obj})
import _ from "lodash/fp";

export const mustHave = (identifier, obj, ...properties) => {
    for (property in properties) {
        if (!_.hasIn(obj, param)) {
            throw {
                "type": "MissingProperty",
                "description": `Missing required property [${property}] in [${identifier}]`,
                "shortDescription": "Missing required property",
                "missingProperty": property,
                object: obj,
                identifier,
            }

        }
    }
    return obj
}

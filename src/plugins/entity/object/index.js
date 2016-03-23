function takeValue(resolver, compDef, wire) {
    wire(compDef.options).then(({
        withKey,
        byObject
    }) => {
        resolver.resolve(byObject[withKey]);
    })
}

export default function ObjectEntityPlugin(options) {
    return {
        factories: {
            takeValue
        }
    }
}
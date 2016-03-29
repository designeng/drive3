import rootWire from 'essential-wire';
import bootstrapSpec from '../../blocks/bootstrap/spec';

export const bootstrapTask = (context) => {
    return context ? context.wire(bootstrapSpec) : rootWire(bootstrapSpec)
}

export const getRouteTask = (routeSpec) => {
    return (context) => {
        return context.wire(routeSpec)
    }
}
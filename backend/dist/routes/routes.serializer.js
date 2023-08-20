"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteSerializer = void 0;
class RouteSerializer {
    constructor(route) {
        this.id = route.id;
        this.name = route.name;
        this.created_at = route.created_at;
        this.updated_at = route.updated_at;
        this.distance = route.distance;
        this.duration = route.duration;
        this.directions = JSON.parse(route.directions);
        this.source = route.source;
        this.destination = route.destination;
    }
}
exports.RouteSerializer = RouteSerializer;
//# sourceMappingURL=routes.serializer.js.map
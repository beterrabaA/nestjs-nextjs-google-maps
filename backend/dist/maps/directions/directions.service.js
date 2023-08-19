"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectionsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
let DirectionsService = exports.DirectionsService = class DirectionsService {
    constructor(configService, googleMapsClient) {
        this.configService = configService;
        this.googleMapsClient = googleMapsClient;
    }
    async getDirections(originId, destinationId) {
        const params = {
            origin: `place_id:${originId}`,
            destination: `place_id:${destinationId}`,
            mode: google_maps_services_js_1.TravelMode.driving,
            key: this.configService.get('GOOGLE_MAPS_API_KEY'),
        };
        const { data } = await this.googleMapsClient.directions({
            params,
        });
        return {
            ...data,
            request: {
                origin: {
                    place_id: params.origin,
                    location: {
                        lat: data.routes[0].legs[0].start_location.lat,
                        lng: data.routes[0].legs[0].start_location.lng,
                    },
                },
                destination: {
                    place_id: params.destination,
                    location: {
                        lat: data.routes[0].legs[0].end_location.lat,
                        lng: data.routes[0].legs[0].end_location.lng,
                    },
                },
                mode: params.mode,
            },
        };
    }
};
exports.DirectionsService = DirectionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        google_maps_services_js_1.Client])
], DirectionsService);
//# sourceMappingURL=directions.service.js.map
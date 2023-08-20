import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { DirectionsService } from 'src/maps/directions/directions.service';
export declare class RoutesService {
    private prismaService;
    private directionsService;
    constructor(prismaService: PrismaService, directionsService: DirectionsService);
    create(createRouteDto: CreateRouteDto): Promise<{
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
        distance: number;
        duration: number;
        directions: import(".prisma/client").Prisma.JsonValue;
    } & {
        source: {
            name: string;
        } & {
            location: {
                lat: number;
                lng: number;
            };
        };
        destination: {
            name: string;
        } & {
            location: {
                lat: number;
                lng: number;
            };
        };
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
        distance: number;
        duration: number;
        directions: import(".prisma/client").Prisma.JsonValue;
    } & {
        source: {
            name: string;
        } & {
            location: {
                lat: number;
                lng: number;
            };
        };
        destination: {
            name: string;
        } & {
            location: {
                lat: number;
                lng: number;
            };
        };
    })[]>;
    findOne(id: number): string;
    update(id: number, updateRouteDto: UpdateRouteDto): string;
    remove(id: number): string;
}

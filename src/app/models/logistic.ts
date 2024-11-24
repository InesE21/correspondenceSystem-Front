export interface TransportI {
    id?: number;
    transportation: 'PLANE' | 'TRUCK' | 'MOTORBIKE';  // Type of transport: Plane, Truck, or Motorbike
    capacity: number;  // Capacity of the transport vehicle
}

export interface RouteI {
    id?: number;
    origin: string;  // Starting location of the route
    destination: string;  // End location of the route
    stops?: string | null;  // Optional intermediate stops, null if none
    transports: TransportI[];  // Array of TransportI (types of transport) used in the route
}
  
export interface ServicelI {
    id?: number;
    transportation: 'EXPRESS' | 'NORMAL';  // Type of service: Express or Normal
    cost: number;  // Cost of the service
}

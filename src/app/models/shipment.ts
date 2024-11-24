import { CustomerI } from './person'
import { ServicelI } from './logistic'
import { EmployeeI } from './person'
import { BranchI } from './branch';

export interface CorrespondenceI {
    id?: number;
    code: string;  // Unique code for the correspondence
    correspondenceType: string;  // Type of correspondence (e.g., letter, package)
    weight: number;  // Weight of the correspondence
    dimensions: string;  // Dimensions of the correspondence (e.g., "30x20x5")
    shipmentDate: Date;  // Date when the correspondence was shipped
    deliveryDate: Date;  // Date when the correspondence is expected to be delivered
    sender: CustomerI;  // Sender information (CustomerI interface)
    receiver: CustomerI;  // Receiver information (CustomerI interface)
    service: ServicelI;  // Service type used for shipping (ServicelI interface)
}

// Function to generate tracking code
export function generateTrackingCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;  // Returns a randomly generated 6-character tracking code
}

export interface ShippingI {
    id?: number;
    status: 'AT ORIGIN' | 'AT DESTINATION' | 'ON THE WAY' | 'DELIVERED';  // Shipping status
    dateTime: Date;  // Date and time of the shipping event
    correspondence: CorrespondenceI;  // Reference to the associated correspondence (CorrespondenceI interface)
    branch: BranchI;  // Branch associated with the shipping (BranchI interface)
    employee: EmployeeI;  // Employee associated with the shipping (EmployeeI interface)
}

export interface IncidentI {
    id?: number;
    description: string;  // Description of the incident
    incidentDate: Date;  // Date of the incident
    resolutionStatus: 'REPORTED' | 'SCALED' | 'IN RESOLUTION' | 'RESOLVED' | 'CLOSED';  // Resolution status of the incident
    correspondence: CorrespondenceI;  // Correspondence related to the incident (CorrespondenceI interface)
}

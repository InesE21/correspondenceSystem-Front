import { BranchI } from './branch';  
import { RouteI } from './logistic';  

export interface CustomerI {
    id?: number;
    dni: number;                   // Unique identification number
    fullname: string;              // Full name
    address: string;               // Customer's address
    phoneNumber: string;           // Phone number (must be unique)
    mail: string;                  // Email address (must be unique)
    customer_type: 'NORMAL' | 'PREMIUM';  // Customer type: normal or premium
}
  
export interface EmployeeI {
    id?: number;
    fullname: string;                       // Full name of the employee
    position: 'MANAGER' | 'ADVISOR' | 'DISTRIBUTOR' | 'SUPERVISOR';  // Employee position
    branch: BranchI;                         // ForeignKey to the branch (Branch)
    assignedRoute?: RouteI | null;           // ForeignKey to the route (Assigned Route), only if the employee is a distributor
}

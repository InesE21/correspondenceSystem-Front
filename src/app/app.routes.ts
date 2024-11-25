// Importing required Angular router module and components
import { Routes } from '@angular/router';  // Angular's Routes type for defining application routes

// Importing components for each feature/module
// Each feature (e.g., branch, logistics, shipment) has components for showing, creating, and updating records
import { ShowBranchComponent } from './components/branch/show-branch/show-branch.component';
import { CreateBranchComponent } from './components/branch/create-branch/create-branch.component';
import { UpdateBranchComponent } from './components/branch/update-branch/update-branch.component';
import { ShowRouteComponent } from './components/logistics/route/show-route/show-route.component';
import { CreateRouteComponent } from './components/logistics/route/create-route/create-route.component';
import { UpdateRouteComponent } from './components/logistics/route/update-route/update-route.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { ShowServiceComponent } from './components/logistics/servicel/show-service/show-service.component';
import { CreateServiceComponent } from './components/logistics/servicel/create-service/create-service.component';
import { UpdateServiceComponent } from './components/logistics/servicel/update-service/update-service.component';
import { ShowTransportComponent } from './components/logistics/transport/show-transport/show-transport.component';
import { CreateTransportComponent } from './components/logistics/transport/create-transport/create-transport.component';
import { UpdateTransportComponent } from './components/logistics/transport/update-transport/update-transport.component';
import { ShowCustomerComponent } from './components/person/customer/show-customer/show-customer.component';
import { CreateCustomerComponent } from './components/person/customer/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './components/person/customer/update-customer/update-customer.component';
import { ShowEmployeeComponent } from './components/person/employee/show-employee/show-employee.component';
import { CreateEmployeeComponent } from './components/person/employee/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './components/person/employee/update-employee/update-employee.component';
import { ShowCorrespondenceComponent } from './components/shipment/correspondence/show-correspondence/show-correspondence.component';
import { CreateCorrespondenceComponent } from './components/shipment/correspondence/create-correspondence/create-correspondence.component';
import { UpdateCorrespondenceComponent } from './components/shipment/correspondence/update-correspondence/update-correspondence.component';
import { ShowIncidentComponent } from './components/shipment/incident/show-incident/show-incident.component';
import { CreateIncidentComponent } from './components/shipment/incident/create-incident/create-incident.component';
import { UpdateIncidentComponent } from './components/shipment/incident/update-incident/update-incident.component';
import { ShowShippingComponent } from './components/shipment/shipping/show-shipping/show-shipping.component';
import { CreateShippingComponent } from './components/shipment/shipping/create-shipping/create-shipping.component';
import { UpdateShippingComponent } from './components/shipment/shipping/update-shipping/update-shipping.component';
import { Query2Component } from './components/queries/query2/query2.component';
import { Query1Component } from './components/queries/query1/query1.component';
import { Query3Component } from './components/queries/query3/query3.component';
import { Query4Component } from './components/queries/query4/query4.component';
import { Query5Component } from './components/queries/query5/query5.component';
import { Query6Component } from './components/queries/query6/query6.component';
import { Query7Component } from './components/queries/query7/query7.component';


// Defining application routes
export const routes: Routes = [
    // Root/Home routes
    { path: "", component: DashboardComponent },  // Default route, loads DashboardComponent
    { path: "documentation", component: DocumentationComponent },  // Route for Documentation page

    // Branch-related routes
    { path: "branch/show", component: ShowBranchComponent },  // Show all branches
    { path: "branch/new", component: CreateBranchComponent },  // Create a new branch
    { path: "branch/edit/:id", component: UpdateBranchComponent },  // Edit a specific branch (based on ID)

    // Logistics-related routes
    // Route management
    { path: "logistics/route/show", component: ShowRouteComponent },  // Show all routes
    { path: "logistics/route/new", component: CreateRouteComponent },  // Create a new route
    { path: "logistics/route/edit/:id", component: UpdateRouteComponent },  // Edit a specific route (based on ID)

    // Service management
    { path: "logistics/servicel/show", component: ShowServiceComponent },  // Show all services
    { path: "logistics/servicel/new", component: CreateServiceComponent },  // Create a new service
    { path: "logistics/servicel/edit/:id", component: UpdateServiceComponent },  // Edit a specific service (based on ID)

    // Transport management
    { path: "logistics/transport/show", component: ShowTransportComponent },  // Show all transport entries
    { path: "logistics/transport/new", component: CreateTransportComponent },  // Create a new transport entry
    { path: "logistics/transport/edit/:id", component: UpdateTransportComponent },  // Edit a specific transport entry (based on ID)

    // Person-related routes
    // Customer management
    { path: "persons/customer/show", component: ShowCustomerComponent },  // Show all customers
    { path: "persons/customer/new", component: CreateCustomerComponent },  // Create a new customer
    { path: "persons/customer/edit/:id", component: UpdateCustomerComponent },  // Edit a specific customer (based on ID)

    // Employee management
    { path: "persons/employee/show", component: ShowEmployeeComponent },  // Show all employees
    { path: "persons/employee/new", component: CreateEmployeeComponent },  // Create a new employee
    { path: "persons/employee/edit/:id", component: UpdateEmployeeComponent },  // Edit a specific employee (based on ID)

    // Shipment-related routes
    // Correspondence management
    { path: "shipments/correspondence/show", component: ShowCorrespondenceComponent },  // Show all correspondence entries
    { path: "shipments/correspondence/new", component: CreateCorrespondenceComponent },  // Create a new correspondence entry
    { path: "shipments/correspondence/edit/:id", component: UpdateCorrespondenceComponent },  // Edit a specific correspondence entry (based on ID)

    // Incident management
    { path: "shipments/incident/show", component: ShowIncidentComponent },  // Show all incidents
    { path: "shipments/incident/new", component: CreateIncidentComponent },  // Create a new incident
    { path: "shipments/incident/edit/:id", component: UpdateIncidentComponent },  // Edit a specific incident (based on ID)

    // Shipping management
    { path: "shipments/shipping/show", component: ShowShippingComponent },  // Show all shipments
    { path: "shipments/shipping/new", component: CreateShippingComponent },  // Create a new shipment
    { path: "shipments/shipping/edit/:id", component: UpdateShippingComponent },  // Edit a specific shipment (based on ID)

    // Queries-related routes
    { path: "queries/query1/show", component: Query1Component}, // Show query 1
    { path: "queries/query2/show", component: Query2Component}, // Show query 2
    { path: "queries/query3/show", component: Query3Component}, // Show query 3
    { path: "queries/query4/show", component: Query4Component}, // Show query 4
    { path: "queries/query5/show", component: Query5Component}, // Show query 5
    { path: "queries/query6/show", component: Query6Component}, // Show query 6
    { path: "queries/query7/show", component: Query7Component}, // Show query 7
];

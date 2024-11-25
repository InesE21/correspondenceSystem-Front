/**
 * This component (`AsideComponent`) defines a navigation sidebar using PrimeNG's `PanelMenu`. 
 * It organizes menu items hierarchically, providing navigation links to different sections of the application. 
 * The menu supports features like grouping, icons, and nested submenus for better organization.
 */

import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu'; // PrimeNG PanelMenu module for creating collapsible menu structures
import { MenuItem } from 'primeng/api'; // Interface for defining menu items
import { LayoutService } from '../../../services/layout.services'; // Service for handling layout-related operations

@Component({
  selector: 'app-aside', // Component selector used in HTML templates
  standalone: true, // Indicates this component is standalone (doesn't depend on Angular modules)
  imports: [PanelMenuModule], // Imports the required PrimeNG module
  templateUrl: './aside.component.html', // Path to the HTML template
  styleUrls: ['./aside.component.css'], // Path to the CSS styles
})
export class AsideComponent {
  // Array of menu items for the PanelMenu
  items: MenuItem[] = [];
  
  // Constructor to inject dependencies
  constructor(public layoutService: LayoutService) {}

  // Lifecycle hook to initialize the menu items
  ngOnInit(): void {
    // Menu configuration with hierarchical structure
    this.items = [
      {
        label: 'Persons', // Main menu label
        icon: 'pi pi-fw pi-users', // Icon for the menu
        items: [ // Submenu items
          {
            label: 'Customers',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Show Customers', // Navigation link to view customers
                icon: 'pi pi-fw pi-eye', // Icon for the submenu item
                routerLink: '/persons/customer/show', // Router path
              },
            ]
          },
          {
            label: 'Employees',
            icon: 'pi pi-id-card',
            items: [
              {
                label: 'Show Employees',
                icon: 'pi pi-fw pi-eye',
                routerLink: '/persons/employee/show',
              },
            ]
          },
        ]
      },
      {
        label: 'Shipment Management',
        icon: 'pi pi-envelope',
        items: [
          {
            label: 'Correspondences',
            icon: 'pi pi-envelope',
            items: [
              {
                label: 'Show Correspondences',
                icon: 'pi pi-fw pi-eye',
                routerLink: '/shipments/correspondence/show',
              },
            ]
          },
          {
            label: 'Shipment Status',
            icon: 'pi pi-info-circle',
            items: [
              {
                label: 'Show Status',
                icon: 'pi pi-fw pi-eye',
                routerLink: '/shipments/shipping/show',
              },
            ]
          },
          {
            label: 'Incidents',
            icon: 'pi pi-exclamation-triangle',
            items: [
              {
                label: 'Show Incidents',
                icon: 'pi pi-fw pi-eye',
                routerLink: '/shipments/incident/show',
              },
            ]
          },
        ]
      },
      {
        label: 'Logistics',
        icon: 'pi pi-map',
        items: [
          {
            label: 'Routes',
            icon: 'pi pi-directions',
            items: [
              {
                label: 'Show Routes',
                icon: 'pi pi-fw pi-eye',
                routerLink: '/logistics/route/show',
              },
            ]
          },
          {
            label: 'Services',
            icon: 'pi pi-cog',
            items: [
              {
                label: 'Show Services',
                icon: 'pi pi-fw pi-eye',
                routerLink: '/logistics/servicel/show',
              },
            ]
          },
          {
            label: 'Transports',
            icon: 'pi pi-truck',
            items: [
              {
                label: 'Show Transports',
                icon: 'pi pi-fw pi-eye',
                routerLink: '/logistics/transport/show',
              },
            ]
          },
        ]
      },
      {
        label: 'Branches',
        icon: 'pi pi-map-marker',
        items: [
          {
            label: 'Show Branches',
            icon: 'pi pi-fw pi-eye',
            routerLink: '/branch/show',
          },
        ]
      },
      {
        label: 'Queries',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Query 1',
            icon: 'pi pi-fw pi-eye',
            routerLink: '/queries/query1/show',
          },
          {
            label: 'Query 2',
            icon: 'pi pi-fw pi-eye',
            routerLink: '/queries/query2/show',
          },
          {
            label: 'Query 3',
            icon: 'pi pi-fw pi-eye',
            routerLink: '/queries/query3/show',
          },
          {
            label: 'Query 4',
            icon: 'pi pi-fw pi-eye',
            routerLink: '/queries/query4/show',
          },
          {
            label: 'Query 5',
            icon: 'pi pi-fw pi-eye',
            routerLink: '/queries/query5/show',
          },
          {
            label: 'Query 6',
            icon: 'pi pi-fw pi-eye',
            routerLink: '/queries/query6/show',
          },
          {
            label: 'Query 7',
            icon: 'pi pi-fw pi-eye',
            routerLink: '/queries/query7/show',
          },
        ]
      },
    ];
  }
}

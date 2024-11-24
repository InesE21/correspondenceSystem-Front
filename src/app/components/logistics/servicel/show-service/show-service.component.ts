// This component displays a list of logistic services in a table format, allowing users to view and delete services.

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ServicelI } from '../../../../models/logistic';
import { ServicelService } from '../../../../services/logistics/servicel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-service', // Defines the component's selector used in templates.
  standalone: true, // Declares the component as standalone (does not depend on an NgModule).
  imports: [RouterModule, TableModule, ButtonModule, CardModule], // Declares external modules used in the template.
  templateUrl: './show-service.component.html', // Path to the HTML template for this component.
  styleUrl: './show-service.component.css' // Path to the CSS file for this component.
})
export class ShowServiceComponent implements OnInit {
  // Public array to hold the list of services fetched from the backend.
  public servicess: ServicelI[] = [];

  constructor(
    private servicelService: ServicelService, // Injects the service to interact with the backend API.
    private router: Router // Injects the Angular Router for navigation.
  ) { }

  // Lifecycle hook that runs after the component initializes.
  ngOnInit(): void {
    this.showServicel(); // Fetches and displays the list of services.
  }

  /**
   * Fetches all services from the backend.
   * Populates the 'servicess' array with the retrieved data.
   */
  showServicel() {
    this.servicelService.getAllServicel()
      .subscribe({
        next: (data) => {
          this.servicess = data; // Assign the fetched data to the services array.
        },
        error: (err) => {
          console.error('Error fetching services:', err); // Logs errors to the console for debugging.
        }
      });
  }

  /**
   * Deletes a service by its ID.
   * @param id - The ID of the service to be deleted.
   */
  delete(id: number): void {
    this.servicelService.deleteServicel(id).subscribe(
      () => {
        this.showServicel(); // Refresh the list after successful deletion.
      },
      err => {
        console.error('Error deleting service:', err); // Logs errors to the console for debugging.
      }
    );
  }
}

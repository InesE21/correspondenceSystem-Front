/**
 * Component: ShowRouteComponent
 * Purpose:
 * This component displays a list of routes in a table format and provides functionalities
 * for viewing, editing, and deleting routes. 
 * 
 * Features:
 * - Fetches and displays a list of routes using the RouteService.
 * - Allows deletion of a route with a confirmation.
 * - Provides navigation to route editing and creation pages.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouteI } from '../../../../models/logistic';
import { RouteService } from '../../../../services/logistics/route.service';

@Component({
  selector: 'app-show-route',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule],
  templateUrl: './show-route.component.html',
  styleUrl: './show-route.component.css'
})
export class ShowRouteComponent implements OnInit {
  /**
   * Array to hold the list of routes retrieved from the service.
   */
  public routes: RouteI[] = [];

  constructor(
    private routeService: RouteService, // Service to handle route-related operations.
    private router: Router // Router for navigation.
  ) {}

  /**
   * Lifecycle hook: Runs when the component initializes.
   * Calls the showRoutes method to load route data.
   */
  ngOnInit(): void {
    this.showRoutes();
  }

  /**
   * Fetches the list of routes from the server using the RouteService
   * and assigns the data to the `routes` array.
   */
  showRoutes(): void {
    this.routeService.getAllRoute()
      .subscribe({
        next: (data) => {
          this.routes = data; // Populate routes array with fetched data.
        },
        error: (err) => {
          console.error('Error fetching routes:', err);
        }
      });
  }

  /**
   * Deletes a specific route by its ID.
   * On success, refreshes the list of routes. On error, logs an error message.
   * @param id - The ID of the route to be deleted.
   */
  delete(id: number): void {
    this.router.navigateByUrl('/logistics/route/'); // Redirect to the routes page.
    this.routeService.deleteRoute(id).subscribe(
      () => {
        this.showRoutes(); // Refresh the route list after successful deletion.
      },
      err => {
        console.error('Error deleting route:', err);
        this.router.navigateByUrl('/logistics/route/');
      }
    );
  }
}

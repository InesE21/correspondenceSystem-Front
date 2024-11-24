/**
 * Component: UpdateRouteComponent
 * Purpose:
 * This component allows users to update an existing route's details such as origin, destination, stops, 
 * and associated transport(s). It leverages Angular's reactive forms and communicates with a backend service 
 * to fetch and update the route details.
 * 
 * Features:
 * - Fetches route data by ID and pre-populates the form for editing.
 * - Loads transport options dynamically from the backend.
 * - Performs form validation to ensure required fields are provided.
 * - Updates the route and navigates back to the route list upon success.
 */

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouteI, TransportI } from '../../../../models/logistic';
import { RouteService } from '../../../../services/logistics/route.service';
import { TransportService } from '../../../../services/logistics/transport.service';

@Component({
  selector: 'app-update-route',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-route.component.html',
  styleUrl: './update-route.component.css',
})
export class UpdateRouteComponent implements OnInit {
  public id: number = 0; // The route ID being edited
  public form: FormGroup; // Reactive form for capturing route details
  transports: TransportI[] = []; // Array to hold transport options

  // Inject services for route and transport management
  routeService = inject(RouteService);
  transportService = inject(TransportService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute // Used to capture route parameters
  ) {
    // Initialize the reactive form with validation
    this.form = this.formBuilder.group({
      origin: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      stops: ['', [Validators.required]],
      transport: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Fetch the route ID from the URL parameters
    this.id = this.route.snapshot.params['id'];
    this.getRoute(this.id); // Load route data
    this.loadTransports(); // Load available transports
  }

  /**
   * Fetches route details by ID and populates the form for editing.
   * @param id - The ID of the route to be fetched.
   */
  getRoute(id: number): void {
    this.routeService.getOneRoute(id).subscribe({
      next: (data) => {
        // Populate the form fields with the fetched data
        this.form.patchValue({
          origin: data.origin,
          destination: data.destination,
          stops: data.stops,
          transport: data.transports,
        });
      },
      error: (err) => {
        console.error('Error fetching route data:', err);
      },
    });
  }

  /**
   * Loads all available transport options for selection in the form.
   */
  loadTransports(): void {
    this.transportService.getAllTransport().subscribe(
      (transports: TransportI[]) => {
        this.transports = transports; // Store transport options
      },
      (err) => {
        console.error('Error loading transports', err);
      }
    );
  }

  /**
   * Handles the form submission for updating the route.
   */
  onSubmit(): void {
    const formValue: RouteI = this.form.value; // Get form values
    formValue.id = this.id; // Assign the route ID to the form data

    // Call the service to update the route
    this.routeService.updateRoute(this.id, formValue).subscribe(
      () => {
        // Navigate back to the route list upon success
        this.router.navigateByUrl('logistics/route/show');
      },
      (err) => {
        console.error('Error updating route:', err);
      }
    );
  }

  /**
   * Cancels the update operation and navigates back to the route list.
   */
  cancel(): void {
    this.router.navigateByUrl('/logistics/route/show');
  }

  // Getters for form controls to simplify access in the template
  get origin() {
    return this.form.get('origin');
  }
  get destination() {
    return this.form.get('destination');
  }
  get stops() {
    return this.form.get('stops');
  }
  get transport() {
    return this.form.get('transport');
  }
}

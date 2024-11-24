/**
 * Component: CreateRouteComponent
 * 
 * This component is responsible for creating a new route in the logistics module. 
 * It uses Reactive Forms to handle user input and communicates with backend services 
 * to fetch transport options and submit new route data.
 * 
 * Features:
 * - Form validation for required fields.
 * - Integration with transport services to populate dropdown options.
 * - Navigation handling for form submission and cancellation.
 * 
 * Dependencies:
 * - Angular Router
 * - Reactive Forms
 * - PrimeNG UI components
 */

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { RouteI } from '../../../../models/logistic';
import { RouteService } from '../../../../services/logistics/route.service';
import { TransportI } from '../../../../models/logistic';
import { TransportService } from '../../../../services/logistics/transport.service';

@Component({
  selector: 'app-create-route',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-route.component.html',
  styleUrl: './create-route.component.css'
})
export class CreateRouteComponent implements OnInit {

  // Form group for managing route input
  public form: FormGroup;   

  // List of transport options fetched from the backend
  transports: TransportI[] = [];       

  // Services for route and transport operations
  routeService = inject(RouteService);
  transportService = inject(TransportService);

  constructor(
    private formBuilder: FormBuilder, // Form builder for creating reactive forms
    private router: Router            // Router for navigation
  ) { 
    // Initialize the form with required fields and validators
    this.form = this.formBuilder.group({
      origin: ['', [Validators.required]],        // Field for the origin location
      destination: ['', [Validators.required]],   // Field for the destination location
      stops: ['', [Validators.required]],         // Field for the number of stops
      transport: ['', [Validators.required]],     // Dropdown for selecting a transport
    });
  }

  // Lifecycle hook to load transport data when the component initializes
  ngOnInit(): void {
    this.loadTransports();
  }

  /**
   * Fetches the available transport options from the backend
   */
  loadTransports(): void {
    this.transportService.getAllTransport().subscribe(
      (transports: TransportI[]) => {
        this.transports = transports; // Populate the dropdown with fetched data
      },
      err => {
        console.error('Error loading transports', err); // Log any error in fetching data
      }
    );
  }

  /**
   * Handles form submission to create a new route
   */
  onSubmit(): void {
    const formValue: RouteI = this.form.value; // Retrieve form values
    console.log(formValue); // Debug: log form data before submission

    this.routeService.createRoute(formValue).subscribe(
      () => {
        console.log('Route created successfully:', formValue); // Debug: log success
        this.router.navigateByUrl('logistics/route/show'); // Navigate to route list
      },
      err => {
        console.log('Error creating route:', err); // Log submission errors
      }
    );
  }

  /**
   * Handles cancellation and navigates back to the route listing page
   */
  cancel(): void {
    this.router.navigateByUrl('/logistics/route/show'); // Navigate to route list
  }

  // Getters for form controls to simplify template validation binding
  get origin() { return this.form.get('origin'); }
  get destination() { return this.form.get('destination'); }
  get stops() { return this.form.get('stops'); }
  get transport() { return this.form.get('transport'); }
}

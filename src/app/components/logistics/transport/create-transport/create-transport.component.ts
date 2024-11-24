import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TransportI } from '../../../../models/logistic';
import { TransportService } from '../../../../services/logistics/transport.service';

@Component({
  selector: 'app-create-transport', // The component selector to be used in templates.
  standalone: true, // Marks the component as standalone (does not need a specific module).
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule], // Required modules for the component.
  templateUrl: './create-transport.component.html', // HTML template associated with the component.
  styleUrl: './create-transport.component.css' // Styles associated with the component.
})
export class CreateTransportComponent implements OnInit {
  public form: FormGroup; // Defines the reactive form.
  transportService = inject(TransportService); // Injects the TransportService using Angular's injection API.

  constructor(
    private formBuilder: FormBuilder, // Injects FormBuilder to build reactive forms.
    private router: Router, // Injects Router to handle navigation in the app.
  ) {
    // Initializes the form with validation rules.
    this.form = this.formBuilder.group({
      transportation: ['', [Validators.required]], // A required field for selecting the transportation type.
      capacity: ['', [Validators.required]], // A required field for entering the capacity of the transport.
    });
  }

  ngOnInit(): void {
    // Lifecycle method that runs when the component is initialized.
    // Can be used for additional setup if needed.
  }

  /**
   * Handles the form submission.
   * Retrieves the form values and calls the service to create a new transport.
   */
  onSubmit(): void {
    const formValue: TransportI = this.form.value; // Gets the form values as a `TransportI` object.
    console.log(formValue); // Debug: Logs the form values to the console.
    this.transportService.createTransport(formValue).subscribe(
      () => {
        // Success: Navigates the user to the transport list after successful creation.
        this.router.navigateByUrl('logistics/transport/show');
      },
      err => {
        // Error: Logs the error to the console if the creation fails.
        console.log(err);
        console.log('It was not created correctly.');
      }
    );
  }

  /**
   * Cancels the action and redirects the user to the transport list.
   */
  cancel() {
    this.router.navigateByUrl('/logistics/transport/show'); // Redirects to the transport list.
  }

  /**
   * Getter for the `transportation` form control.
   * Provides a direct way to access the form control for validation or manipulation.
   */
  get transportation() { return this.form.get('transportation'); }

  /**
   * Getter for the `capacity` form control.
   * Provides a direct way to access the form control for validation or manipulation.
   */
  get capacity() { return this.form.get('capacity'); }

}

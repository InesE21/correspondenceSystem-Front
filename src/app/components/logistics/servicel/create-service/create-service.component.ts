// This component is responsible for creating a new service entity in the logistics module.
// It includes a reactive form to handle user input and validation, utilizes Angular and PrimeNG modules for UI components,
// and integrates with a service to perform API operations. Below is a detailed explanation of the code.

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ServicelI } from '../../../../models/logistic';
import { ServicelService } from '../../../../services/logistics/servicel.service';

@Component({
  selector: 'app-create-service', // Specifies the component's selector to use in templates.
  standalone: true, // Indicates this component is a standalone one, not part of an NgModule.
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule], // Imports required Angular and PrimeNG modules.
  templateUrl: './create-service.component.html', // HTML template for the component's view.
  styleUrl: './create-service.component.css' // CSS file for the component's styling.
})
export class CreateServiceComponent implements OnInit {
  // Reactive form group to manage form controls and validation state.
  public form: FormGroup;

  // Dependency injection for ServicelService to handle API operations.
  servicelService = inject(ServicelService);

  constructor(
    private formBuilder: FormBuilder, // Used to build and manage the reactive form.
    private router: Router, // Used for navigation between routes.
  ) { 
    // Initialize the form with 'transportation' and 'cost' fields and set validators.
    this.form = this.formBuilder.group({
      transportation: ['', [Validators.required]], // Required field for transportation details.
      cost: ['', [Validators.required]], // Required field for service cost.
    });
  }

  // Lifecycle hook that is called after Angular has initialized the component.
  ngOnInit(): void {
    // Currently, no initialization logic is needed.
  }

  // Handles the form submission to create a new service.
  onSubmit(): void {
    const formValue: ServicelI = this.form.value; // Extract the form values as a ServicelI object.
    console.log(formValue); // Log the form values for debugging purposes.
    
    // Call the create service API endpoint via ServicelService.
    this.servicelService.createServicel(formValue).subscribe(
      () => {
        // Log the successful creation of the service.
        console.log(formValue);

        // Navigate to the list of services upon successful creation.
        this.router.navigateByUrl('logistics/servicel/show');
      },
      err => {
        // Log any error that occurs during the service creation.
        console.error(err);
        console.log('It was not created correctly.');
      }
    );
  }

  // Cancels the operation and navigates back to the service list page.
  cancel() {
    this.router.navigateByUrl('/logistics/servicel/show');
  }

  // Getter for the 'transportation' form control.
  get transportation() { return this.form.get('transportation'); }

  // Getter for the 'cost' form control.
  get cost() { return this.form.get('cost'); }
}

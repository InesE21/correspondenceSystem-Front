import { Component, OnInit, inject } from '@angular/core';  // Import necessary modules for the component
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';  // Import MessageService to show messages or alerts
import { Router } from '@angular/router';  // Import Router for navigation between views
import { CardModule } from 'primeng/card';  // Import PrimeNG Card module for UI
import { ButtonModule } from 'primeng/button';  // Import PrimeNG Button module for UI
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';  // Import Reactive Forms modules for form handling
import { ToastModule } from 'primeng/toast';  // Import PrimeNG Toast module to show notifications
import { CustomerService } from '../../../../services/persons/customer.service';  // Import CustomerService to interact with the backend
import { CustomerI } from '../../../../models/person';  // Import CustomerI interface for type safety

@Component({
  selector: 'app-create-customer',  // Define the selector for this component
  standalone: true,  // Mark this component as standalone (it doesn’t belong to any module)
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],  // Import modules necessary for this component
  templateUrl: './create-customer.component.html',  // Link to the HTML template
  styleUrl: './create-customer.component.css'  // Link to the CSS file
})
export class CreateCustomerComponent implements OnInit {
  public form: FormGroup;  // Define a form group for form control

  // Define options for customer type dropdown
  public customerTypes = [
    { value: 'NORMAL', label: 'Normal' },
    { value: 'PREMIUM', label: 'Premium' }
  ];

  // Inject CustomerService to interact with the backend API
  customerService = inject(CustomerService);

  constructor(
    private formBuilder: FormBuilder,  // Inject FormBuilder to build the form group
    private router: Router,  // Inject Router to navigate between views
  ) {
    // Initialize the form with validators for each field
    this.form = this.formBuilder.group({
      dni: ['', [Validators.required]],  // DNI field (required)
      fullname: ['', [Validators.required]],  // Full Name field (required)
      address: ['', [Validators.required]],  // Address field (required)
      phoneNumber: ['', [Validators.required]],  // Phone number field (required)
      mail: ['', [Validators.required, Validators.email]],  // Email field (required and must be a valid email)
      customer_type: ['', [Validators.required]]  // Customer type dropdown (required)
    });
  }

  ngOnInit(): void {
    // Component initialization logic (empty for now)
  }

  // Handle form submission (create new customer)
  onSubmit(): void {
    const formValue: CustomerI = this.form.value;  // Get the form data
    console.log(formValue);  // Log the form value (for debugging purposes)

    // Call the service to create a new customer in the backend
    this.customerService.createCustomer(formValue).subscribe(
      () => {
        console.log(formValue);  // Log form value on successful creation
        // Navigate to the customer list page after successful creation
        this.router.navigateByUrl('persons/customer/show');
      },
      err => {
        // Handle errors if the creation fails
        console.log(err);
        console.log('It was not created correctly.');
      }
    );
  }

  // Handle the cancel action (navigate back to the customer list)
  cancel() {
    this.router.navigateByUrl('/persons/customer/show');
  }

  // Getter methods for easy access to form controls
  get dni() { return this.form.get('dni'); }
  get fullname() { return this.form.get('fullname'); }
  get address() { return this.form.get('address'); }
  get phoneNumber() { return this.form.get('phoneNumber'); }
  get mail() { return this.form.get('mail'); }
  get customer_type() { return this.form.get('customer_type'); }
}

import { Component, OnInit, inject } from '@angular/core';  // Import necessary modules for the component
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';  // Import router-related modules for navigation
import { CardModule } from 'primeng/card';  // Import PrimeNG Card module for UI
import { ButtonModule } from 'primeng/button';  // Import PrimeNG Button module for UI
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';  // Import Reactive Forms modules for form handling
import { CustomerService } from '../../../../services/persons/customer.service';  // Import CustomerService to interact with backend
import { CustomerI } from '../../../../models/person';  // Import CustomerI interface for type safety

@Component({
  selector: 'app-update-customer',  // Define the selector for this component
  standalone: true,  // Mark this component as standalone (it doesn’t belong to any module)
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],  // Import modules necessary for this component
  templateUrl: './update-customer.component.html',  // Link to the HTML template
  styleUrl: './update-customer.component.css'  // Link to the CSS file
})
export class UpdateCustomerComponent implements OnInit {
  public id: number = 0;  // Store the customer ID from the route
  public form: FormGroup;  // Form group to handle the form inputs
  public customerTypes = [  // Define options for customer type dropdown
    { value: 'NORMAL', label: 'Normal' },
    { value: 'PREMIUM', label: 'Premium' }
  ];
  
  // Inject CustomerService to interact with the backend API
  customerService = inject(CustomerService);

  constructor(
    private formBuilder: FormBuilder,  // Inject FormBuilder to build the form group
    private router: Router,  // Inject Router to navigate between views
    private route: ActivatedRoute,  // Inject ActivatedRoute to access route parameters
  ) {
    // Initialize the form with validators for each field
    this.form = this.formBuilder.group({
      id: [''],  // ID field to hold the customer's unique identifier
      dni: ['', [Validators.required]],  // DNI field (required)
      fullname: ['', [Validators.required]],  // Full Name field (required)
      address: ['', [Validators.required]],  // Address field (required)
      phoneNumber: ['', [Validators.required]],  // Phone number field (required)
      mail: ['', [Validators.required]],  // Email field (required)
      customer_type: ['', [Validators.required]],  // Customer type dropdown (required)
    });
  }

  ngOnInit(): void {
    // On component initialization, get the customer ID from route parameters
    this.id = this.route.snapshot.params['id'];
    // Fetch the customer data using the ID
    this.getCustomer(this.id);
  }

  // Fetch the customer data from the service using the customer ID
  getCustomer(id: number) {
    this.customerService.getOneCustomer(id)
      .subscribe({
        next: (data) => {
          // Populate the form with the customer data returned from the API
          this.form.setValue(data);
        },
        error: (err) => {
          // Handle errors if the request fails
          console.error(err);
        }
      });
  }

  // Handle form submission (update customer)
  onSubmit(): void {
    const formValue: CustomerI = this.form.value;  // Get the form data
    const id: number = this.form.value.id;  // Get the customer ID
    // Call the service to update the customer data in the backend
    this.customerService.updateCustomer(id, formValue).subscribe(
      () => {
        // Navigate to the customer list page after successful update
        this.router.navigateByUrl('persons/customer/show');
      },
      err => {
        // Handle errors if the update fails
        console.log(err);
        console.log('The update was unsuccessful.');
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

// This component is used to update an existing service in the logistics module.
// It retrieves the service data by ID, populates the form for editing, and allows submission of the updated details.
// The component uses Angular and PrimeNG modules for form handling, navigation, and UI enhancements.

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ServicelService } from '../../../../services/logistics/servicel.service';
import { ServicelI } from '../../../../models/logistic';

@Component({
  selector: 'app-update-service', // Selector for the Update Service component.
  standalone: true, // Indicates this is a standalone component.
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule], // Required modules for the component.
  templateUrl: './update-service.component.html', // Path to the component's HTML template.
  styleUrl: './update-service.component.css' // Path to the component's CSS file.
})
export class UpdateServiceComponent implements OnInit {
  public id: number = 0; // ID of the service being updated.
  public form: FormGroup; // Form group for handling user input and validation.

  // Injecting the ServicelService for API communication.
  servicelService = inject(ServicelService);

  constructor(
    private formBuilder: FormBuilder, // To create and manage the reactive form.
    private router: Router, // To navigate between routes.
    private route: ActivatedRoute, // To access route parameters.
  ) {
    // Initializing the form with fields and their validators.
    this.form = this.formBuilder.group({
      id: [''], // Hidden field for the service ID.
      transportation: ['', [Validators.required]], // Transportation field with validation.
      cost: ['', [Validators.required]], // Cost field with validation.
    });
  }

  ngOnInit(): void {
    // Retrieve the ID of the service from the route parameters.
    this.id = this.route.snapshot.params['id'];
    this.getServicel(this.id); // Fetch the service data by ID.
  }

  // Fetches the service data by its ID and populates the form fields.
  getServicel(id: number): void {
    this.servicelService.getOneServicel(id).subscribe({
      next: (data) => {
        this.form.setValue(data); // Populate the form with the fetched data.
      },
      error: (err) => {
        console.error('Failed to fetch service details:', err);
      },
    });
  }

  // Submits the updated service data to the API.
  onSubmit(): void {
    const formValue: ServicelI = this.form.value; // Extract the form values.
    const id: number = this.form.value.id; // Get the service ID.

    this.servicelService.updateServicel(id, formValue).subscribe(
      () => {
        // Navigate back to the service list upon successful update.
        this.router.navigateByUrl('logistics/servicel/show');
      },
      (err) => {
        console.error('Failed to update the service:', err);
      }
    );
  }

  // Cancels the operation and navigates back to the service list page.
  cancel(): void {
    this.router.navigateByUrl('/logistics/servicel/show');
  }

  // Getter for the 'transportation' form control.
  get transportation() {
    return this.form.get('transportation');
  }

  // Getter for the 'cost' form control.
  get cost() {
    return this.form.get('cost');
  }
}

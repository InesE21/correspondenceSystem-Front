import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TransportI } from '../../../../models/logistic';
import { TransportService } from '../../../../services/logistics/transport.service';

@Component({
  selector: 'app-update-transport',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './update-transport.component.html',
  styleUrl: './update-transport.component.css'
})
export class UpdateTransportComponent implements OnInit {
  public id: number = 0;  // Transport ID to be updated
  public form: FormGroup;  // Form group to manage form controls
  
  transportService = inject(TransportService);  // Inject TransportService for CRUD operations

  constructor(
    private formBuilder: FormBuilder, // Used to create form group and form controls
    private router: Router, // Router to navigate after form submission
    private route: ActivatedRoute, // ActivatedRoute to retrieve route parameters
  ) { 
    // Initialize form group with controls and validators
    this.form = this.formBuilder.group({
      id: [''],
      transportation: ['', [Validators.required]],  // Transportation field with required validation
      capacity: ['', [Validators.required]],  // Capacity field with required validation
    });
  }

  ngOnInit(): void {
    // Retrieve the transport ID from the route parameters
    this.id = this.route.snapshot.params['id'];  
    // Fetch transport details using the ID
    this.getTransport(this.id);
  }

  // Function to fetch transport data by ID
  getTransport(id: number): void {
    this.transportService.getOneTransport(id)
      .subscribe({
        next: (data) => {
          // Set the form values with the fetched transport data
          this.form.setValue(data);
        }
      });
  }

  // Function to handle form submission
  onSubmit(): void {
    const formValue: TransportI = this.form.value; // Get the form data
    const id: number = this.form.value.id; // Get the ID of the transport being updated
    // Call the updateTransport service method to update transport details
    this.transportService.updateTransport(id, formValue).subscribe(
      () => {
        // Redirect to the transport list page after successful update
        this.router.navigateByUrl('logistics/transport/show');
      },
      err => {
        console.error('Error updating transport:', err);
      }
    );
  }

  // Function to navigate to the transport list page without making changes
  cancel(): void {
    this.router.navigateByUrl('/logistics/transport/show');
  }

  // Getter methods for form controls
  get transportation() { return this.form.get('transportation'); }
  get capacity() { return this.form.get('capacity'); }
}

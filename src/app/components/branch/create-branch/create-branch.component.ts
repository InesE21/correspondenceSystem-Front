/**
 * This component is responsible for handling the creation of a new branch in the system.
 * It includes a form for inputting branch details (e.g., name and location) and 
 * uses reactive form validation to ensure the input is valid before submission.
 * 
 * Users can:
 * - Input the branch name and location.
 * - Submit the form to create a branch.
 * - Cancel the operation to return to the branch list view.
 * 
 * Developers can:
 * - Extend this component by adding additional form fields or business logic.
 * - Modify the interaction with the BranchService if back-end changes occur.
 */

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BranchService } from '../../../services/branches/branch.service'
import { BranchI } from '../../../models/branch';

@Component({
  selector: 'app-create-branch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],// Required Angular modules and PrimeNG components.
  templateUrl: './create-branch.component.html',
  styleUrl: './create-branch.component.css'
})
export class CreateBranchComponent implements OnInit{
  /**
   * Reactive FormGroup to handle the input and validation of the form fields.
   * Contains:
   * - `nameB`: The name of the branch (required).
   * - `location`: The location of the branch (required).
   */
  public form: FormGroup;
  branchService = inject(BranchService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) 
  { 
    // Initialize the form with default values and validation rules.
    this.form=this.formBuilder.group({
    nameB: ['', [Validators.required]],
    location: ['', [Validators.required]],

  });
  }

  ngOnInit(): void {}

  /**
   * Handles form submission.
   * This method:
   * 1. Retrieves the form values as an object of type `BranchI`.
   * 2. Sends the data to the back-end service using the `createBranch` method.
   * 3. Navigates to the branch list view upon success.
   * 4. Logs an error message to the console if the operation fails.
   */

  onSubmit(): void {
    const formValue: BranchI = this.form.value;
    console.log(formValue);

    // Call the service to create a new branch.
    this.branchService.createBranch(formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');

    //     setTimeout(()=>{                  
    //       this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Creado', life:5000});

    //  }, 0);
    console.log(formValue)
        this.router.navigateByUrl('branch/show');

      },
      err => {

        console.log(err);
        console.log('It was not created correctly.');
      }
    );
  }

  /**
   * Cancels the branch creation process.
   * Navigates the user back to the branch list view without saving any changes.
   */
  cancel() {
    this.router.navigateByUrl('/branch/show');
  }

  /**
   * Getter for the `nameB` form control.
   * Used for easier access to the branch name field and its validation state in the template.
   */
  get nameB() { return this.form.get('nameB'); }

  /**
   * Getter for the `location` form control.
   * Used for easier access to the location field and its validation state in the template.
   */
  get location() { return this.form.get('location'); }
  
}

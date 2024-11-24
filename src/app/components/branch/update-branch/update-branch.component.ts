import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BranchService } from '../../../services/branches/branch.service'
import { BranchI } from '../../../models/branch';
/**
 * UpdateBranchComponent
 * 
 * This component is responsible for managing the update of branch information in the application.
 * It allows users to:
 * - Fetch the details of a specific branch using its ID.
 * - Display the branch information in a pre-filled form.
 * - Edit the branch details and validate input fields before submission.
 * - Submit the updated branch data to the backend server.
 * - Cancel the update operation and return to the branch list without making changes.
 */

@Component({
  selector: 'app-update-branch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-branch.component.html',
  styleUrl: './update-branch.component.css'
})
export class UpdateBranchComponent implements OnInit{
   /**
   * Stores the ID of the branch being updated, retrieved from the route parameters.
   */
  public id: number =0;
  /**
   * Represents the reactive form used to handle branch updates.
   */
  public form: FormGroup;
  /**
   * Instance of `BranchService` to manage API interactions for branches.
   */
  branchService = inject(BranchService);
   /**
   * Constructor to inject necessary dependencies and initialize the reactive form.
   *
   *  formBuilder - Utility to build and configure the reactive form.
   *  router - Angular Router for navigation between views.
   *  route - ActivatedRoute to access route parameters (branch ID).
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) 
  // Define the structure of the reactive form and set validation rules.
  {
    this.form=this.formBuilder.group({
     id: [''],
     nameB: ['', [Validators.required]],
     location: ['', [Validators.required]],
 
   });
  }
   /**
   * Lifecycle hook executed when the component is initialized.
   * Retrieves the branch ID from the route and fetches the corresponding branch data.
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // let idCliente = this.route.snapshot.paramMap.get("id");
    this.getBranch(this.id);

  }
/**
   * Fetches branch data from the backend by its ID and populates the form with the data.
   *
   * @ id - The ID of the branch to be fetched.
   */
  getBranch(id: number){
    this.branchService.getOneBranch(id)
    .subscribe({
      next: (data) => {
        this.form.setValue(data)
        // console.log(data.cliente)
      }
    })
  }

 /**
   * Handles the form submission to update branch data.
   * Sends the updated information to the backend and navigates back to the branch list upon success.
   */

  onSubmit(): void {
    const formValue: BranchI = this.form.value;
    const id: number =  this.form.value.id
    this.branchService.updateBranch(id, formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');
    //     setTimeout(()=>{                  
    //       this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Actualizado', life:5000});

    //  }, 0);
        this.router.navigateByUrl('branch/show');

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  /**
   * Cancels the update operation and redirects the user to the branch list view.
   */
  cancel() {
    this.router.navigateByUrl('/branch/show');
  }

   /**
   * Getter for the `nameB` form control.
   * Provides direct access to the form field for validation or other operations.
   */
  get nameB() { return this.form.get('nameB'); }

  /**
   * Getter for the `location` form control.
   * Provides direct access to the form field for validation or other operations.
   */
  get location() { return this.form.get('location'); }

}

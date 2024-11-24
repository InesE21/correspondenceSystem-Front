import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../services/persons/employee.service';
import { EmployeeI } from '../../../../models/person';
import { BranchI } from '../../../../models/branch';
import { RouteI } from '../../../../models/logistic';
import { BranchService } from '../../../../services/branches/branch.service';
import { RouteService } from '../../../../services/logistics/route.service';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {
  
  // ID of the employee to be updated (from the URL)
  public id: number = 0;

  // FormGroup to handle the employee update form
  public form: FormGroup;

  // List of branches for the employee to be assigned
  branches: BranchI[] = [];   

  // List of routes, only relevant for the 'Distributor' position
  routes: RouteI[] = [];       

  // Inject services for employee, branch, and route data
  employeeService = inject(EmployeeService);
  branchService = inject(BranchService); // Service for branches
  routeService = inject(RouteService);   // Service for routes

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,  
  ) { 
    // Initialize form with required fields and validations
    this.form = this.formBuilder.group({
      fullname: ['', [Validators.required]], // Employee's full name
      position: ['', [Validators.required]], // Position of the employee
      branch: ['', [Validators.required]], // Branch where the employee works
      assignedRoute: [null], // Assigned route (for DISTRIBUTOR position only)
    });
  }

  ngOnInit(): void {
    // Get the employee ID from the route parameters
    this.id = this.route.snapshot.params['id'];

    // Fetch the employee data for the specified ID
    this.getEmployee(this.id);

    // Load the branches for the dropdown selection
    this.loadBranches();
  }

  // Fetch the employee data from the backend
  getEmployee(id: number) {
    this.employeeService.getOneEmployee(id).subscribe({
      next: (data) => {
        // Update the form with the fetched employee data
        // `patchValue` allows updating only the necessary fields of the form
        this.form.patchValue({
          fullname: data.fullname,
          position: data.position,
          branch: data.branch,
          assignedRoute: data.assignedRoute || null, // If no route, set as null
        });
      },
      error: (err) => {
        // Handle errors in fetching employee data
        console.error('Error fetching employee data:', err);
      }
    });
  }

  // Load all branches for the branch selection dropdown
  loadBranches(): void {
    this.branchService.getAllBranch().subscribe(
      (branches: BranchI[]) => {
        this.branches = branches; // Assign the fetched branches to the array
      },
      err => {
        // Handle errors in loading branch data
        console.error('Error loading branches', err);
      }
    );
  }

  // Handle changes in the selected position
  onPositionChange(position: string) {
    // If the position is not 'DISTRIBUTOR', clear the assigned route field
    if (position !== 'DISTRIBUTOR') {
      this.form.get('assignedRoute')?.setValue(null); // Clears the route
    }
  }

  // Handle form submission to update the employee
  onSubmit(): void {
    // Get the current form values
    const formValue: EmployeeI = this.form.value;

    // Attach the employee ID to the form data (no need to extract it from the form)
    formValue.id = this.id;

    // Call the service to update the employee's data
    this.employeeService.updateEmployee(this.id, formValue).subscribe(
      () => {
        // Redirect to the employee list page upon successful update
        this.router.navigateByUrl('persons/employee/show');
      },
      (err) => {
        // Handle errors in the update process
        console.log(err);
        console.log('Employee update failed');
      }
    );
  }

  // Handle cancellation of the update and redirect to the employee list
  cancel() {
    this.router.navigateByUrl('/persons/employee/show');
  }

  // Getters for form controls for easier access in the template
  get fullname() { return this.form.get('fullname'); }
  get position() { return this.form.get('position'); }
  get branch() { return this.form.get('branch'); }
  get assignedRoute() { return this.form.get('assignedRoute'); }
}

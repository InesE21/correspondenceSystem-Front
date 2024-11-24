import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { IncidentService } from '../../../../services/shipments/incident.service';
import { ShippingService } from '../../../../services/shipments/shipping.service';
import { CorrespondenceService } from '../../../../services/shipments/correspondence.service';
import { CorrespondenceI, ShippingI } from '../../../../models/shipment';
import { BranchI } from '../../../../models/branch';
import { EmployeeI } from '../../../../models/person';
import { BranchService } from '../../../../services/branches/branch.service';
import { EmployeeService } from '../../../../services/persons/employee.service';

@Component({
  selector: 'app-create-shipping',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-shipping.component.html',
  styleUrl: './create-shipping.component.css'
})
export class CreateShippingComponent implements OnInit{
  public form: FormGroup;
  correspondences: CorrespondenceI[] = [];
  branches: BranchI[] = [];
  employees: EmployeeI[] = [];
  
  shippingService = inject(ShippingService);
  correspondenceService = inject(CorrespondenceService);
  branchService = inject(BranchService);
  employeeService = inject(EmployeeService);
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) 
  { 
    this.form=this.formBuilder.group({
    status: ['', [Validators.required]],
    dateTime: ['', [Validators.required]],
    correspondence: ['', [Validators.required]],
    branch: ['', [Validators.required]],
    employee: ['', [Validators.required]],
  });
  }

  ngOnInit(): void {
    this.loadCorrespondences();
    this.loadBranches();
    this.loadEmployees();
  }

  loadCorrespondences(): void {
    this.correspondenceService.getAllCorrespondence().subscribe(
      (correspondences: CorrespondenceI[]) => {
        this.correspondences = correspondences; 
      },
      err => {
        console.error('Error loading correspondences', err);
      }
    );
  }

  loadBranches(): void {
    this.branchService.getAllBranch().subscribe(
      (branches: BranchI[]) => {
        this.branches = branches; 
      },
      err => {
        console.error('Error loading branches', err);
      }
    );
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployee().subscribe(
      (employees: EmployeeI[]) => {
        this.employees = employees; 
      },
      err => {
        console.error('Error loading employees', err);
      }
    );
  }

  onSubmit(): void {
    const formValue: ShippingI = this.form.value;
    console.log(formValue);
    this.shippingService.createShipping(formValue).subscribe(
      () => {
        console.log(formValue)
        this.router.navigateByUrl('shipments/shipping/show');
      },
      err => {

        console.log(err);
        console.log('It was not created correctly.');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/shipments/shipping/show');
  }

  get status() { return this.form.get('status'); }
  get dateTime() { return this.form.get('dateTime'); }
  get correspondence() { return this.form.get('correspondence'); }
  get branch() { return this.form.get('branch'); }
  get employee() { return this.form.get('employee'); }

}
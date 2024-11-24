import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { EmployeeService } from '../../../../services/persons/employee.service';
import { EmployeeI } from '../../../../models/person';
import { BranchI } from '../../../../models/branch';
import { RouteI } from '../../../../models/logistic';
import { BranchService } from '../../../../services/branches/branch.service';
import { RouteService } from '../../../../services/logistics/route.service';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit{
  public form: FormGroup;
  branches: BranchI[] = [];   // Lista de sucursales
  routes: RouteI[] = [];       // Lista de rutas

  employeeService = inject(EmployeeService);
  branchService = inject(BranchService); // Inyecta el servicio de sucursales
  routeService = inject(RouteService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) 
  { 
    this.form=this.formBuilder.group({
    fullname: ['', [Validators.required]],
    position: ['', [Validators.required]],
    branch: ['', [Validators.required]],
    assignedRoute: [null], 
  });
  }

  ngOnInit(): void {
    this.loadBranches();
    
  }

  loadBranches(): void {
    this.branchService.getAllBranch().subscribe(
      (branches: BranchI[]) => {
        this.branches = branches; // Asigna las sucursales obtenidas
      },
      err => {
        console.error('Error loading branches', err);
      }
    );
  }

  

  onPositionChange(position: string) {
    if (position !== 'DISTRIBUTOR') {
      this.form.get('assignedRoute')?.setValue(null); // Limpia el valor si no es distribuidor
    }
  }

  onSubmit(): void {
    const formValue: EmployeeI = this.form.value;
    console.log(formValue);
    this.employeeService.createEmployee(formValue).subscribe(
      () => {
        console.log(formValue)
        this.router.navigateByUrl('persons/employee/show');
      },
      err => {

        console.log(err);
        console.log('It was not created correctly.');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/persons/employee/show');
  }

  get fullname() { return this.form.get('fullname'); }
  get position() { return this.form.get('position'); }
  get branch() { return this.form.get('branch'); }
  get assignedRoute() { return this.form.get('assignedRoute'); }

}
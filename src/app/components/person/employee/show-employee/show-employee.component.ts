import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EmployeeI } from '../../../../models/person';
import { EmployeeService } from '../../../../services/persons/employee.service';

@Component({
  selector: 'app-show-employee', // Component selector
  standalone: true, // Marks the component as standalone without requiring a module
  imports: [RouterModule, TableModule, ButtonModule, CardModule], // Necessary modules imported for routing, table, button, and card styling
  templateUrl: './show-employee.component.html', // Path to the component's template file
  styleUrl: './show-employee.component.css' // Path to the component's stylesheet
})
export class ShowEmployeeComponent implements OnInit {
  public employees: EmployeeI[] = []; // Declare an array to store the list of employees

  // Inject services into the constructor
  constructor(
    private employeeService: EmployeeService, // Service to interact with the employee data
    private router: Router // Service for navigation
  ) { }

  // Lifecycle hook: OnInit, called after the component has initialized
  ngOnInit(): void {
    this.showEmployees(); // Call method to fetch employee data when the component is loaded
  }

  // Method to fetch all employees
  showEmployees() {
    this.employeeService.getAllEmployee() // Call the service method to get all employees
      .subscribe({
        next: (data) => { // Handle the response if the request is successful
          this.employees = data; // Store the fetched employee data in the 'employees' array
        }
      });
  }

  // Method to delete an employee by ID
  delete(id: number): void {
    // Navigate to the employee list page (before actually deleting)
    this.router.navigateByUrl('/persons/employee/');
    
    // Call the service method to delete the employee
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        this.showEmployees(); // Refresh the employee list after deletion
      },
      err => {
        console.log('Error occurred while deleting'); // Handle error if deletion fails
        // Navigate to the employee list page in case of error
        this.router.navigateByUrl('/persons/employee/');
      }
    );
  }

}

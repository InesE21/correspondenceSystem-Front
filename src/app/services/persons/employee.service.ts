import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeI } from '../../models/person';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/persons/employee/`  // Base API endpoint for employees

  constructor(
    private http: HttpClient  // Injecting the HttpClient service for making HTTP requests
  ) { }

  // Fetch all employees
  getAllEmployee(): Observable<EmployeeI[]> {
    return this.http
      .get<{ employees: EmployeeI[] }>(this.base_path)  // Making GET request to fetch all employees
      .pipe(
        map(response => response.employees)  // Extracting the 'employees' array from the response
      );
  }

  // Fetch a single employee by ID
  getOneEmployee(id: number): Observable<EmployeeI> {
    return this.http
      .get<{ employee: EmployeeI }>(`${this.base_path}${id}`)  // Making GET request to fetch one employee by ID
      .pipe(
        map(response => response.employee)  // Extracting the 'employee' object from the response
      );
  }

  // Create a new employee
  createEmployee(data: any): Observable<EmployeeI> {
    return this.http.post<{ employee: EmployeeI }>(this.base_path, data)  // Making POST request to create a new employee
      .pipe(
        map(response => response.employee)  // Extracting the created employee from the response
      );
  }

  // Update an existing employee
  updateEmployee(id: number, data: any): Observable<EmployeeI> {
    return this.http.put<{ employee: EmployeeI }>(`${this.base_path}${id}`, data)  // Making PUT request to update the employee by ID
      .pipe(
        map(response => response.employee)  // Extracting the updated employee from the response
      );
  }

  // Delete an employee by ID
  deleteEmployee(id: number): Observable<EmployeeI> {
    return this.http.delete<EmployeeI>(`${this.base_path}${id}`);  // Making DELETE request to remove the employee by ID
  }
}

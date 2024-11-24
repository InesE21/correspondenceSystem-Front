// This service manages CRUD operations for customer-related data within the application.
// It interacts with a Django-based backend API using Angular's HttpClient.
// The service includes methods for retrieving, creating, updating, and deleting customers.

import { Injectable } from '@angular/core'; // Angular decorator for dependency injection
import { HttpClient } from '@angular/common/http'; // Angular module for making HTTP requests
import { Observable } from 'rxjs'; // RxJS library for asynchronous streams
import { map } from 'rxjs/operators'; // Operator for data transformation
import { CustomerI } from '../../models/person'; // Interface defining the structure of customer data

@Injectable({
  providedIn: 'root' // Makes this service globally available in the application
})
export class CustomerService {
  // Base URL for the Django backend API
  api_uri_django = 'http://localhost:8000';
  // Endpoint for customer-related operations
  base_path = `${this.api_uri_django}/persons/customer/`;

  constructor(
    private http: HttpClient // Injecting HttpClient for HTTP operations
  ) {}

  /**
   * Fetches all customers from the backend API.
   * @returns An Observable emitting an array of CustomerI objects.
   */
  getAllCustomer(): Observable<CustomerI[]> {
    return this.http
      .get<{ customers: CustomerI[] }>(this.base_path) // GET request to retrieve all customers
      .pipe(
        map(response => response.customers) // Extracts the `customers` array from the response object
      );
  }

  /**
   * Fetches a specific customer by ID.
   * @param id The ID of the customer to retrieve.
   * @returns An Observable emitting a CustomerI object.
   */
  getOneCustomer(id: number): Observable<CustomerI> {
    return this.http
      .get<{ customer: CustomerI }>(`${this.base_path}${id}`) // GET request for a specific customer
      .pipe(
        map(response => response.customer) // Extracts the `customer` object from the response
      );
  }

  /**
   * Creates a new customer.
   * @param data The data for the new customer.
   * @returns An Observable emitting the created CustomerI object.
   */
  createCustomer(data: any): Observable<CustomerI> {
    return this.http.post<{ customer: CustomerI }>(this.base_path, data) // POST request to create a new customer
      .pipe(
        map(response => response.customer) // Extracts the `customer` object from the response
      );
  }

  /**
   * Updates an existing customer by ID.
   * @param id The ID of the customer to update.
   * @param data The updated data for the customer.
   * @returns An Observable emitting the updated CustomerI object.
   */
  updateCustomer(id: number, data: any): Observable<CustomerI> {
    return this.http.put<{ customer: CustomerI }>(`${this.base_path}${id}`, data) // PUT request to update a customer
      .pipe(
        map(response => response.customer) // Extracts the `customer` object from the response
      );
  }

  /**
   * Deletes a customer by ID.
   * @param id The ID of the customer to delete.
   * @returns An Observable emitting the deleted CustomerI object.
   */
  deleteCustomer(id: number): Observable<CustomerI> {
    return this.http.delete<CustomerI>(`${this.base_path}${id}`); // DELETE request to remove a customer
  }
}

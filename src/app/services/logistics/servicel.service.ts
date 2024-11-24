// This service manages CRUD operations for services within the logistics module of the application.
// It communicates with a Django-based backend API using Angular's HttpClient.
// The service allows fetching, creating, updating, and deleting service data through defined methods.

import { HttpClient } from '@angular/common/http'; // Angular module for making HTTP requests
import { Injectable } from '@angular/core'; // Angular decorator to make this service available for dependency injection
import { ServicelI } from '../../models/logistic'; // Interface defining the structure of service data
import { Observable } from 'rxjs'; // RxJS library for handling asynchronous streams

@Injectable({
  providedIn: 'root' // This service is globally available within the application
})
export class ServicelService {
  // Base URL for the Django backend API
  api_uri_django = 'http://localhost:8000';
  // Endpoint specific to service-related operations
  base_path = `${this.api_uri_django}/logistics/service/`;

  constructor(
    private http: HttpClient // Injecting HttpClient for performing HTTP operations
  ) {}

  /**
   * Fetches all services from the backend API.
   * @returns An Observable emitting an array of ServicelI objects.
   */
  getAllServicel(): Observable<ServicelI[]> {
    return this.http
      .get<ServicelI[]>(this.base_path); // GET request to fetch all services
  }

  /**
   * Fetches details of a specific service by ID.
   * @param id The ID of the service to retrieve.
   * @returns An Observable emitting a ServicelI object.
   */
  getOneServicel(id: number): Observable<ServicelI> {
    return this.http
      .get<ServicelI>(`${this.base_path}${id}`); // GET request for a specific service
  }

  /**
   * Creates a new service.
   * @param data The data for the new service.
   * @returns An Observable emitting the created ServicelI object.
   */
  createServicel(data: any): Observable<ServicelI> {
    return this.http.post<ServicelI>(this.base_path, data); // POST request to create a new service
  }

  /**
   * Updates an existing service by ID.
   * @param id The ID of the service to update.
   * @param data The updated data for the service.
   * @returns An Observable emitting the updated ServicelI object.
   */
  updateServicel(id: number, data: any): Observable<ServicelI> {
    return this.http.put<ServicelI>(`${this.base_path}${id}/`, data); // PUT request to update a service
  }

  /**
   * Deletes a service by ID.
   * @param id The ID of the service to delete.
   * @returns An Observable emitting the deleted ServicelI object.
   */
  deleteServicel(id: number): Observable<ServicelI> {
    return this.http.delete<ServicelI>(`${this.base_path}${id}`); // DELETE request to remove a service
  }
}

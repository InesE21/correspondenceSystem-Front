// This service manages CRUD operations for transports in the logistics module of the application.
// It uses Angular's HttpClient to communicate with a Django-based backend API.
// The service supports retrieving, creating, updating, and deleting transport records.

import { HttpClient } from '@angular/common/http'; // Angular module for making HTTP requests
import { Injectable } from '@angular/core'; // Angular decorator for dependency injection
import { Observable } from 'rxjs'; // RxJS library for handling asynchronous streams
import { TransportI } from '../../models/logistic'; // Interface defining the structure of transport data

@Injectable({
  providedIn: 'root' // Marks the service as globally available in the application
})
export class TransportService {
  // Base URL for the Django backend API
  api_uri_django = 'http://localhost:8000';
  // Endpoint for transport-related operations
  base_path = `${this.api_uri_django}/logistics/transport/`;

  constructor(
    private http: HttpClient // Injects HttpClient for HTTP operations
  ) {}

  /**
   * Fetches all transports from the backend API.
   * @returns An Observable emitting an array of TransportI objects.
   */
  getAllTransport(): Observable<TransportI[]> {
    return this.http
      .get<TransportI[]>(this.base_path); // GET request to retrieve all transports
  }

  /**
   * Fetches a specific transport by ID.
   * @param id The ID of the transport to retrieve.
   * @returns An Observable emitting a TransportI object.
   */
  getOneTransport(id: number): Observable<TransportI> {
    return this.http
      .get<TransportI>(`${this.base_path}${id}`); // GET request for a specific transport
  }

  /**
   * Creates a new transport.
   * @param data The data for the new transport.
   * @returns An Observable emitting the created TransportI object.
   */
  createTransport(data: any): Observable<TransportI> {
    return this.http.post<TransportI>(this.base_path, data); // POST request to create a transport
  }

  /**
   * Updates an existing transport by ID.
   * @param id The ID of the transport to update.
   * @param data The updated data for the transport.
   * @returns An Observable emitting the updated TransportI object.
   */
  updateTransport(id: number, data: any): Observable<TransportI> {
    return this.http.put<TransportI>(`${this.base_path}${id}/`, data); // PUT request to update a transport
  }

  /**
   * Deletes a transport by ID.
   * @param id The ID of the transport to delete.
   * @returns An Observable emitting the deleted TransportI object.
   */
  deleteTransport(id: number): Observable<TransportI> {
    return this.http.delete<TransportI>(`${this.base_path}${id}`); // DELETE request to remove a transport
  }
}

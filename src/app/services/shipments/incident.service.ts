// This service manages CRUD operations for incidents related to shipments in the application.
// It interacts with a Django-based backend API using Angular's HttpClient.
// The service provides methods to retrieve, create, update, and delete incident records.

import { Injectable } from '@angular/core'; // Angular decorator for dependency injection
import { HttpClient } from '@angular/common/http'; // Angular module for HTTP requests
import { Observable } from 'rxjs'; // RxJS library for handling asynchronous streams
import { IncidentI } from '../../models/shipment'; // Interface defining the structure of incident data

@Injectable({
  providedIn: 'root' // Marks this service as globally available in the application
})
export class IncidentService {
  // Base URL for the Django backend API
  api_uri_django = 'http://localhost:8000';
  // Endpoint for incident-related operations
  base_path = `${this.api_uri_django}/shipments/incident/`;

  constructor(
    private http: HttpClient // Injects HttpClient for making HTTP requests
  ) {}

  /**
   * Fetches all incidents from the backend API.
   */
  getAllIncident(): Observable<IncidentI[]> {
    return this.http
      .get<IncidentI[]>(this.base_path); // GET request to retrieve all incidents
  }

  /**
   * Fetches details of a specific incident by ID.
   */
  getOneIncident(id: number): Observable<IncidentI> {
    return this.http
      .get<IncidentI>(`${this.base_path}${id}`); // GET request for a specific incident
  }

  /**
   * Creates a new incident.
   */
  createIncident(data: any): Observable<IncidentI> {
    return this.http.post<IncidentI>(this.base_path, data); // POST request to create a new incident
  }

  /**
   * Updates an existing incident by ID.
   */
  updateIncident(id: number, data: any): Observable<IncidentI> {
    return this.http.put<IncidentI>(`${this.base_path}${id}`, data); // PUT request to update an incident
  }

  /**
   * Deletes an incident by ID.
   */
  deleteIncident(id: number): Observable<IncidentI> {
    return this.http.delete<IncidentI>(`${this.base_path}${id}`); // DELETE request to remove an incident
  }
}

// This service manages CRUD operations for routes and retrieves transports related to logistics in the application.
// It uses Angular's HttpClient to interact with a Django-based backend API.
// The service facilitates fetching, creating, updating, and deleting route data and provides a method for retrieving transport information.

import { HttpClient } from '@angular/common/http'; // Angular module for HTTP requests
import { Injectable } from '@angular/core'; // Angular decorator to mark the class for dependency injection
import { RouteI, TransportI } from '../../models/logistic'; // Interfaces defining the structure of Route and Transport data
import { Observable } from 'rxjs'; // RxJS library for handling asynchronous streams

@Injectable({
  providedIn: 'root' // Marks the service as available application-wide
})
export class RouteService {
  // Base URL for the Django backend API
  api_uri_django = 'http://localhost:8000';
  // Specific endpoint for route-related operations
  base_path = `${this.api_uri_django}/logistics/route/`;

  constructor(
    private http: HttpClient // HttpClient is injected for making HTTP requests
  ) {}

  /**
   * Fetches all routes from the backend API.
   * @returns An Observable emitting an array of RouteI objects.
   */
  getAllRoute(): Observable<RouteI[]> {
    return this.http
      .get<RouteI[]>(this.base_path); // GET request to fetch all routes
  }

  /**
   * Fetches details of a specific route by ID.
   * @param id The ID of the route to retrieve.
   * @returns An Observable emitting a RouteI object.
   */
  getOneRoute(id: number): Observable<RouteI> {
    return this.http
      .get<RouteI>(`${this.base_path}${id}`); // GET request for a specific route
  }

  /**
   * Creates a new route.
   * @param data The data for the new route.
   * @returns An Observable emitting the created RouteI object.
   */
  createRoute(data: any): Observable<RouteI> {
    return this.http.post<RouteI>(this.base_path, data); // POST request to create a new route
  }

  /**
   * Updates an existing route by ID.
   * @param id The ID of the route to update.
   * @param data The updated data for the route.
   * @returns An Observable emitting the updated RouteI object.
   */
  updateRoute(id: number, data: any): Observable<RouteI> {
    return this.http.put<RouteI>(`${this.base_path}${id}/`, data); // PUT request to update a route
  }

  /**
   * Deletes a route by ID.
   * @param id The ID of the route to delete.
   * @returns An Observable emitting the deleted RouteI object.
   */
  deleteRoute(id: number): Observable<RouteI> {
    return this.http.delete<RouteI>(`${this.base_path}${id}`); // DELETE request to remove a route
  }

  /**
   * Fetches a list of available transports from the backend.
   * @returns An Observable emitting an array of TransportI objects.
   */
  getTransports(): Observable<TransportI[]> {
    return this.http.get<TransportI[]>('http://127.0.0.1:8000/logistics/transport/'); // GET request to fetch transports
  }
}

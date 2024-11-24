// This service provides CRUD operations for managing branches in an application.
// It uses Angular's HttpClient to communicate with a Django-based backend API.
// The service interacts with endpoints related to branch management, returning Observables
// for asynchronous data handling, which is standard in Angular projects.

import { Injectable } from '@angular/core'; // Angular decorator to mark this class as injectable in dependency injection
import { HttpClient } from '@angular/common/http'; // Angular module for HTTP requests
import { Observable } from 'rxjs'; // Reactive programming library for handling asynchronous streams
import { BranchI } from '../../models/branch'; // Interface for branch data structure
import { map } from 'rxjs/operators'; // RxJS operator to transform data streams

@Injectable({
  providedIn: 'root' // This service is available application-wide without further configuration
})
export class BranchService {
  // Base URL for the API, pointing to the Django backend
  api_uri_django = 'http://localhost:8000';
  // Path specific to branch-related endpoints
  base_path = `${this.api_uri_django}/branches/`;

  constructor(
    private http: HttpClient // HttpClient is injected here for making HTTP requests
  ) {}

  /**
   * Fetches all branches from the API.
   * @returns An Observable emitting an array of BranchI objects.
   */
  getAllBranch(): Observable<BranchI[]> {
    return this.http
      .get<{ branches: BranchI[] }>(this.base_path) // GET request to the branches endpoint
      .pipe(
        map(response => response.branches) // Extracts the 'branches' array from the response
      );
  }

  /**
   * Fetches a single branch by its ID.
   * @param id The ID of the branch to retrieve.
   * @returns An Observable emitting the BranchI object for the requested branch.
   */
  getOneBranch(id: number): Observable<BranchI> {
    return this.http
      .get<{ branch: BranchI }>(`${this.base_path}${id}`) // GET request for a specific branch
      .pipe(
        map(response => response.branch) // Extracts the 'branch' object from the response
      );
  }

  /**
   * Creates a new branch.
   * @param data The data for the new branch.
   * @returns An Observable emitting the created BranchI object.
   */
  createBranch(data: any): Observable<BranchI> {
    return this.http.post<{ branch: BranchI }>(this.base_path, data) // POST request to create a new branch
      .pipe(
        map(response => response.branch) // Extracts the 'branch' object from the response
      );
  }

  /**
   * Updates an existing branch by its ID.
   * @param id The ID of the branch to update.
   * @param data The updated data for the branch.
   * @returns An Observable emitting the updated BranchI object.
   */
  updateBranch(id: number, data: any): Observable<BranchI> {
    return this.http.put<{ branch: BranchI }>(`${this.base_path}${id}`, data) // PUT request to update a branch
      .pipe(
        map(response => response.branch) // Extracts the 'branch' object from the response
      );
  }

  /**
   * Deletes a branch by its ID.
   * @param id The ID of the branch to delete.
   * @returns An Observable emitting the deleted BranchI object.
   */
  deleteBranch(id: number): Observable<BranchI> {
    return this.http.delete<BranchI>(`${this.base_path}${id}`); // DELETE request to remove a branch
  }
}

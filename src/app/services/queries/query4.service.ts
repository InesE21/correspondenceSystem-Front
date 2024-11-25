import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { query4I } from '../../models/queries/query4';

@Injectable({
  providedIn: 'root'
})
export class Query4Service {
  // Base URL for the Django backend API
  api_uri_django = 'http://localhost:8000';
  // Endpoint for customer-related operations
  base_path = `${this.api_uri_django}/persons/customer/unresolved-incidents/`;

  constructor(
    private http: HttpClient  // Injecting the HttpClient service for making HTTP requests
  ) { }

  getQuery4(dni: number): Observable<query4I[]> {
    return this.http.get<query4I[]>(`${this.base_path}${dni}/`);
  }
}

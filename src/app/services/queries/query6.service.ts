import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { query6I } from '../../models/queries/query6';

@Injectable({
  providedIn: 'root'
})
export class Query6Service {
  // Base URL for the Django backend API
  api_uri_django = 'http://localhost:8000';
  // Endpoint for customer-related operations
  base_path = `${this.api_uri_django}/persons/customer/premium-customers-activity/`;

  constructor(
    private http: HttpClient  // Injecting the HttpClient service for making HTTP requests
  ) { }

  getQuery6(): Observable<query6I[]> { 
    return this.http.get<query6I[]>(this.base_path);
  }
}

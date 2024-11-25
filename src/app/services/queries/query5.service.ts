import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { query5I } from '../../models/queries/query5';

@Injectable({
  providedIn: 'root'
})
export class Query5Service {
  // Base URL for the Django backend API
  api_uri_django = 'http://localhost:8000';
  // Endpoint for customer-related operations
  base_path = `${this.api_uri_django}/logistics/route/most-used-routes/`;

  constructor(
    private http: HttpClient  // Injecting the HttpClient service for making HTTP requests
  ) { }

  getQuery5(): Observable<query5I[]> { 
    return this.http.get<query5I[]>(this.base_path);
  }
}

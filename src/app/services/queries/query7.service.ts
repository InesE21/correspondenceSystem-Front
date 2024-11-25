import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { query7I } from '../../models/queries/query7';

@Injectable({
  providedIn: 'root'
})
export class Query7Service {
  // Base URL for the Django backend API
  api_uri_django = 'http://localhost:8000';
  // Endpoint for customer-related operations
  base_path = `${this.api_uri_django}/logistics/service/average-cost/`;

  constructor(
    private http: HttpClient  // Injecting the HttpClient service for making HTTP requests
  ) { }

  getQuery7(): Observable<query7I[]> { 
    return this.http.get<query7I[]>(this.base_path);
  }
}

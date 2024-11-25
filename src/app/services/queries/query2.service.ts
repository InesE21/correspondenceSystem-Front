import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { query2I } from '../../models/queries/query2';

@Injectable({
  providedIn: 'root'
})
export class Query2Service {
  // Base URL for the Django backend API
  api_uri_django = 'http://localhost:8000';
  // Endpoint for customer-related operations
  base_path = `${this.api_uri_django}/logistics/transport/capacity-by-type/`;

  constructor(
    private http: HttpClient  // Injecting the HttpClient service for making HTTP requests
  ) { }

  getQuery2(): Observable<query2I[]> { 
    return this.http.get<query2I[]>(this.base_path);
  }

}

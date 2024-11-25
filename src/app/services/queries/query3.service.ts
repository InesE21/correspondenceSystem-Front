import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { query3I } from '../../models/queries/query3';

@Injectable({
  providedIn: 'root'
})
export class Query3Service {
  // Base URL for the Django backend API
  api_uri_django = 'http://localhost:8000';
  // Endpoint for customer-related operations
  base_path = `${this.api_uri_django}/shipments/shipping/by-branch-status/`;

  constructor(
    private http: HttpClient  // Injecting the HttpClient service for making HTTP requests
  ) { }

  getQuery3(): Observable<query3I[]> { 
    return this.http.get<query3I[]>(this.base_path);
  }

}

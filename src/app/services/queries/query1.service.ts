import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { query1I } from '../../models/queries/query1';

@Injectable({
  providedIn: 'root'
})
export class Query1Service {
  // Base URL for the Django backend API
  api_uri_django = 'http://localhost:8000';
  // Endpoint for customer-related operations
  base_path = `${this.api_uri_django}/shipments/shipping/pending/`;

  constructor(
    private http: HttpClient  // Injecting the HttpClient service for making HTTP requests
  ) { }

  getQuery1(dni: number): Observable<query1I[]> { 
    return this.http.get<query1I[]>(`${this.base_path}${dni}/`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorrespondenceI } from '../../models/shipment';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/shipments/correspondence/`

  constructor(
    private http:HttpClient
  ) { }

  getAllCorrespondence():Observable<CorrespondenceI[]>{
    return this.http
      .get<CorrespondenceI[]>(this.base_path)
  }

  getOneCorrespondence(id: number):Observable<CorrespondenceI>{
    return this.http
      .get<CorrespondenceI>(`${this.base_path}${id}`)
  }

  createCorrespondence(data: any):Observable<CorrespondenceI>{
    return this.http.post<CorrespondenceI>(this.base_path, data)
  }

  updateCorrespondence(id: number, data: any): Observable<CorrespondenceI> {
    return this.http.put<CorrespondenceI>(`${this.base_path}${id}`, data);
  }

  deleteCorrespondence(id: number): Observable<CorrespondenceI> {
    return this.http.delete<CorrespondenceI>(`${this.base_path}${id}`);
  }
}

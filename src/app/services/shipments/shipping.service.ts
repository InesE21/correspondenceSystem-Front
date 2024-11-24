import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShippingI } from '../../models/shipment';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/shipments/shipping/`

  constructor(
    private http:HttpClient
  ) { }

  getAllShipping():Observable<ShippingI[]>{
    return this.http
      .get<ShippingI[]>(this.base_path)
  }

  getOneShipping(id: number):Observable<ShippingI>{
    return this.http
      .get<ShippingI>(`${this.base_path}${id}`)
  }

  createShipping(data: any):Observable<ShippingI>{
    return this.http.post<ShippingI>(this.base_path, data)
  }

  updateShipping(id: number, data: any): Observable<ShippingI> {
    return this.http.put<ShippingI>(`${this.base_path}${id}`, data);
  }

  deleteShipping(id: number): Observable<ShippingI> {
    return this.http.delete<ShippingI>(`${this.base_path}${id}`);
  }
}

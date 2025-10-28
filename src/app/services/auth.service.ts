import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://10.115.201.160:7043/api/';

  constructor(private http: HttpClient) { }
  
  getMenu() {
    return this.http.get(this.baseUrl + 'Catalogue/GetCatalogue');
  }
}

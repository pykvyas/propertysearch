import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from './property.model';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private readonly http = inject(HttpClient);

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>('/api/properties');
  }
}
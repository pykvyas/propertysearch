import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Property } from './property.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  minPrice = signal<number | null>(null);
  maxPrice = signal<number | null>(null);
  minBedrooms = signal<number | null>(null);
  city = signal('');

  readonly properties: Property[] = [
    { id: 1, price: 525000, bedrooms: 4, baths: 3, city: 'Apex', address: '112 Willow Creek Dr', type: 'Single Family', icon: '🏡' },
    { id: 2, price: 685000, bedrooms: 5, baths: 4, city: 'Cary', address: '48 Greenway Park Ln', type: 'Single Family', icon: '🏠' },
    { id: 3, price: 399000, bedrooms: 3, baths: 2, city: 'Raleigh', address: '907 Oak Ridge Ave', type: 'Townhome', icon: '🏘️' },
    { id: 4, price: 745000, bedrooms: 4, baths: 3, city: 'Morrisville', address: '21 Silver Maple Ct', type: 'Single Family', icon: '🏡' },
    { id: 5, price: 315000, bedrooms: 2, baths: 2, city: 'Raleigh', address: '330 Hillsborough St', type: 'Condo', icon: '🏢' },
    { id: 6, price: 575000, bedrooms: 4, baths: 3, city: 'Cary', address: '76 Amberwood Dr', type: 'Single Family', icon: '🏡' },
    { id: 7, price: 460000, bedrooms: 3, baths: 2.5, city: 'Apex', address: '204 Sunset Lake Rd', type: 'Townhome', icon: '🏘️' },
    { id: 8, price: 895000, bedrooms: 5, baths: 4.5, city: 'Morrisville', address: '15 Briarwood Reserve', type: 'Luxury Home', icon: '🏰' },
    { id: 9, price: 435000, bedrooms: 3, baths: 2.5, city: 'Cary', address: '602 Kildaire Farm Rd', type: 'Townhome', icon: '🏘️' }
  ];

  readonly filteredProperties = computed(() => {
    const min = this.minPrice() ?? 0;
    const max = this.maxPrice() ?? Number.POSITIVE_INFINITY;
    const beds = this.minBedrooms() ?? 0;
    const selectedCity = this.city();

    return this.properties.filter(p =>
      (!selectedCity || p.city === selectedCity) &&
      p.price >= min &&
      p.price <= max &&
      p.bedrooms >= beds
    );
  });

  applyFilters(): void {
    // Signals update the computed list automatically.
  }

  resetFilters(): void {
    this.city.set('');
    this.minPrice.set(null);
    this.maxPrice.set(null);
    this.minBedrooms.set(null);
  }

  trackById(_: number, property: Property): number {
    return property.id;
  }
}

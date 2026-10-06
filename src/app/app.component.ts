import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PropertyService } from './property.service';
import { Property } from './property.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private readonly propertyService = inject(PropertyService);

  minPrice = signal<number | null>(null);
  maxPrice = signal<number | null>(null);
  minBedrooms = signal<number | null>(null);
  city = signal('');
  readonly properties = signal<Property[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly cities = computed(() => [...new Set(this.properties().map(property => property.city))].sort());

  readonly filteredProperties = computed(() => {
    const min = this.minPrice() ?? 0;
    const max = this.maxPrice() ?? Number.POSITIVE_INFINITY;
    const beds = this.minBedrooms() ?? 0;
    const selectedCity = this.city();

    return this.properties().filter(property =>
      (!selectedCity || property.city === selectedCity) &&
      property.price >= min &&
      property.price <= max &&
      property.bedrooms >= beds
    );
  });

  constructor() {
    this.propertyService.getProperties().subscribe({
      next: properties => {
        this.properties.set(properties);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Listings could not be loaded. Please try again later.');
        this.loading.set(false);
      }
    });
  }

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

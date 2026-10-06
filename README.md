# Property Explorer - Angular

Angular UI for a .NET property-listing application.

## Features
- Filter by city
- Filter by minimum price
- Filter by maximum price
- Filter by minimum bedrooms
- Reset filters
- Responsive property cards

## Run

```bash
npm install
npm start
```

Then open http://localhost:4200.

## Connect to your .NET API

Replace the sample `properties` array in `src/app/app.component.ts` with an Angular service using `HttpClient`.

Example API endpoint:

`GET /api/properties?minPrice=400000&maxPrice=800000&minBedrooms=3&city=Apex`

The API response should map to the `Property` interface in `src/app/property.model.ts`.

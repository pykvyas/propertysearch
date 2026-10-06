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

## Listings API

The app loads listings with Angular `HttpClient` from `GET /api/properties`. The Angular dev server proxies this request to `http://localhost:5000` using `proxy.conf.json`, avoiding cross-origin browser requests.

Start the API on port 5000 before running the Angular app. The response fields are defined by `Property` in `src/app/property.model.ts`.


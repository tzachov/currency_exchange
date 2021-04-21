# Currency Exchange

## Setup
Install packages
```
npm ci
```

Run server
```
npm start
```

Open browser
```
http://localhost:3000
```

## Notes
There are several caching layers:
1. Server in-memory cache (used IoC so it can be replaced with Redis)
2. Browser cache based on `max-age` header (caches conversions until UTC midnight)
3. Local storage cache for every used currency pair

(adding a simple service worker would make the widget work offline for used currencies)

I've added `Swap Currencies` functionality when clicking the swap arrows (saw this feature on several sites)

I used `Web Components` because it enables encapsulation of all the UI and logic in a very clean markup (`<quote-widget/>`) and also make it reusable.

One thing I wanted to do but didn't have the time is bundle all widget files into a single script using WebPack. This would result in faster load time and enable using the proper file types for widget template (html) and style (scss)
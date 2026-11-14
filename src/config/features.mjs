// Feature flags for temporarily hiding parts of the site.
//
// FUEL_DELIVERY_ENABLED: Fuel Delivery is hidden for now (no page, no nav/footer/
// service-list entries, not in the sitemap or structured data). To bring it back,
// set this to true — every place that checks it is marked "FUEL_DELIVERY_ENABLED".
// Also re-add by hand (these were removed, not flagged):
//   - public/llms.txt: the "Fuel Delivery Dubai" line
//   - src/Pages/Service.jsx: the Fuel Delivery ListItem in the ItemList schema (renumber Roadside to position 9)
//   - public/locales/{en,ar,ur}/common.json: "fuel delivery" in the home meta description
export const FUEL_DELIVERY_ENABLED = false;

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/js/data.js'), 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const { cars, biz } = context.window.NR;
const outDir = path.join(root, 'cars');
fs.mkdirSync(outDir, { recursive: true });
for (const file of fs.readdirSync(outDir)) {
  if (file.endsWith('.html')) fs.unlinkSync(path.join(outDir, file));
}

const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
}[char]));
const slugify = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const slug = car => slugify(`${car.year}-${car.brand}-${car.model}`);
const absolute = value => value?.startsWith('http') ? value : `https://www.nextridesug.com/${value}`;
const displayPrice = car => car.price > 0
  ? car.ugxPrice ? `UGX ${car.ugxPrice}` : `$${Number(car.price).toLocaleString('en-US')}`
  : car.priceRange || 'Price on request';

for (const car of cars.filter(car => car.visible !== false)) {
  const carSlug = slug(car);
  const title = `${car.year} ${car.brand} ${car.model} for Sale in Uganda | Next Rides`;
  const description = `${car.year} ${car.brand} ${car.model} in Kampala, Uganda. ${car.condition}. ${car.fuel}, ${car.trans}. ${displayPrice(car)}. View photos and enquire with Next Rides Uganda.`;
  const images = (car.images?.length ? car.images : [car.img]).filter(Boolean).filter(img => !img.endsWith('.mp4'));
  const offer = car.price > 0 ? {
    '@type':'Offer', priceCurrency:'USD', price:String(car.price), availability:'https://schema.org/InStock', url:`https://www.nextridesug.com/cars/${carSlug}.html`
  } : null;
  const schema = {
    '@context':'https://schema.org', '@type':['Product','Vehicle'], name:`${car.year} ${car.brand} ${car.model}`,
    '@id':`https://www.nextridesug.com/cars/${carSlug}.html#vehicle`,
    url:`https://www.nextridesug.com/cars/${carSlug}.html`, image:images.map(absolute), description:car.desc,
    sku:car.id,
    brand:{ '@type':'Brand', name:car.brand },
    vehicleModelDate:String(car.year), manufacturer:{ '@type':'Organization', name:car.brand }, model:car.model,
    fuelType:car.fuel, vehicleTransmission:car.trans, color:car.color,
    itemCondition:String(car.condition).toLowerCase().includes('brand new') ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition'
  };
  if (offer) schema.offers = offer;
  const breadcrumbSchema = {
    '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
      { '@type':'ListItem',position:1,name:'Home',item:'https://www.nextridesug.com/' },
      { '@type':'ListItem',position:2,name:'Cars for sale',item:'https://www.nextridesug.com/inventory.html' },
      { '@type':'ListItem',position:3,name:`${car.year} ${car.brand} ${car.model}`,item:`https://www.nextridesug.com/cars/${carSlug}.html` }
    ]
  };
  const numericMileage = Number(String(car.mileage || '').replace(/[^0-9.]/g, ''));
  if (numericMileage) schema.mileageFromOdometer = { '@type':'QuantitativeValue', value:numericMileage, unitCode:'KMT' };
  const interiorStart = Number.isInteger(car.interiorStart) ? Math.min(car.interiorStart, images.length) : images.length;
  const exteriorImages = images.slice(0, interiorStart);
  const interiorImages = images.slice(interiorStart);
  const exteriorGallery = exteriorImages.map((image, index) => `<img src="${image}" alt="${esc(car.year)} ${esc(car.brand)} ${esc(car.model)} exterior photo ${index + 1}" loading="${index ? 'lazy' : 'eager'}" decoding="async">`).join('');
  const interiorGallery = interiorImages.map((image, index) => `<img src="${image}" alt="${esc(car.year)} ${esc(car.brand)} ${esc(car.model)} interior photo ${index + 1}" loading="lazy" decoding="async">`).join('');
  const whatsapp = `https://wa.me/${biz.wa}?text=${encodeURIComponent(`Hi Next Rides! I'm interested in the ${car.year} ${car.brand} ${car.model}. Please confirm availability and price.`)}`;
  const html = `<!DOCTYPE html>
<html lang="en" class="nr-v4">
<head>
  <script>try{var t=localStorage.getItem('nr-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.setAttribute('data-theme','dark')}catch(e){}</script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="../">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-video-preview:-1">
  <link rel="canonical" href="https://www.nextridesug.com/cars/${carSlug}.html">
  <link rel="alternate" hreflang="en-UG" href="https://www.nextridesug.com/cars/${carSlug}.html">
  <meta property="og:type" content="product">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${esc(absolute(images[0]))}">
  <meta property="og:image:alt" content="${esc(car.year)} ${esc(car.brand)} ${esc(car.model)} for sale in Kampala">
  <meta property="og:url" content="https://www.nextridesug.com/cars/${carSlug}.html">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preload" as="image" href="${esc(images[0])}" fetchpriority="high">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/editorial-v4.css?v=20260823-hero-v3">
  <link rel="icon" type="image/png" href="logo.png">
  <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c')}</script>
</head>
<body>
  <script src="assets/js/data.js?v=20260823-hero-v3"></script>
  <script src="assets/js/components.js?v=20260823-hero-v3"></script>
  <main class="vehicle-page">
    <div class="w">
      <nav class="vehicle-crumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span>›</span><a href="inventory.html">Cars for sale in Kampala</a><span>›</span><span>${esc(car.brand)} ${esc(car.model)}</span></nav>
      <section class="vehicle-layout">
        <div class="vehicle-visuals">
          <header class="vehicle-visuals__head"><span>01 / Exterior</span><h2>Body, stance<br>and condition.</h2></header>
          <div class="vehicle-gallery">${exteriorGallery}</div>
          ${interiorImages.length ? `<header class="vehicle-visuals__head vehicle-visuals__head--interior"><span>02 / Interior</span><h2>Inside the<br>${esc(car.model)}.</h2><p>Matching cabin photographs from this vehicle's own image set.</p></header><div class="vehicle-gallery vehicle-gallery--interior">${interiorGallery}</div>` : `<div class="vehicle-interior-note"><span>Interior photographs</span><p>Ask the showroom for the current cabin photo set before confirming availability.</p></div>`}
        </div>
        <aside class="vehicle-summary">
          <span class="vehicle-kicker">${esc(car.badge || car.tag || 'Available')}</span>
          <h1>${esc(car.year)} ${esc(car.brand)}<br>${esc(car.model)}</h1>
          <p class="vehicle-price">${esc(displayPrice(car))}</p>
          <p class="vehicle-description">${esc(car.desc)}</p>
          <dl class="vehicle-specs">
            <div><dt>Year</dt><dd>${esc(car.year)}</dd></div>
            <div><dt>Mileage</dt><dd>${esc(car.mileage)}</dd></div>
            <div><dt>Fuel</dt><dd>${esc(car.fuel)}</dd></div>
            <div><dt>Transmission</dt><dd>${esc(car.trans)}</dd></div>
            <div><dt>Condition</dt><dd>${esc(car.condition)}</dd></div>
            <div><dt>Colour</dt><dd>${esc(car.color || 'Ask showroom')}</dd></div>
          </dl>
          <a class="btn btn-r btn-lg vehicle-enquire" href="${whatsapp}" target="_blank" rel="noopener">Check price &amp; availability</a>
          <p class="vehicle-note">Inventory changes quickly. Confirm the vehicle, inspection details and final price directly with the Naguru showroom.</p>
        </aside>
      </section>
    </div>
  </main>
  <script src="assets/js/main.js?v=20260823-hero-v3"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(outDir, `${carSlug}.html`), html);
}

const staticEntries = [
  ['', 'weekly', '1.0'], ['about.html','monthly','0.8'], ['brands.html','weekly','0.8'],
  ['contact.html','monthly','0.8'], ['events.html','weekly','0.7'], ['inventory.html','daily','0.9'],
  ['news.html','weekly','0.7'], ['order.html','monthly','0.7'], ['privacy.html','yearly','0.4'],
  ['rent.html','daily','0.9'], ['social.html','daily','0.8'], ['terms.html','yearly','0.4']
];
const urls = [
  ...staticEntries.map(([url, changefreq, priority]) => ({ url, changefreq, priority })),
  ...cars.filter(car => car.visible !== false).map(car => ({ url:`cars/${slug(car)}.html`, changefreq:'daily', priority:'0.8' }))
];
const today = new Date().toISOString().slice(0,10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.map(item => {
  const match = item.url.startsWith('cars/') ? cars.find(car => `cars/${slug(car)}.html` === item.url) : null;
  const image = match ? absolute((match.images?.length ? match.images : [match.img]).find(value => value && !value.endsWith('.mp4'))) : null;
  return `  <url>\n    <loc>https://www.nextridesug.com/${item.url}</loc>\n    <lastmod>${today}</lastmod>${image ? `\n    <image:image><image:loc>${image.replace(/&/g,'&amp;')}</image:loc><image:title>${esc(`${match.year} ${match.brand} ${match.model}`)}</image:title></image:image>` : ''}\n    <changefreq>${item.changefreq}</changefreq>\n    <priority>${item.priority}</priority>\n  </url>`;
}).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap);
console.log(`Generated ${cars.filter(car => car.visible !== false).length} vehicle pages and sitemap.xml`);

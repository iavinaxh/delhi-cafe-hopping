const OVERPASS_URLS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter'
];
const PHOTON_URL = 'https://photon.komoot.io/api/';
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000;

const json = (res, status, body) => {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
};
const clean = (value) => String(value || '').trim();
const enc = (value) => encodeURIComponent(value);

async function photonSearch(query) {
  const cacheKey = `geo:${query.toLowerCase()}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.time < CACHE_TTL_MS) return cached.value;
  const url = `${PHOTON_URL}?q=${enc(query)}&limit=1&lang=en`;
  const response = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': 'DelhiNCRDateGuide/1.0 (+https://github.com/iavinaxh/delhi-cafe-hopping)' } });
  if (!response.ok) throw new Error('Location search is temporarily unavailable.');
  const data = await response.json();
  const feature = data.features?.[0];
  if (!feature?.geometry?.coordinates?.length) throw new Error('Could not find that Delhi NCR location. Try a landmark, neighbourhood or metro station.');
  const value = { lng: Number(feature.geometry.coordinates[0]), lat: Number(feature.geometry.coordinates[1]), label: feature.properties?.name || query };
  cache.set(cacheKey, { time: Date.now(), value });
  return value;
}

function buildOverpassQuery(lat, lng, radiusMeters) {
  const radius = Math.min(Math.max(radiusMeters, 1000), 30000);
  const around = `(around:${radius},${lat},${lng})`;
  return `[out:json][timeout:20];(
    nwr[amenity=cafe][name]${around};
    nwr[amenity=restaurant][name]${around};
    nwr[amenity=fast_food][name]${around};
  );out center tags 250;`;
}

async function overpassSearch(query) {
  const cacheKey = `places:${query}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.time < CACHE_TTL_MS) return cached.value;
  let lastError = null;
  for (const endpoint of OVERPASS_URLS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'User-Agent': 'DelhiNCRDateGuide/1.0 (+https://github.com/iavinaxh/delhi-cafe-hopping)' },
        body: `data=${enc(query)}`
      });
      if (!response.ok) { lastError = new Error(`Restaurant discovery service returned ${response.status}`); continue; }
      const value = await response.json();
      cache.set(cacheKey, { time: Date.now(), value });
      return value;
    } catch (error) { lastError = error; }
  }
  throw lastError || new Error('Restaurant discovery is temporarily unavailable.');
}

function haversineKm(aLat, aLng, bLat, bLng) {
  const r = 6371;
  const dLat = (bLat - aLat) * Math.PI / 180;
  const dLng = (bLng - aLng) * Math.PI / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(aLat * Math.PI / 180) * Math.cos(bLat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return r * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function elementPoint(element) {
  if (element.type === 'node') return { lat: Number(element.lat), lng: Number(element.lon) };
  return { lat: Number(element.center?.lat), lng: Number(element.center?.lon) };
}

function mapsUrl(name, address, lat, lng) {
  if (Number.isFinite(lat) && Number.isFinite(lng)) return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  return `https://www.google.com/maps/search/?api=1&query=${enc(`${name} ${address}`)}`;
}

function toCandidate(element, origin, budget, people) {
  const tags = element.tags || {};
  const point = elementPoint(element);
  const name = clean(tags.name || tags['name:en']);
  if (!name || !Number.isFinite(point.lat) || !Number.isFinite(point.lng)) return null;
  const street = [tags['addr:housenumber'], tags['addr:street']].filter(Boolean).join(' ');
  const address = [street, tags['addr:suburb'], tags['addr:city'], tags['addr:postcode']].filter(Boolean).join(', ') || tags['addr:full'] || '';
  const cuisine = clean(tags.cuisine).replace(/;/g, ', ');
  const amenity = tags.amenity || 'restaurant';
  const distanceKm = haversineKm(origin.lat, origin.lng, point.lat, point.lng);
  const website = tags.website || tags['contact:website'] || '';
  const phone = tags.phone || tags['contact:phone'] || '';
  const outdoor = tags.outdoor_seating === 'yes';
  const vegetarian = tags.diet_vegetarian === 'yes' || tags['diet:vegetarian'] === 'yes';
  const vegan = tags.diet_vegan === 'yes' || tags['diet:vegan'] === 'yes';
  const price = tags['price:range'] || tags.price_range || '';
  return { id:`${element.type}/${element.id}`, name, address, cuisine:cuisine || 'Not listed', amenity, distanceKm:Number(distanceKm.toFixed(1)), mapsUrl:mapsUrl(name,address,point.lat,point.lng), websiteUrl:website, phone, openingHours:tags.opening_hours || '', outdoor, vegetarian, vegan, priceRange:price, budgetLabel:price || 'Price not listed', groupSize:people, totalBudget:budget, source:'OpenStreetMap' };
}

function simpleRank(candidates, prefs) {
  const vibe = clean(prefs.vibe).toLowerCase();
  const cuisine = clean(prefs.cuisine).toLowerCase();
  const occasion = clean(prefs.occasion).toLowerCase();
  const requirements = clean(prefs.requirements).toLowerCase();
  return candidates.map(p => {
    const hay = `${p.name} ${p.address} ${p.cuisine} ${p.amenity} ${p.outdoor ? 'outdoor' : ''} ${p.vegetarian ? 'vegetarian' : ''} ${p.vegan ? 'vegan' : ''}`.toLowerCase();
    let score = Math.max(0, 35 - p.distanceKm * 2);
    if (cuisine !== 'any cuisine' && hay.includes(cuisine.split(' ')[0])) score += 12;
    if (cuisine === 'cafe / coffee' && p.amenity === 'cafe') score += 14;
    if (vibe !== 'any vibe') {
      if (vibe === 'outdoor' && p.outdoor) score += 12;
      else if (hay.includes(vibe)) score += 8;
    }
    if (requirements) {
      const terms = requirements.split(/[, ]+/).filter(Boolean).slice(0, 5);
      score += terms.filter(term => hay.includes(term)).length * 3;
    }
    if (occasion === 'date' && (p.amenity === 'cafe' || p.amenity === 'restaurant')) score += 3;
    if (p.websiteUrl) score += 1;
    return {...p,_score:score};
  }).sort((a,b)=>b._score-a._score).slice(0,10).map((p,i)=>({...p,matchLabel:i===0?'Best overall match':i===1?'Best nearby option':i===2?'Best vibe match':'Strong match',reason:`${p.distanceKm} km away. ${p.cuisine !== 'Not listed' ? `Cuisine: ${p.cuisine}.` : 'Cuisine is not listed in OpenStreetMap.'}`,caution:'Live price, availability and dining offers are not guaranteed by OpenStreetMap. Check the venue before visiting.'}));
}

async function aiRank(apiKey,candidates,prefs){
  const model=process.env.OPENAI_MODEL||'gpt-5-mini';
  const system=`You are the recommendation layer for a Delhi NCR restaurant discovery website. Rank only the supplied OpenStreetMap candidates against the user's preferences. NEVER invent a restaurant, rating, price, opening hour, offer, reservation availability, menu item, cuisine, or location detail. OpenStreetMap is the source of truth for supplied place facts. If a fact is missing, say it is missing. You may suggest a type of meal generically, but do not claim a specific menu item exists. The user's budget is total for the whole group and exact prices are usually unavailable. Return only valid JSON.`;
  const schema={type:'json_schema',json_schema:{name:'restaurant_recommendations',strict:true,schema:{type:'object',additionalProperties:false,properties:{recommendations:{type:'array',minItems:1,maxItems:6,items:{type:'object',additionalProperties:false,properties:{id:{type:'string'},matchLabel:{type:'string'},reason:{type:'string'},budgetFit:{type:'string'},vibeFit:{type:'string'},orderAdvice:{type:'string'},caution:{type:'string'}},required:['id','matchLabel','reason','budgetFit','vibeFit','orderAdvice','caution']}}},required:['recommendations']}}};
  const response=await fetch(OPENAI_URL,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${apiKey}`},body:JSON.stringify({model,temperature:0.2,response_format:schema,messages:[{role:'system',content:system},{role:'user',content:JSON.stringify({preferences:prefs,candidates})}]})});
  const data=await response.json();if(!response.ok)throw new Error(data.error?.message||'OpenAI recommendation request failed.');
  const content=data.choices?.[0]?.message?.content;if(!content)throw new Error('OpenAI returned no recommendation content.');return JSON.parse(content).recommendations;
}

export default async function handler(req,res){
  if(req.method!=='POST')return json(res,405,{error:'Use POST.'});
  try{
    const prefs=typeof req.body==='string'?JSON.parse(req.body):(req.body||{});
    const budget=Number(prefs.budget||1000),people=Number(prefs.people||2),distance=Number(prefs.distance||5),cuisine=clean(prefs.cuisine)||'Any cuisine';
    const rawLocation=clean(prefs.location),searchLocation=rawLocation && rawLocation.toLowerCase()!=='current location' ? rawLocation : '';
    let origin,locationLabel='Delhi NCR';
    if(searchLocation){origin=await photonSearch(`${searchLocation}, Delhi NCR, India`);locationLabel=origin.label;}
    else if(prefs.coords?.lat&&prefs.coords?.lng){origin={lat:Number(prefs.coords.lat),lng:Number(prefs.coords.lng),label:'your current location'};locationLabel='your current location';}
    else{origin=await photonSearch('Connaught Place, New Delhi, India');locationLabel='Delhi NCR';}
    const radiusMeters=distance>=50?30000:Math.max(1000,distance*1000);
    const data=await overpassSearch(buildOverpassQuery(origin.lat,origin.lng,radiusMeters));
    const seen=new Set();
    const candidates=(data.elements||[]).map(e=>toCandidate(e,origin,budget,people)).filter(Boolean).filter(place=>{const key=place.name.toLowerCase();if(seen.has(key))return false;seen.add(key);return place.distanceKm <= (distance>=50?30:distance);});
    if(!candidates.length)return json(res,200,{source:'OpenStreetMap',location:locationLabel,results:[],message:'No mapped cafes or restaurants matched this area. Try a nearby landmark or increase the travel distance.'});
    const ranked=simpleRank(candidates,prefs);let results=ranked;let source='OpenStreetMap';
    if(process.env.OPENAI_API_KEY){try{const ai=await aiRank(process.env.OPENAI_API_KEY,ranked,prefs);const byId=new Map(ranked.map(p=>[p.id,p]));results=ai.map(item=>({...byId.get(item.id),...item})).filter(Boolean);source='OpenStreetMap + AI ranking';}catch(error){console.error('AI ranking failed, using local ranking:',error.message);}}
    return json(res,200,{source,location:locationLabel,results});
  }catch(error){console.error('Recommendation service failed:',error);return json(res,500,{error:error.message||'Restaurant discovery failed. Please try another location.'});}
}

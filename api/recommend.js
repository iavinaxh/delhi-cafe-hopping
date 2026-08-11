const GOOGLE_URL='https://places.googleapis.com/v1/places:searchText';
const OPENAI_URL='https://api.openai.com/v1/chat/completions';
const json=(res,status,body)=>{res.status(status).setHeader('Content-Type','application/json');res.end(JSON.stringify(body));};
const priceLabel=place=>({PRICE_LEVEL_FREE:'Free',PRICE_LEVEL_INEXPENSIVE:'Google: inexpensive',PRICE_LEVEL_MODERATE:'Google: moderate',PRICE_LEVEL_EXPENSIVE:'Google: expensive',PRICE_LEVEL_VERY_EXPENSIVE:'Google: very expensive'}[place.priceLevel]||'Budget: verify');
function toCandidate(place){return {id:place.id,name:place.displayName?.text||'Unnamed place',address:place.formattedAddress||'',rating:place.rating||null,userRatingCount:place.userRatingCount||null,priceLevel:place.priceLevel||null,priceLevelLabel:priceLabel(place),priceRange:place.priceRange||null,types:place.types||[],mapsUrl:place.googleMapsUri||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((place.displayName?.text||'')+' '+(place.formattedAddress||''))}`,websiteUrl:place.websiteUri||null};}
async function googleSearch(apiKey,query,coords,radiusMeters,pageSize=15){
  const body={textQuery:query,languageCode:'en',regionCode:'IN',pageSize,rankPreference:'RELEVANCE'};
  if(coords?.lat&&coords?.lng&&radiusMeters<50000) body.locationBias={circle:{center:{latitude:Number(coords.lat),longitude:Number(coords.lng)},radius:radiusMeters}};
  const response=await fetch(GOOGLE_URL,{method:'POST',headers:{'Content-Type':'application/json','X-Goog-Api-Key':apiKey,'X-Goog-FieldMask':'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.priceLevel,places.priceRange,places.googleMapsUri,places.websiteUri,places.types'},body:JSON.stringify(body)});
  const data=await response.json(); if(!response.ok) throw new Error(data.error?.message||'Google Places search failed.'); return data.places||[];
}
function simpleRank(candidates,prefs){
  const budget=Number(prefs.budget||1000),vibe=String(prefs.vibe||'').toLowerCase(),cuisine=String(prefs.cuisine||'').toLowerCase(),occasion=String(prefs.occasion||'').toLowerCase();
  return candidates.map(p=>{const hay=`${p.name} ${p.address} ${(p.types||[]).join(' ')}`.toLowerCase();let score=(p.rating||0)*10+Math.min(p.userRatingCount||0,1000)/2000;if(vibe!=='any vibe'&&hay.includes(vibe))score+=5;if(cuisine!=='any cuisine'&&hay.includes(cuisine.split(' ')[0]))score+=4;if(occasion==='date'&&(hay.includes('cafe')||hay.includes('restaurant')))score+=2;if(p.priceLevel==='PRICE_LEVEL_VERY_EXPENSIVE')score-=5;if(p.priceLevel==='PRICE_LEVEL_EXPENSIVE'&&budget<=1000)score-=3;return {...p,_score:score};}).sort((a,b)=>b._score-a._score).slice(0,6).map((p,i)=>({...p,matchLabel:i===0?'Best overall match':i===1?'Best value candidate':i===2?'Best ambience candidate':'Strong match',reason:`Matches your ${prefs.occasion||'outing'} request in ${prefs.location==='Current location'?'your area':prefs.location||'Delhi NCR'} with a ${prefs.vibe||'flexible'} preference. Google rating: ${p.rating||'not available'}.`,caution:p.priceLevel==='PRICE_LEVEL_EXPENSIVE'||p.priceLevel==='PRICE_LEVEL_VERY_EXPENSIVE'?'This may exceed the stated budget. Verify the current menu before visiting.':null}));
}
async function aiRank(apiKey,candidates,prefs){
  const model=process.env.OPENAI_MODEL||'gpt-5-mini';
  const system=`You are the recommendation layer for a Delhi NCR restaurant discovery website. Rank the supplied Google Places candidates against the user's preferences. NEVER invent a restaurant, rating, price, opening hour, offer, reservation availability, cuisine, menu item, or location detail that is not present in the supplied data. Google data is the source of truth for current place facts. The user's budget is the total budget for the whole group. If exact cost for the group cannot be established from the data, explicitly say the user should verify the current menu. You may use general culinary knowledge to explain why a type of place could fit, but label uncertain details as suggestions, not facts. Return only valid JSON.`;
  const schema={type:'json_schema',json_schema:{name:'restaurant_recommendations',strict:true,schema:{type:'object',additionalProperties:false,properties:{recommendations:{type:'array',minItems:1,maxItems:6,items:{type:'object',additionalProperties:false,properties:{id:{type:'string'},matchLabel:{type:'string'},reason:{type:'string'},budgetFit:{type:'string'},vibeFit:{type:'string'},orderAdvice:{type:'string'},caution:{type:'string'}},required:['id','matchLabel','reason','budgetFit','vibeFit','orderAdvice','caution']}}},required:['recommendations']}}};
  const response=await fetch(OPENAI_URL,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${apiKey}`},body:JSON.stringify({model,temperature:0.2,response_format:schema,messages:[{role:'system',content:system},{role:'user',content:JSON.stringify({preferences:prefs,candidates})}]} )});
  const data=await response.json(); if(!response.ok) throw new Error(data.error?.message||'OpenAI recommendation request failed.'); const content=data.choices?.[0]?.message?.content; if(!content) throw new Error('OpenAI returned no recommendation content.'); return JSON.parse(content).recommendations;
}
export default async function handler(req,res){
  if(req.method!=='POST') return json(res,405,{error:'Use POST.'});
  const googleKey=process.env.GOOGLE_PLACES_API_KEY; if(!googleKey) return json(res,503,{error:'Google Places is not configured yet. Add GOOGLE_PLACES_API_KEY in your Vercel environment variables.'});
  try{
    const prefs=typeof req.body==='string'?JSON.parse(req.body):(req.body||{}),rawLocation=String(prefs.location||'Delhi NCR').trim(),location=rawLocation.toLowerCase()==='current location'?'Delhi NCR':rawLocation;
    const cuisine=String(prefs.cuisine||'Any cuisine'),occasion=String(prefs.occasion||'Casual meal'),vibe=String(prefs.vibe||'Any vibe'),requirements=String(prefs.requirements||'').trim();
    const base=[cuisine!=='Any cuisine'?cuisine:'',vibe!=='Any vibe'?vibe:'',occasion!=='Casual meal'?occasion:'',requirements].filter(Boolean).join(' ');
    const queries=[`${base} cafe restaurants in ${location} Delhi NCR`,`${base} best restaurants in ${location} Delhi NCR`,`${cuisine!=='Any cuisine'?cuisine:'good food'} cafes near ${location} Delhi NCR`];
    const requestedDistance=Number(prefs.distance||5),radiusMeters=requestedDistance>=50?50000:requestedDistance*1000;
    const batches=await Promise.all(queries.map(q=>googleSearch(googleKey,q,prefs.coords,radiusMeters,12)));
    const map=new Map(); batches.flat().forEach(place=>{if(place?.id)map.set(place.id,place);}); const candidates=Array.from(map.values()).map(toCandidate);
    if(!candidates.length)return json(res,200,{source:'Google Places',results:[]});
    const ranked=simpleRank(candidates,prefs); let results=ranked;
    if(process.env.OPENAI_API_KEY){try{const ai=await aiRank(process.env.OPENAI_API_KEY,ranked,prefs),byId=new Map(ranked.map(p=>[p.id,p]));results=ai.map(item=>({...byId.get(item.id),...item})).filter(Boolean);}catch(aiError){console.error('AI ranking failed, using Google ranking:',aiError.message);}}
    return json(res,200,{source:process.env.OPENAI_API_KEY?'Google Places + AI ranking':'Google Places',results});
  }catch(error){console.error(error);return json(res,500,{error:error.message||'Recommendation service failed.'});}
}

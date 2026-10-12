import { firebaseConfig, cloudinaryConfig, isFirebaseConfigured, isCloudinaryConfigured } from '../firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getFirestore, collection, getDocs, query, where, orderBy, limit, startAfter, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';

const form = document.getElementById('propertyForm');
const statusBox = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitListingBtn');
const grid = document.getElementById('properties');
// Never leave design/demo cards visible if Firebase is unavailable; public listings must come from Firestore only.
if (grid) grid.replaceChildren();
const count = document.getElementById('count');
const esc = (s='') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const setStatus = (msg, bad=false) => { if(statusBox){statusBox.textContent=msg;statusBox.style.color=bad?'#ffb4a9':'#f3d37b';} };
let db=null, auth=null, liveMode=false, lastListingDoc=null, loadingMore=false, hasMoreListings=true;
const PAGE_SIZE=24;

async function uploadPhoto(file) {
  if (!isCloudinaryConfigured()) throw new Error('Cloudinary Cloud Name ગોઠવાયેલું નથી. firebase-config.js માં cloudName ભરો.');
  if (!['image/jpeg','image/png','image/webp'].includes(file.type)) throw new Error('માત્ર JPG, PNG અથવા WEBP ફોટા સ્વીકારાય છે.');
  if (file.size > 8*1024*1024) throw new Error('દરેક ફોટો 8 MB કરતાં નાનો હોવો જોઈએ.');
  const body = new FormData(); body.append('file', file); body.append('upload_preset', cloudinaryConfig.uploadPreset);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudinaryConfig.cloudName)}/image/upload`, {method:'POST',body});
  const data = await response.json().catch(()=>({}));
  if (!response.ok || !data.secure_url) throw new Error(data.error?.message || `ફોટા અપલોડ નિષ્ફળ (HTTP ${response.status}). Cloud Name / unsigned preset તપાસો.`);
  return {url:data.secure_url, publicId:data.public_id};
}

function renderLiveProperties(items) {
  if (!grid) return;
  // Only live approved items are rendered in configured mode; demo sample cards are removed.
  if (!items.length && !lastListingDoc) { grid.innerHTML='<div class="empty">હાલ મંજૂર થયેલી પ્રોપર્ટી ઉપલબ્ધ નથી. માલિકની લિસ્ટિંગ એડમિન મંજૂરી પછી અહીં દેખાશે.</div>'; }
  for (const p of items) {
    const article=document.createElement('article'); article.className='property';
    article.dataset.type=p.type||''; article.dataset.purpose=p.purpose==='ભાડે'?'rent':'sale';
    article.dataset.search=[p.location,p.type,p.title,p.description].join(' ').toLowerCase();
    const photos=Array.isArray(p.photos)?p.photos.filter(ph=>ph&&typeof ph.url==='string'&&/^https:\/\//i.test(ph.url)):[];
    const ownerPhone=String(p.ownerPhone||'6357030198');
    const waPhone=ownerPhone.replace(/\D/g,'').replace(/^0/,'').replace(/^91(?=\d{10}$)/,'');
    const waDigits=waPhone.length===10?'91'+waPhone:waPhone;
    const waText=encodeURIComponent(`નમસ્તે, મને ${p.type||'પ્રોપર્ટી'} (${p.purpose||''}) વિશે માહિતી જોઈએ. વિસ્તાર: ${p.location||'ગાંધીનગર'}. મારું ઘર પરથી લિસ્ટિંગ જોયું છે.`);
    const photo=photos[0]?.url;
    const gallery=photos.length>1?`<div class="photo-gallery" aria-label="પ્રોપર્ટીના બધા ફોટા">${photos.slice(1).map((ph,i)=>`<a href="${esc(ph.url)}" target="_blank" rel="noopener noreferrer" aria-label="ફોટો ${i+2} મોટો જુઓ"><img src="${esc(ph.url)}" alt="${esc(p.type||'પ્રોપર્ટી')} ફોટો ${i+2}" loading="lazy"></a>`).join('')}</div><div class="photo-count">કુલ ${photos.length} ફોટા · થંબનેલ પર દબાવી ફોટો જુઓ</div>`:'';
    article.innerHTML=`<div class="photo" ${photo?`style="background-image:url('${esc(photo)}')"`:''}><span class="pill">${esc(p.purpose||'પ્રોપર્ટી')}</span></div>${gallery}<div class="property-body"><h3>${esc(p.title||p.type||'પ્રોપર્ટી')}</h3><div class="loc">📍 ગાંધીનગર · ${esc(p.location||'વિગતો માટે સંપર્ક')}</div><div class="price">${esc(p.price||'કિંમત માટે સંપર્ક')}</div><div class="details"><span>${esc(p.type||'પ્રોપર્ટી')}</span></div></div><div class="property-foot"><a class="btn" href="tel:${esc(ownerPhone)}">📞 કોલ કરો</a><a class="wa-btn" href="https://wa.me/${esc(waDigits)}?text=${waText}" target="_blank" rel="noopener noreferrer">WhatsApp ચેટ</a></div>`;
    grid.appendChild(article);
  }
  if(count) count.textContent=`હમણાં સુધી ${grid.querySelectorAll('.property').length} મંજૂર લિસ્ટિંગ લોડ`;
  const more=document.getElementById('loadMoreListings'); if(more) more.hidden=!hasMoreListings;
}

async function loadApproved(reset=false) {
  if(loadingMore || (!hasMoreListings && !reset)) return;
  loadingMore=true;
  const more=document.getElementById('loadMoreListings'); if(more){more.disabled=true;more.textContent='લોડ થઈ રહ્યું છે…';}
  try {
    if(reset){lastListingDoc=null;hasMoreListings=true;grid?.replaceChildren();}
    const constraints=[where('status','==','approved'),orderBy('createdAt','desc'),limit(PAGE_SIZE)];
    if(lastListingDoc) constraints.push(startAfter(lastListingDoc));
    const snap=await getDocs(query(collection(db,'listings'),...constraints));
    lastListingDoc=snap.docs.at(-1)||lastListingDoc;
    hasMoreListings=snap.size===PAGE_SIZE;
    const items=snap.docs.map(d=>({id:d.id,...d.data()}));
    renderLiveProperties(items);
    return true;
  } catch(e) {
    console.error('Maru Ghar listing page load failed:',e);
    setStatus(`લિસ્ટિંગ લોડ ન થઈ: ${e.message||'Firebase rules અથવા index તપાસો.'}`,true);
    return false;
  } finally {
    loadingMore=false;
    if(more){more.disabled=false;more.textContent='વધુ પ્રોપર્ટી જુઓ';more.hidden=!hasMoreListings;}
  }
}

async function init() {
  if (!isFirebaseConfigured()) {
    if(count) count.textContent='ડેમો લિસ્ટિંગ';
    setStatus('સેટઅપ બાકી: Firebase web config અને Cloudinary Cloud Name ભરીને જ live save/upload થશે.',true);
    return;
  }
  try {
    const app=initializeApp(firebaseConfig); db=getFirestore(app); auth=getAuth(app); liveMode=true;
    const listingsLoaded = await loadApproved(true);
    if (!listingsLoaded) return; // Keep the actual Firestore/index/rules error visible; do not overwrite it with a false success message.
    setStatus(isCloudinaryConfigured()?'Firebase જોડાયું. મંજૂર લિસ્ટિંગ લોડ થઈ. ફોટા અપલોડ તૈયાર છે.':'Firebase જોડાયું; ફોટા અપલોડ માટે Cloudinary Cloud Name ભરો.',!isCloudinaryConfigured());
  } catch (e) {
    console.error('Maru Ghar Firebase init/read failed:',e);
    setStatus(`Firebase જોડાણ/રીડ નિષ્ફળ: ${e.message||'કન્ફિગરેશન અને Firestore rules તપાસો.'}`,true);
  }
}

if(form) form.addEventListener('submit', async ev=>{
  ev.preventDefault();
  if(!isFirebaseConfigured() || !db || !auth) { setStatus('લિસ્ટિંગ સાચવી શકાતી નથી: firebase-config.js માં Firebaseની સંપૂર્ણ web app માહિતી ભરો.',true); return; }
  const files=[...(document.getElementById('propertyPhotos')?.files||[])];
  if(files.length>20){setStatus('એક લિસ્ટિંગમાં વધુમાં વધુ 20 ફોટા પસંદ કરો. વધુ ફોટા હોય તો અલગ લિસ્ટિંગ/ભાગમાં ઉમેરો.',true);return;}
  submitBtn.disabled=true; submitBtn.textContent='માહિતી અને ફોટા મોકલાઈ રહ્યા છે…'; setStatus('કૃપા કરીને રાહ જુઓ…');
  try {
    // Anonymous sign-in lets the Firestore rule require an authenticated request without exposing private keys.
    if(!auth.currentUser) await signInAnonymously(auth);
    const uploaded=[];
    for(let i=0;i<files.length;i++){setStatus(`ફોટો ${i+1}/${files.length} અપલોડ થઈ રહ્યો છે…`);uploaded.push(await uploadPhoto(files[i]));}
    const fd=new FormData(form); const payload={
      ownerName:String(fd.get('ownerName')||'').trim(), ownerPhone:String(fd.get('ownerPhone')||'').trim(),
      type:String(fd.get('type')||''), purpose:String(fd.get('purpose')||''), location:String(fd.get('location')||'').trim(),
      price:String(fd.get('price')||'').trim(), description:String(fd.get('description')||'').trim(), ownerConsent:fd.get('ownerConsent')==='on', photos:uploaded,
      status:'pending', createdAt:serverTimestamp(), submitterUid:auth.currentUser.uid
    };
    if(payload.ownerName.length<2 || payload.location.length<2) throw new Error('નામ અને વિસ્તાર યોગ્ય રીતે ભરો.');
    await addDoc(collection(db,'listings'),payload);
    form.reset(); setStatus('લિસ્ટિંગ સફળતાપૂર્વક મોકલાઈ. એડમિન મંજૂરી મળે પછી જ વેબસાઇટ અને APKમાં જાહેર થશે.');
  } catch(e) {
    console.error('Maru Ghar listing submission failed:',e);
    setStatus(`લિસ્ટિંગ મોકલવામાં નિષ્ફળ: ${e.message||'Firebase rules, Auth અને Cloudinary preset તપાસો.'}`,true);
  } finally {submitBtn.disabled=false;submitBtn.textContent='પ્રોપર્ટી મંજૂરી માટે મોકલો';}
});

const photoInput=document.getElementById('propertyPhotos');
if(photoInput){photoInput.addEventListener('change',()=>{const status=document.getElementById('photoSelectionStatus');const files=[...(photoInput.files||[])];if(status)status.textContent=files.length?`${files.length} ફોટા પસંદ કર્યા. દરેક ફોટો 8 MB સુધી; એક લિસ્ટિંગમાં વધુમાં વધુ 20 ફોટા.`:'એક સાથે અનેક ફોટા પસંદ કરી શકો છો. વધુમાં વધુ 20 ફોટા.';if(files.length>20){photoInput.value='';if(status)status.textContent='20થી વધુ ફોટા પસંદ થયા. કૃપા કરીને 20 કે તેથી ઓછા ફોટા પસંદ કરો.';}});}

init();

const moreButton=document.getElementById('loadMoreListings'); if(moreButton) moreButton.addEventListener('click',()=>loadApproved(false));

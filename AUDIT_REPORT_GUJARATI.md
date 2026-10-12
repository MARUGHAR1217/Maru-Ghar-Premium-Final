# Maru Ghar — ચકાસણી અહેવાલ

તારીખ: 11-10-2026

## આ source ZIP પર કરેલી સ્થાનિક ચકાસણીઓ

1. `index.html` અને `admin.html` નું HTML parser ચેક — PASS.
2. હોમપેજના inline JavaScript અને admin module script નું Node.js syntax ચેક — PASS.
3. `assets/maru-ghar-backend.js` અને `firebase-config.js` નું JavaScript module syntax ચેક — PASS.
4. બંને GitHub Actions workflow ફાઇલનું YAML parse ચેક — PASS.
5. `package.json`, `capacitor.config.json`, `manifest.webmanifest` નું JSON parse ચેક — PASS.
6. admin UID, admin-only delete, listing add/delete, owner pending approval અને pagination માટે static code assertions — PASS.
7. જરૂરી ફાઇલોની હાજરી અને ZIP archive integrity — PASS.
8. જાહેર લિસ્ટિંગ માટે `status + createdAt` composite index કન્ફિગરેશન ઉમેર્યું અને JSON parse ચેક — PASS.
9. Firebase લોડ ન થાય ત્યારે ડેમો કાર્ડ દેખાઈને વાસ્તવિક લિસ્ટિંગ હોવાનો ભ્રમ ન થાય તે માટે static demo cards શરૂઆતમાં દૂર થાય છે.

## હજી શું live રીતે ચકાસાયું નથી

- npm packages ડાઉનલોડ કરવાનો પ્રયાસ થયો, પરંતુ આ વાતાવરણમાં `registry.npmjs.org` DNS/network error (`EAI_AGAIN`) મળ્યો. તેથી Android APK નું સંપૂર્ણ build અહીં ચલાવી શકાયું નથી.
- GitHub Actions માં વાસ્તવિક APK build સફળ થાય છે કે નહીં તે repo પર workflow run થયા પછી જ જાણી શકાય.
- Firebase Authentication, live Firestore Rules, Cloudinary upload, admin login, approval/delete, બીજી ડિવાઇસ પર sync અને વાસ્તવિક મોબાઇલમાં install/run હજી live-test થયેલ નથી.
- Firebase Console માં `firestore.rules` અને `firestore.indexes.json` આપમેળે publish થતાં નથી; Firebase CLIથી યોગ્ય project પર deploy કરવું અથવા Consoleમાં rules અને composite index અલગથી લાગુ કરવાં પડશે.
- GitHub Pages deploy workflow માટે repository Settings → Pages માં Source `GitHub Actions` સેટ કરવું પડી શકે.

## ક્ષમતા અને મફત ઉપયોગ

- જાહેર વેબપેજ એક વખત 24 મંજૂર લિસ્ટિંગ લોડ કરે છે; વધુ માટે pagination છે.
- Admin પેનલ એક વખત 100 લિસ્ટિંગ લોડ કરે છે; આગળની જૂની લિસ્ટિંગ માટે pagination છે.
- આથી એકસાથે આખો ડેટાબેઝ લોડ થતો નથી, પરંતુ 1,000+ concurrent users માટે performance guarantee નથી. વાસ્તવિક ભાર પરીક્ષણ, Firebase quotas, Cloudinary quotas, network અને hosting પર આધાર રાખે છે.
- GitHub Pages, Firebase અને Cloudinary ના મફત સ્તરોની મર્યાદાઓ છે. મફત ઉપયોગમાં રહેવાની ખાતરી માટે usage/quotas જોવાં પડશે.
- લિસ્ટિંગ delete કરવાથી Firestore નો રેકોર્ડ ડિલીટ થાય છે; Cloudinary માં પહેલેથી અપલોડ થયેલા ફોટા આ client-only setup માં આપમેળે ડિલીટ થતા નથી.

**નિષ્કર્ષ:** આ ZIP ના જણાવેલા static/syntax checks પાસ થયા છે; તેને live-tested અથવા production-ready કહેવું હજી યોગ્ય નથી.

# Maru Ghar — મારું ઘર (Gandhinagar)

આ source bundle માં પસંદ કરેલી premium 3D gold/silver branding, photorealistic property-style homepage, એ જ પસંદ કરેલો app icon, Firebase listing submission અને admin approval page સામેલ છે.

## GitHub repository માં મૂકવા
1. ZIP extract કરો.
2. અંદરના files/folders (`index.html`, `admin.html`, `assets/`, `.github/` વગેરે) repository `prabhat1217/Maru-Ghar-Final` ના root માં upload કરીને જૂના project files replace કરો.
3. `main` branch પર commit કરો. GitHub Actions માં **Build Maru Ghar Android APK** workflow ચલાવો અથવા push પછી ચાલે તેની રાહ જુઓ.
4. Workflow run માં **Artifacts → MARU-GHAR-ANDROID-APK** માંથી APK ડાઉનલોડ કરો.

## Firebase / admin
- Firebase project: `maru-ghar-gandhinagar-8dbe4`
- Listings collection: `listings`
- Admin page: `/admin.html`
- Admin panel માં Firebase Authentication નું Email/Password account વાપરો. માત્ર UID `yJYiuaUE3KXVLVuWqLyLRH5owQJ3` ને rules માં admin અધિકાર છે.
- `firestore.rules` source file માં સુધારેલી rules છે. આ ZIP મૂકવાથી Firebase Console ની live rules આપમેળે બદલાતી નથી. Live rules અલગથી publish/deploy કરવી જરૂરી છે.
- Firebase Authentication માં Email/Password અને Anonymous providers સક્રિય હોવા જોઈએ.
- Cloudinary unsigned preset `marughar_images` અને cloud name `t5gd6nts` config માં છે. Unsigned preset માટે upload restrictions લગાવેલી હોવી જોઈએ.

## મહત્વની સ્થિતિ
આ source bundle છે, live deployment અથવા successful APK build નો પુરાવો નથી. GitHub Actions run green થયા પછી જ APK build સફળ ગણવો. Firebase Console માં live rules અને test listing/approval ચકાસ્યા પછી જ production-ready ગણવું.


## Admin, sync અને data safety
- હોમપેજના જાહેર મેનૂ/ફૂટરમાં Admin Login લિંક રાખેલી નથી. અધિકૃત એડમિન `/admin.html` સીધું ખોલી શકે છે. Admin page માંથી પાછા હોમપેજ પર જવા માટે લિંક છે.
- Admin પ્રવેશ Email/Password દ્વારા થાય છે, પરંતુ Admin અધિકાર ફક્ત UID `yJYiuaUE3KXVLVuWqLyLRH5owQJ3` ને જ મળે છે. બીજો વપરાશકર્તા એપ વાપરી શકે, પરંતુ તે listing મંજૂર/ડિલીટ કરી શકતો નથી.
- Listings Firestore ના shared `listings` collection માં અને ફોટા Cloudinary માં રાખવામાં આવે છે; એટલે એ જ Firebase/Cloudinary configuration વાપરતી વેબસાઇટ અને APK cloud data સાથે જોડાય છે. એપ uninstall કરવાથી cloud listing ડિલીટ થતી નથી.
- આ source bundle માં કોડ/Rules/workflow સુધારેલા છે. GitHub પર commit કરવું, GitHub Actions build green કરવો, live Firebase Rules publish/deploy થયાની ખાતરી કરવી અને વાસ્તવિક device પર Admin approval + બીજા device પર listing દેખાય છે તે ચકાસવું હજુ જરૂરી છે. આ તપાસો થયા પહેલાં production-ready હોવાનો દાવો કરવો નહીં.


## આ સુધારામાં વધારાની સુવિધાઓ
- Admin panel માંથી નવી પ્રોપર્ટી ઉમેરવી, સીધી જાહેર કરવી અથવા પેન્ડિંગ રાખવી.
- Admin panel માંથી પેન્ડિંગ/મંજૂર/નામંજૂર લિસ્ટિંગ ડિલીટ કરવી.
- જાહેર પેજમાં એક વખત 24 મંજૂર લિસ્ટિંગ લોડ થાય; “વધુ પ્રોપર્ટી જુઓ” થી આગળની લિસ્ટિંગ લોડ થાય.
- Admin panel એક વખત 100 લિસ્ટિંગ લોડ કરે છે; વધુ જૂની લિસ્ટિંગ માટે આગળનું પેજ લોડ કરી શકાય છે.
- ડિલીટ કરવાથી Firestore લિસ્ટિંગ રેકોર્ડ દૂર થાય છે; Cloudinary પર પહેલેથી અપલોડ થયેલા ફોટા આપમેળે ડિલીટ થતા નથી.
- Firebase/Cloudinaryના મફત પ્લાનમાં મર્યાદાઓ છે; 1,000+ યુઝર્સ માટે ક્ષમતા અને ખર્ચનો વાસ્તવિક ઉપયોગ મુજબ ટેસ્ટ જરૂરી છે. કોઈપણ વેબ/એપ માટે હેંગ ન થવાની 100% ખાતરી આપી શકાતી નથી.

## મફત વેબસાઇટ પ્રકાશન
- `.github/workflows/deploy-web.yml` GitHub Pages પર વેબસાઇટ પ્રકાશિત કરવા માટે છે.
- GitHub repository Settings → Pages માં Source તરીકે **GitHub Actions** પસંદ કરવું જરૂરી હોઈ શકે છે.
- Deploy-Web workflow સફળ થયા પછી GitHub Actionsના deployment output માં વેબસાઇટ લિંક મળશે.


## Firestore Index મહત્વપૂર્ણ

જાહેર લિસ્ટિંગ `status == approved` અને `createdAt desc` query વાપરે છે. તેના માટે `firestore.indexes.json` માં composite index છે. `firestore.rules` અને `firestore.indexes.json` ફક્ત ZIP/GitHubમાં મૂકવાથી Firebase પર લાગુ થતા નથી. Firebase CLIથી યોગ્ય projectમાં બંને deploy કરો (`firebase deploy --only firestore:rules,firestore:indexes`) અથવા Firebase Consoleમાં Rules publish કરીને જરૂરી composite index બનાવો. Live test કર્યા વગર આ પગલું પૂર્ણ માનશો નહીં.


## 12-10-2026 UI Update
- `index.html` માં user's latest visual reference મુજબ emerald header, off-white surface, purple CTAs, clean property cards અને responsive styling ઉમેર્યું છે.
- `manifest.webmanifest` theme/background colours update કર્યા છે.
- `CHAT_HISTORY_SUMMARY_GUJARATI.md` અગાઉની નક્કી કરેલી requirementsનો સાર છે.
- `PROJECT_MASTER_CHECKLIST_GUJARATI.md` release પહેલાં કરવાના અને live-test બાકી કામ દર્શાવે છે.
- Firebase config, admin page, rules, backend અને workflowsને આ UI passમાં અસ્પર્શિત રાખ્યા છે.
- આ ZIP હજી GitHub પર deploy થયેલી નથી. APK build અને live service checks માટે workflow/device tests જરૂરી છે.

## WhatsApp અને ફોટા અપલોડ અપડેટ
- વેબસાઇટ અને Android APKમાં પ્રોપર્ટી કાર્ડ પર ફોન અને WhatsApp ચેટ બટન.
- ફૂટરમાં ત્રણેય પ્રોજેક્ટ સંપર્ક નંબરો માટે WhatsApp લિંક.
- માલિક અને એડમિન લિસ્ટિંગમાં એક પ્રોપર્ટી માટે વધુમાં વધુ 20 JPG/PNG/WEBP ફોટા (દરેક 8 MB સુધી); 4/5 ફોટાની જૂની મર્યાદા દૂર.
- જાહેર લિસ્ટિંગમાં મુખ્ય ફોટા સાથે બાકીના ફોટાની સ્ક્રોલ કરી શકાય તેવી ગેલેરી.
- Android APK Capacitor દ્વારા એ જ વેબ ફાઇલ્સ વાપરે છે, તેથી વેબ અને APK બંનેમાં આ ફેરફારો સમાવાય છે.


## Admin login ક્યાંથી ખોલવું (જાહેર મેનૂમાં લિંક નથી)
- વેબસાઇટ deploy થયા પછી બ્રાઉઝરના address bar માં તમારી વેબસાઇટના મૂળ સરનામા પાછળ `/admin.html` લખીને ખોલો. ઉદાહરણ: `https://તમારી-વેબસાઇટનું-સરનામું/admin.html`.
- હોમપેજ પર Admin Loginની લિંક ઇરાદાપૂર્વક જાહેર રાખવામાં આવી નથી, જેથી સામાન્ય મુલાકાતીઓને તે મેનૂમાં ન દેખાય.
- આ માત્ર લિંક છુપાવવાની વ્યવસ્થા છે; વાસ્તવિક સુરક્ષા માટે Firebase Authentication અને Firestore Rules જરૂરી છે. યોગ્ય Admin UID સિવાય કોઈને મંજૂરી/ડિલીટ કરવાની સત્તા ન મળવી જોઈએ.
- જો `/admin.html` ખોલતાં 404 આવે, તો નવી ZIPની ફાઇલો GitHub repository ના root માં અપલોડ/commit થઈ છે અને deployment સફળ થયું છે તેની ખાતરી કરો.

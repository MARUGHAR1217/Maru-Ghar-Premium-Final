# MARU GHAR — Master Checklist (Gujarati)

## A. Brand અને UI
- [x] નામ: મારું ઘર / MARU GHAR
- [x] પહેલેથી પસંદ કરેલો logo/icon source assets જાળવવો
- [x] મુખ્ય UI palette લાગુ: `#006837`, `#FFDD00`, `#C0C0C0`, `#4F46E5`, `#F5F7FA`, `#1F2937`
- [x] Website CSS ને premium light / emerald header / purple CTA style તરફ update કર્યું
- [ ] યુઝરના screenshot સામે દરેક sectionનું visual QA
- [ ] mobile, tablet, desktop real-browser QA
- [ ] final app icon/logo screenshots અને splash screen cross-check

## B. Property listings
- [x] categories: ઘર, ફ્લેટ, દુકાન, રહેણાંક પ્લોટ, કોમર્શિયલ પ્લોટ, ઓફિસ, વેરહાઉસ
- [x] ભાડે/વેચાણ અને search/filter base UI
- [x] owner listing form અને up to 20 photos
- [ ] actual Firebase listing fetch and search/filter end-to-end test
- [ ] price, BHK, locality, area, listing status and detail page validation
- [ ] favorites/save and recent search persistence
- [ ] sold/rented/deactivated listing behavior test
- [ ] demo/example content ક્યારેય live listing તરીકે રજૂ ન થાય તેની ખાતરી

## C. Contact
- [ ] દરેક live listingમાં owner phone અને WhatsApp deep-link test
- [ ] contact numbers: 6357030198 / 9737296498 / 7016873003
- [ ] WhatsApp chat and direct call test on Android device
- [ ] phone number exposure/owner consent review

## D. Admin અને approval
- [x] public homepageમાંથી Admin Login લિંક દૂર; admin page પર noindex; dashboard fixed admin UID + Firebase Authથી જ ખુલશે
- [ ] admin login test with authorized account
- [ ] pending → approve/reject workflow live Firestore પર ચકાસવું
- [ ] only approved listings public pageમાં દેખાય તે ચકાસવું
- [ ] edit/delete/deactivate behavior and audit safety check
- [ ] admin UID/rules and account recovery process securely verify

## E. Cloud database / photos
- [x] Firebase config/backend/Cloudinary config જાળવ્યા; Firestore ruleમાં photo limit 20 સાથે મેળ બેસાડ્યો
- [ ] Firebase Authentication providers enabled છે કે નહીં ચકાસવું
- [ ] live Firestore rules deployed rules સાથે source compare કરવી
- [ ] composite index requirement તપાસવી
- [ ] Cloudinary unsigned preset restrictions, file size/type and upload limits test
- [ ] website ↔ APK cross-device sync test
- [ ] backup/export/restore plan and restore drill
- [ ] rate limits, spam, owner-submission abuse and privacy review

## F. Website deployment / Android APK
- [x] existing GitHub workflow and Capacitor files preserved in source bundle
- [ ] correct repository and branch confirm કરીને backup બનાવવો
- [ ] updated files GitHubમાં commit/upload કરવી
- [ ] GitHub Actions web deploy successful green run
- [ ] GitHub Actions APK build successful green run
- [ ] APK install, launch, update and package conflict test
- [ ] APK અને website બંનેમાં same listings, photos, branding and contact flows test
- [ ] app permissions and privacy policy review

## G. Release gate
- [ ] કોઈ secrets/private admin credentials sourceમાં hard-code નથી તેની review
- [ ] console/network errors અને broken images/links check
- [ ] loading, empty, offline, permission-denied, and upload-failure states test
- [ ] accessibility, Gujarati readability and responsive overflow test
- [ ] final ZIP backup and release notes
- [ ] all tests pass before describing as production-ready

**સ્થિતિની નોંધ:** [x] એટલે આ source passમાં હાજર/લાગુ કરેલું. [ ] એટલે આગળનું કાર્ય અથવા live verification બાકી. કોઈ પણ unchecked itemને completed માનવું નહીં.

## WhatsApp અને ફોટા અપલોડ અપડેટ
- વેબસાઇટ અને Android APKમાં પ્રોપર્ટી કાર્ડ પર ફોન અને WhatsApp ચેટ બટન.
- ફૂટરમાં ત્રણેય પ્રોજેક્ટ સંપર્ક નંબરો માટે WhatsApp લિંક.
- માલિક અને એડમિન લિસ્ટિંગમાં એક પ્રોપર્ટી માટે વધુમાં વધુ 20 JPG/PNG/WEBP ફોટા (દરેક 8 MB સુધી); 4/5 ફોટાની જૂની મર્યાદા દૂર.
- જાહેર લિસ્ટિંગમાં મુખ્ય ફોટા સાથે બાકીના ફોટાની સ્ક્રોલ કરી શકાય તેવી ગેલેરી.
- Android APK Capacitor દ્વારા એ જ વેબ ફાઇલ્સ વાપરે છે, તેથી વેબ અને APK બંનેમાં આ ફેરફારો સમાવાય છે.

## Admin privacy update
- Public homepage/nav/footerમાંથી Admin Login લિંક દૂર કરી.
- `admin.html` પર `noindex,nofollow,noarchive` ઉમેર્યું.
- Dashboard માટે Firebase Email/Password login અને નિર્ધારિત Admin UID ચેક યથાવત્. Firestore rules મુજબ non-admin ફક્ત `approved` listings વાંચી શકે; pending/rejected listings અને approve/delete controls ફક્ત admin માટે.
- નોંધ: static websiteમાં સીધું `/admin.html` ખોલનારને login form દેખાઈ શકે છે; dashboard/data દેખાતા નથી. Login form ને પણ સંપૂર્ણપણે બહારના લોકો માટે બંધ કરવા hosting-level access protection/backend જરૂરી છે. માત્ર link છુપાવવી security નથી.
- Firestore rule photo limit હવે UIની 20-photo મર્યાદા સાથે મેળ ખાતી છે. Rulesને Firebase Consoleમાં deploy કરવી જરૂરી છે; ZIPમાં ફેરફારથી live rules આપમેળે બદલાતી નથી.

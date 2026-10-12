# મારું ઘર — અગાઉની વાતચીતમાંથી સંકલિત નિર્ણય નોંધ

## પ્રોજેક્ટનું નામ અને વિસ્તાર
- નામ: **મારું ઘર (MARU GHAR)**
- વિસ્તાર: ગાંધીનગર, ગુજરાત
- જરૂરી આઉટપુટ: વેબસાઇટ અને Android APK, બંનેમાં સમાન લુક અને એક જ shared cloud data.

## ડિઝાઇનમાં ન બદલવાના નિર્ણયો
- યુઝરે 12-10-2026ના રોજ મોકલેલો વેબ + મોબાઇલ UI સ્ક્રીનશોટ હાલનો મુખ્ય visual reference છે.
- Housing.com જેવી પ્રીમિયમ property-discovery અનુભવશૈલી: desktop પર પહોળા property cards, mobile પર app જેવી ગોઠવણી, filters, prominent property photos, favorites, WhatsApp/call CTAs.
- પસંદ કરેલો house logo/app icon અને brand identity બિનજરૂરી રીતે બદલવા નહીં.
- તાજેતરના UI referenceમાં દર્શાવેલા મુખ્ય કલર: Emerald `#006837`, Gold `#FFDD00`, Silver `#C0C0C0`, Purple `#4F46E5`, Off-white `#F5F7FA`, Charcoal `#1F2937`.
- અગાઉ સ્વીકારેલો લોગો: મેટાલિક ગોલ્ડ/સિલ્વર ઘરનો આકાર, ગુજરાતી “મારું ઘર” અને અંગ્રેજી “MARU GHAR”. Existing logo/icon assets preserve કરવાના.

## પ્રોપર્ટી અને યુઝર સુવિધાઓ
- ઘર, ફ્લેટ, દુકાન, રહેણાંક પ્લોટ, કોમર્શિયલ પ્લોટ, ઓફિસ, વેરહાઉસ/ગોડાઉન.
- ભાડે અને વેચાણ બંને.
- જાહેર મુલાકાતીઓ login વગર listings જોઈ શકે.
- વિસ્તાર, કિંમત, પ્રકાર અને BHK પ્રમાણે શોધ/ફિલ્ટર.
- listing પર સીધો ફોન અને WhatsApp સંપર્ક.
- સંપર્ક નંબર: 6357030198, 9737296498, 7016873003.
- admin listings ઉમેરે/સુધારે/બંધ કરે; owner-submitted listing `pending` રહે અને admin approval પછી જ જાહેર થાય.
- વેચાઈ/ભાડે ગયેલી property deactivate કરવાની સુવિધા.
- property photos માટે Cloudinary; shared listing data માટે Firestore.
- secure admin authentication અને backup/restore પ્રક્રિયા.

## અગાઉની ટેકનિકલ નોંધો
- અગાઉના source bundleમાં Firebase project ID `maru-ghar-gandhinagar-8dbe4`, Firestore collection `listings`, Cloudinary cloud `t5gd6nts` અને unsigned preset `marughar_images` configured છે.
- હાલના `firebase-config.js`, Firestore Rules, admin code, GitHub workflows અને backendને audit કર્યા વગર બદલવા નહીં.
- Cloudinary/Firebase settings ન બદલવા જ્યાં સુધી code અને live connections ચકાસાય નહીં.
- અગાઉની repositoryનું નામ READMEમાં `prabhat1217/New-maru-Ghar` તરીકે દર્શાવ્યું છે; current GitHub state હજી live-check કરેલું નથી.
- Firebase/Cloudinary live credentials/config, published rules, GitHub deployment, APK build, admin approval, cross-device sync અને real-device installationને વાસ્તવિક પરીક્ષણ વગર સફળ જાહેર ન કરવું.

## હાલના પેકમાં શું બદલાયું
- હાલના source packageની `index.html` પર નવું visual styling layer ઉમેર્યું છે, જે ઉપરના પસંદ કરેલા કલર અને premium light UI તરફ જાય છે.
- `firebase-config.js`, `admin.html`, `firestore.rules`, backend logic અને GitHub Actions workflowsને આ UI-only passમાં બદલ્યા નથી.
- આ પેક source files છે; તે આપમેળે GitHub પર upload/deploy થયું નથી અને APK સફળ build થયાની ખાતરી નથી.

## WhatsApp અને ફોટા અપલોડ અપડેટ
- વેબસાઇટ અને Android APKમાં પ્રોપર્ટી કાર્ડ પર ફોન અને WhatsApp ચેટ બટન.
- ફૂટરમાં ત્રણેય પ્રોજેક્ટ સંપર્ક નંબરો માટે WhatsApp લિંક.
- માલિક અને એડમિન લિસ્ટિંગમાં એક પ્રોપર્ટી માટે વધુમાં વધુ 20 JPG/PNG/WEBP ફોટા (દરેક 8 MB સુધી); 4/5 ફોટાની જૂની મર્યાદા દૂર.
- જાહેર લિસ્ટિંગમાં મુખ્ય ફોટા સાથે બાકીના ફોટાની સ્ક્રોલ કરી શકાય તેવી ગેલેરી.
- Android APK Capacitor દ્વારા એ જ વેબ ફાઇલ્સ વાપરે છે, તેથી વેબ અને APK બંનેમાં આ ફેરફારો સમાવાય છે.

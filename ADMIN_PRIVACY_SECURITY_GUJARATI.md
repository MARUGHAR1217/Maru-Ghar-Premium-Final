# મારું ઘર — Admin Privacy / Security નોંધ

## આ source updateમાં કરેલા મર્યાદિત ફેરફારો
- Public homepageના navigation અને footerમાંથી Admin Loginની જાહેર લિંક દૂર કરી.
- Admin page પર `noindex,nofollow,noarchive` અને `no-referrer` meta ઉમેર્યાં.
- Admin dashboard માટે પહેલેથી રહેલું Firebase Email/Password login તથા નિર્ધારિત Admin UID ચેક જાળવ્યો.
- Firestore rulesમાં public users માટે માત્ર `approved` listing વાંચવાની જ મંજૂરી છે; `pending` અને `rejected` listings admin UID ધરાવતા user માટે જ વાંચી શકાય. Approve/reject/delete પણ admin-only છે.
- Firestore rulesની photo limit 5માંથી 20 કરી, કારણ કે listing form 20 ફોટા સ્વીકારે છે.

## મહત્વની મર્યાદા
આ static website source છે. Public link કાઢવાથી અને `noindex` ઉમેરવાથી `/admin.html` ને સંપૂર્ણપણે private બનાવાતું નથી. કોઈ વ્યક્તિ સીધું URL ખોલે તો login form જોઈ શકે, પરંતુ યોગ્ય deployed Firestore rules અને Firebase Auth UID check હેઠળ admin dashboard/data ન જોઈ શકે. Login form પણ outsidersને દેખાવું જ નહીં હોય તો hosting-level access protection અથવા server-side protected admin route બનાવવી પડશે.

## Live પર લાગુ કરવા પહેલાં
1. `firestore.rules` Firebase Consoleમાં deploy કરો.
2. Confirm કરો કે Firebase Authમાં ફક્ત તમારા નિયંત્રણનું admin Email/Password account છે અને તેનો UID rules/`admin.html`ના `ADMIN_UID` સાથે સરખો છે.
3. Firebase Consoleના deployed rulesને source સાથે સરખાવો.
4. Non-admin accountથી pending/rejected listings વાંચવાનો પ્રયાસ fail થાય છે તેની test કરો.
5. Website deploy અને Android APK rebuild કર્યા પછી બંનેમાં approved listings, WhatsApp, call, photo upload અને admin permissions test કરો.

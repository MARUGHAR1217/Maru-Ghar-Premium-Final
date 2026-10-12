# મારું ઘર — WhatsApp અને Multi-photo અપડેટ

આ source update માં:

1. જાહેર પ્રોપર્ટી કાર્ડમાં માલિકને સીધો ફોન અને WhatsApp ચેટ બટન ઉમેર્યા.
2. Footer માં project contact નંબર 6357030198, 9737296498 અને 7016873003 માટે WhatsApp links ઉમેર્યા.
3. Admin listing card માં માલિકને WhatsApp કરવા માટે બટન ઉમેર્યું.
4. માલિકની public listing form અને admin form બંનેમાં એક listing દીઠ વધુમાં વધુ 20 ફોટા પસંદ કરી શકાય છે; જૂની 5-photo cap દૂર કરી.
5. JPG/PNG/WEBP, દરેક ફોટો 8 MB સુધી. Public form માં પસંદ કરેલા ફોટાની સંખ્યા દેખાય છે.
6. Public listing cards માં પ્રથમ ફોટા સાથે બાકીના ફોટા માટે horizontal thumbnail gallery ઉમેરેલી છે.
7. Website અને Capacitor Android APK એક જ web files વાપરે છે, તેથી APK build વખતે આ ફેરફારો પણ સામેલ થશે.

## મર્યાદા / ચકાસણી

- JavaScript syntax અને basic source feature assertions ચકાસ્યા છે.
- આ ZIP source code છે; અહીંથી website deploy અથવા Android APK build/install કરી હોવાનો દાવો નથી.
- Live upload અને WhatsApp link ચકાસવા માટે project deploy કરીને Cloudinary unsigned upload preset, Firebase Authentication/Firestore Rules અને વાસ્તવિક Android device/browser પર ચકાસણી જરૂરી છે.

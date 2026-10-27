const carteSanitaire = {
 "Yaoundé": {
 "Bastos": { hopital: "Hôpital Central de Yaoundé", adresse: "Situé vers l'avenue de l'Indépendance. Plateau technique complet." },
 "Mvan": { hopital: "Centre Médical d'Arrondissement de Mvan", adresse: 
"Près de la zone des agences de voyages. Idéal pour premiers soins." },
 "Biyem-Assi": { hopital: "Hôpital de District de Biyem-Assi", adresse: 
"Situé au cœur de Biyem-Assi, service d'urgences disponible 24h/24." },
 "Nlongkak": { hopital: "Hôpital Militaire de Yaoundé", adresse: "Situé vers le rond-point Nlongkak, excellente prise en charge générale." }
 },
 "Douala": {
 "Bonapriso": { hopital: "Hôpital Général de Douala", adresse: "Quartier Logbessou/Bonapriso. Référence pour cas complexes et urgences." },
 "Akwa": { hopital: "Hôpital Laquintinie", adresse: "Situé en plein centre d'Akwa. Grand pôle de prise en charge." },
 "Bonamoussadi": { hopital: "Hôpital de District de Bonamoussadi", adresse: "Axe principal. Équipes de garde disponibles." }
 }
};
const baseMaladies = {
 "fievre_maux_tete": {
 possibilites: [
 "<strong>Paludisme (Malaria) :</strong> Très fréquent au Cameroun, fièvre continue ou intermittente.",
 "<strong>Fièvre Typhoïde :</strong> Infection bactérienne liée à l'eau ou aux aliments.",
 "<strong>Infection virale saisonnière (Grippe sévère) :</strong> Peut mimer les premiers symptômes du paludisme."
 ],
 actions: [
 "Demander un examen biologique en laboratoire (Goutte épaisse / TDR Paludisme).","S'hydrater abondamment avec de l'eau propre et surveiller la température.",
 "Consulter un médecin pour obtenir une prescription adaptée."
 ]
 },
 "toux_fievre_respiration": {
 possibilites: [
 "<strong>Pneumonie bactérienne ou virale :</strong> Infection des poumons nécessitant une auscultation.",
 "<strong>Bronchite aiguë :</strong> Inflammation des bronches souvent accompagnée d'une toux.",
 "<strong>Tuberculose pulmonaire :</strong> Surtout si la toux persiste depuis plus de 2 à 3 semaines."
 ],
 actions: ["Éviter toute automédication par antibiotiques sans l'avis formel d'un médecin.","Se reposer dans une pièce bien ventilée et suivre de près le rythme respiratoire.","Rendez-vous dans la structure sanitaire recommandée pour une auscultation."
 ]
 }
};
function mettreAjourQuartiers() {
 const villeSelect = document.getElementById('userCity');
 const quartierSelect = document.getElementById('userQuarter');
 const ville = villeSelect.value; quartierSelect.innerHTML = '<option value="">-- Sélectionnez un quartier --</option>';
 if (ville && carteSanitaire[ville]) {
 Object.keys(carteSanitaire[ville]).forEach(q => {
 const opt = document.createElement('option');
 opt.value = q; opt.innerText = q;
 quartierSelect.appendChild(opt);
 });
 }
}
function analyserSymptomes(event) {
 event.preventDefault();
 const nom = document.getElementById('userName').value;
 const ville = document.getElementById('userCity').value;
 const quartier = document.getElementById('userQuarter').value;
 const symptomeSelectionne = document.querySelector('input[name="symptom"]:checked').value;
 document.getElementById('resName').innerText = nom;
 document.getElementById('resLocation').innerText = quartier + ", " + ville 
+ " (Cameroun)";
 const donneesMaladie = baseMaladies[symptomeSelectionne];
 const listePossibilites = document.getElementById('diseasePossibilities');
 listePossibilites.innerHTML = "";
 donneesMaladie.possibilites.forEach(p => {
 const li = document.createElement('li'); li.innerHTML = p;
 listePossibilites.appendChild(li);
 });
 const infoHopital = carteSanitaire[ville][quartier];
 if (infoHopital) {
 document.getElementById('hospitalName').innerText = infoHopital.hopital;
 document.getElementById('hospitalDetails').innerText = infoHopital.
adresse;
 }
 const listeActions = document.getElementById('actionList');
 listeActions.innerHTML = "";
 donneesMaladie.actions.forEach(a => {
 const li = document.createElement('li'); li.innerHTML = a;
 listeActions.appendChild(li);
 });
 document.getElementById('resultSection').classList.remove('hidden');
}
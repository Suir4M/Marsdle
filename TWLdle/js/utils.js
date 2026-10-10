/* =========================================================
   Fonctions utilitaires de Lotusdle
   ========================================================= */

function $(selecteur) {
  return document.querySelector(selecteur);
}

/* "Cédric Diggory" -> "cedric diggory" */
function normaliser(texte) {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function choisirAleatoirement(liste) {
  return liste[Math.floor(Math.random() * liste.length)];
}

/* "Tanya McQuoid" -> "TM" */
function initiales(nom) {
  return nom
    .split(" ")
    .filter(mot => mot.length > 0)
    .map(mot => mot[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* "Tanya McQuoid" -> "tanya-mcquoid" */
function nomFichierImage(nom) {
  return normaliser(nom)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/*
 * Portrait : images/<nom>.jpg (ex. images/tanya-mcquoid.jpg).
 * Si la photo n'existe pas, les initiales sont affichées.
 */
function creerAvatar(personnage, classe = "") {
  const cheminImage = `images/${nomFichierImage(personnage.nom)}.jpg`;

  return `
    <div class="av ${classe}">
      <img
        src="${cheminImage}"
        alt="Portrait de ${personnage.nom}"
        onerror="this.style.display='none'; this.parentElement.classList.add('fallback');"
      >
      <span>${initiales(personnage.nom)}</span>
    </div>
  `;
}

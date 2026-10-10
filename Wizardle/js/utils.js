/* =========================================================
   Fonctions utilitaires de Poudledle
   ========================================================= */

/*
 * Raccourci pour sélectionner un élément dans la page.
 * Cette fonction est utilisée par main.js et classic-game.js.
 */
function $(selecteur) {
  return document.querySelector(selecteur);
}


/**
 * Normalise un texte pour faciliter les recherches.
 *
 * Exemple :
 * "Cédric Diggory" -> "cedric diggory"
 */
function normaliser(texte) {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}


/**
 * Choisit un élément au hasard dans une liste.
 */
function choisirAleatoirement(liste) {
  return liste[Math.floor(Math.random() * liste.length)];
}


/**
 * Retourne les initiales d'un personnage.
 *
 * Exemple :
 * "Harry Potter" -> "HP"
 */
function initiales(nom) {
  return nom
    .split(" ")
    .filter(mot => mot.length > 0)
    .map(mot => mot[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}


/**
 * Transforme le nom d'un personnage en nom de fichier.
 *
 * Exemple :
 * "Harry Potter" -> "harry-potter"
 * "Cédric Diggory" -> "cedric-diggory"
 */
function nomFichierImage(nom) {
  return normaliser(nom)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}


/**
 * Crée l'affichage du portrait d'un personnage.
 *
 * Les photos sont chargées localement depuis le dossier images/.
 *
 * Exemple :
 * Harry Potter -> images/harry-potter.jpg
 *
 * Si la photo n'existe pas, les initiales sont affichées.
 */
function creerAvatar(personnage, classe = "") {
  const nomImage = nomFichierImage(personnage.nom);
  const dossier = personnage.genre ? "personnages" : "sorts";
  const cheminImage = `images/${dossier}/${nomImage}.jpg`;

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

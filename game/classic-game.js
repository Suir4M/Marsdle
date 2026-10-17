/* =========================================================
   Moteur partagé : mode classique
   Chaque univers fournit ses colonnes et ses règles de comparaison.
   ========================================================= */

function initialiserModeClassique(config) {
  const section = $(config.section || "#a");
  if (!section) return;
  const colonnes = config.champs || [];
  section.innerHTML = `
    <p class="sub">${config.texte || "Trouve le personnage mystère parmi tous les personnages."}</p>
    <div class="pk"></div><div class="lg"></div>
    <button class="nw">Nouvelle partie</button>`;

  const zonePicker = section.querySelector(".pk");
  const zoneResultat = section.querySelector(".lg");
  const boutonNouvellePartie = section.querySelector(".nw");
  let cible;
  let essais = [];
  let victoire = false;

  function cellule(valeur, classe, index) {
    return `<div class="c ${classe}" style="--i:${index}">${valeur ?? ""}</div>`;
  }

  function afficher() {
    const entete = `<div class="row hd"><div class="c"></div>${colonnes
      .map(champ => `<div class="c">${champ.titre}</div>`).join("")}</div>`;

    zoneResultat.innerHTML = victoire ? `
      <div class="win late">${creerAvatar(cible, "lg")}<span>
        🎉 C’était <b>${cible.nom}</b> !
        ${config.sousTitreVictoire ? `<small>${config.sousTitreVictoire(cible)}</small>` : ""}
        Trouvé en ${essais.length} essai${essais.length > 1 ? "s" : ""}.
      </span></div>` : "";
    if (essais.length) zoneResultat.innerHTML += entete;

    zoneResultat.innerHTML += essais.map((personnage, position) => `
      <div class="row${position ? "" : " new"}">
        <div class="c nm">${personnage.nom}</div>
        ${colonnes.map((champ, index) => cellule(
          champ.afficher(personnage, cible), champ.comparer(personnage, cible), index + 1
        )).join("")}
      </div>`).join("");
    zonePicker.style.display = victoire ? "none" : "block";
  }

  function choisir(personnage) {
    essais.unshift(personnage);
    if (personnage === cible) victoire = true;
    afficher();
  }

  function demarrer() {
    cible = choisirAleatoirement(PERSONNAGES);
    essais = [];
    victoire = false;
    creerPicker(zonePicker, choisir, () => essais.map(personnage => personnage.nom));
    afficher();
  }

  boutonNouvellePartie.addEventListener("click", demarrer);
  demarrer();
}

/* Helpers de configuration utilisables par les univers. */
function comparerExact(a, b) { return a === b ? "ok" : "no"; }
function comparerMultiples(a, b, separateur = "/") {
  const valeursA = String(a).split(separateur);
  const valeursB = String(b).split(separateur);
  const communs = valeursA.filter(valeur => valeursB.includes(valeur));
  if (communs.length === valeursA.length && valeursA.length === valeursB.length) return "ok";
  return communs.length ? "mid" : "no";
}
function afficherCodes(valeur, table, separateur = "/") {
  return String(valeur).split(separateur).map(code => table[code] ?? code).join("<br>");
}
function comparerNombre(a, b, seuil = 0) {
  const ecart = Number(b) - Number(a);
  return ecart === 0 ? "ok" : Math.abs(ecart) <= seuil ? "mid" : "no";
}
function afficherNombreDirection(valeur, cible, prefixe = "", suffixe = "", seuil = 0) {
  const ecart = Number(cible) - Number(valeur);
  return `${prefixe}${valeur}${suffixe}${ecart > 0 ? " ↑" : ecart < 0 ? " ↓" : ""}`;
}

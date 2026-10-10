/* =========================================================
   Mode Classique
   ========================================================= */

function initialiserModeClassique() {
  const section = $("#a");

  section.innerHTML = `
    <p class="sub">Trouve le personnage mystère parmi tous les personnages.</p>
    <div class="pk"></div>
    <div class="lg"></div>
    <button class="nw">Nouvelle partie</button>
  `;

  const zonePicker = section.querySelector(".pk");
  const zoneResultat = section.querySelector(".lg");
  const boutonNouvellePartie = section.querySelector(".nw");

  let cible;
  let essais = [];
  let victoire = false;
  let indexCellule = 0;

  /* Valeurs multiples (statuts, saisons) : vert = identiques, orange = au moins une en commun */
  function comparerCodes(codeEssai, codeCible) {
    const a = codeEssai.split("");
    const b = codeCible.split("");
    const communs = a.filter(code => b.includes(code));

    if (communs.length === a.length && a.length === b.length) return "ok";
    return communs.length ? "mid" : "no";
  }

  function nomsCodes(code, table) {
    return code.split("").map(c => table[c]).join("<br>");
  }

  function cellule(valeur, classe) {
    return `<div class="c ${classe}" style="--i:${indexCellule++}">${valeur}</div>`;
  }

  function egal(a, b) {
    return a === b ? "ok" : "no";
  }

  function afficher() {
    const entete = `
      <div class="row hd">
        <div class="c"></div>
        ${["Genre", "Statut", "Saisons", "Origine", "Groupe", "Destin", "Âge"]
          .map(titre => `<div class="c">${titre}</div>`)
          .join("")}
      </div>
    `;

    zoneResultat.innerHTML = victoire
      ? `
        <div class="win late">
          ${creerAvatar(cible, "lg")}
          <span>
            🎉 C’était <b>${cible.nom}</b> !
            <small>joué par ${cible.acteur}</small>
            Trouvé en ${essais.length} essai${essais.length > 1 ? "s" : ""}.
          </span>
        </div>
      `
      : "";

    zoneResultat.innerHTML += essais.length ? entete : "";

    zoneResultat.innerHTML += essais
      .map((p, position) => {
        indexCellule = 0;
        const ecartAge = cible.age - p.age;

        return `
          <div class="row${position ? "" : " new"}">
            <div class="c nm">${p.nom}</div>
            ${cellule(GENRES[p.genre], egal(p.genre, cible.genre))}
            ${cellule(nomsCodes(p.statut, STATUTS), comparerCodes(p.statut, cible.statut))}
            ${cellule(nomsCodes(p.saisons, SAISONS), comparerCodes(p.saisons, cible.saisons))}
            ${cellule(ORIGINES[p.origine], egal(p.origine, cible.origine))}
            ${cellule(p.groupe, egal(p.groupe, cible.groupe))}
            ${cellule(DESTINS[p.destin], egal(p.destin, cible.destin))}
            ${cellule(
              `${p.age} ans${ecartAge > 0 ? " ↑" : ecartAge < 0 ? " ↓" : ""}`,
              ecartAge === 0 ? "ok" : Math.abs(ecartAge) <= 5 ? "mid" : "no"
            )}
          </div>
        `;
      })
      .join("");

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

    creerPicker(zonePicker, choisir, () => essais.map(p => p.nom));
    afficher();
  }

  boutonNouvellePartie.addEventListener("click", demarrer);
  demarrer();
}

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

  /* Valeurs multiples (espèces, rôles) : vert = identiques, orange = au moins une en commun */
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

  function afficher() {
    const entete = `
      <div class="row hd">
        <div class="c"></div>
      ${["Genre", "Espèce", "Maison", "Affiliation", "Patronus", "Livre", "Naissance"]
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
            Trouvé en ${essais.length} essai${essais.length > 1 ? "s" : ""}.
          </span>
        </div>
      `
      : "";

    zoneResultat.innerHTML += essais.length ? entete : "";

    zoneResultat.innerHTML += essais
      .map((personnage, position) => {
        indexCellule = 0;
        const differenceLivre = cible.livre - personnage.livre;
        const patronusCible = patronusDe(cible);
        const patronusEssai = patronusDe(personnage);
        const differenceAnnee = cible.annee - personnage.annee;

        return `
          <div class="row${position ? "" : " new"}">
            <div class="c nm">${personnage.nom}</div>
            ${cellule(GENRES[personnage.genre], personnage.genre === cible.genre ? "ok" : "no")}
            ${cellule(nomsCodes(personnage.espece, ESPECES), comparerCodes(personnage.espece, cible.espece))}
            ${cellule(MAISONS[personnage.maison], personnage.maison === cible.maison ? "ok" : "no")}
            ${cellule(nomsCodes(personnage.role, ROLES), comparerCodes(personnage.role, cible.role))}
            ${cellule(patronusEssai, patronusEssai === patronusCible ? "ok" : "no")}
            ${cellule(
              `Livre ${personnage.livre}${differenceLivre > 0 ? " ↑" : differenceLivre < 0 ? " ↓" : ""}`,
              differenceLivre === 0 ? "ok" : Math.abs(differenceLivre) === 1 ? "mid" : "no"
            )}
            ${cellule(
              `${personnage.annee}${differenceAnnee > 0 ? " ↑" : differenceAnnee < 0 ? " ↓" : ""}`,
              differenceAnnee === 0 ? "ok" : Math.abs(differenceAnnee) <= 5 ? "mid" : "no"
            )}
          </div>
        `;
      })
      .join("");

    zonePicker.style.display = victoire ? "none" : "block";
  }

  function choisir(personnage) {
    essais.unshift(personnage);

    if (personnage === cible) {
      victoire = true;
    }

    afficher();
  }

  function demarrer() {
    cible = choisirAleatoirement(PERSONNAGES);
    essais = [];
    victoire = false;

    creerPicker(
      zonePicker,
      choisir,
      () => essais.map(personnage => personnage.nom)
    );

    afficher();
  }

  boutonNouvellePartie.addEventListener("click", demarrer);
  demarrer();
}

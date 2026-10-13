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

  /* Valeurs multiples (séparées par "/") : vert = identiques, orange = au moins une en commun */
  function comparerValeurs(valeurEssai, valeurCible) {
    const a = valeurEssai.split("/");
    const b = valeurCible.split("/");
    const communs = a.filter(valeur => b.includes(valeur));

    if (communs.length === a.length && a.length === b.length) return "ok";
    return communs.length ? "mid" : "no";
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
        ${["Genre", "Espèce", "Famille", "Cheveux", "Saison", "Rôle"]
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
            <small>${cible.famille === "Aucune" ? "The Vampire Diaries" : "Famille " + cible.famille} · Saison ${cible.saison}</small>
            Trouvé en ${essais.length} essai${essais.length > 1 ? "s" : ""}.
          </span>
        </div>
      `
      : "";

    zoneResultat.innerHTML += essais.length ? entete : "";

    zoneResultat.innerHTML += essais
      .map((p, position) => {
        indexCellule = 0;
        const ecartSaison = cible.saison - p.saison;

        return `
          <div class="row${position ? "" : " new"}">
            <div class="c nm">${p.nom}</div>
            ${cellule(p.genre, egal(p.genre, cible.genre))}
            ${cellule(p.espece.split("/").join("<br>"), comparerValeurs(p.espece, cible.espece))}
            ${cellule(p.famille, egal(p.famille, cible.famille))}
            ${cellule(p.cheveux, egal(p.cheveux, cible.cheveux))}
            ${cellule(
              `S${p.saison}${ecartSaison > 0 ? " ↑" : ecartSaison < 0 ? " ↓" : ""}`,
              ecartSaison === 0 ? "ok" : Math.abs(ecartSaison) === 1 ? "mid" : "no"
            )}
            ${cellule(p.role, egal(p.role, cible.role))}
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

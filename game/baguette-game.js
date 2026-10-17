/* =========================================================
   Mode Baguette (même principe que le mode Classique)
   ========================================================= */

function initialiserModeBaguette() {
  const section = $("#h");

  section.innerHTML = `
    <p class="sub">Trouve le propriétaire de la baguette mystère.</p>
    <div class="pk"></div>
    <div class="lg"></div>
    <button class="nw">Nouvelle partie</button>
  `;

  const zonePicker = section.querySelector(".pk");
  const zoneResultat = section.querySelector(".lg");
  const boutonNouvellePartie = section.querySelector(".nw");

  /* Le picker propose uniquement les personnages dont on connaît la baguette. */
  const personnagesPourPicker = BAGUETTES.map(baguette => baguette.personnage);

  /* Image de la baguette : images/harry-potter.png (🪄 si absente) */
  function imageBaguette(baguette) {
    const chemin = `images/${nomFichierImage(baguette.personnage.nom)}.png`;
    return `
      <div class="baguette-img">
        <img
          src="${chemin}"
          alt="Baguette de ${baguette.personnage.nom}"
          onerror="this.outerHTML='<div class=&quot;big&quot;>🪄</div>'"
        >
      </div>
    `;
  }

  let cible;
  let essais = [];
  let victoire = false;
  let indexCellule = 0;

  function majuscule(texte) {
    return texte.charAt(0).toUpperCase() + texte.slice(1);
  }

  function cellule(valeur, classe) {
    return `<div class="c ${classe}" style="--i:${indexCellule++}">${valeur}</div>`;
  }

  function fleche(difference) {
    return difference > 0 ? " ↑" : difference < 0 ? " ↓" : "";
  }

  function afficher() {
    const entete = `
      <div class="row bag hd">
        <div class="c"></div>
        ${["Bois", "Cœur", "Longueur", "Souplesse"]
          .map(titre => `<div class="c">${titre}</div>`)
          .join("")}
      </div>
    `;

    zoneResultat.innerHTML = victoire
      ? `
        <div class="win late">
          ${imageBaguette(cible)}
          <span>
            🎉 C’était <b>${cible.personnage.nom}</b> !
            Trouvé en ${essais.length} essai${essais.length > 1 ? "s" : ""}.
          </span>
        </div>
      `
      : "";

    zoneResultat.innerHTML += essais.length ? entete : "";

    zoneResultat.innerHTML += essais
      .map((baguette, position) => {
        indexCellule = 0;

        const differenceLongueur = cible.longueur - baguette.longueur;

        return `
          <div class="row bag${position ? "" : " new"}">
            <div class="c nm">${baguette.personnage.nom}</div>
            ${cellule(majuscule(baguette.bois), baguette.bois === cible.bois ? "ok" : "no")}
            ${cellule(majuscule(baguette.coeur), baguette.coeur === cible.coeur ? "ok" : "no")}
            ${cellule(
              `${String(baguette.longueur).replace(".", ",")} cm${fleche(differenceLongueur)}`,
              differenceLongueur === 0 ? "ok" : Math.abs(differenceLongueur) <= 2 ? "mid" : "no"
            )}
            ${cellule(majuscule(baguette.souplesse), baguette.souplesse === cible.souplesse ? "ok" : "no")}
          </div>
        `;
      })
      .join("");

    zonePicker.style.display = victoire ? "none" : "block";
  }

  function choisir(personnage) {
    const baguette = BAGUETTES.find(b => b.personnage.nom === personnage.nom);
    if (!baguette) return;

    essais.unshift(baguette);

    if (baguette.personnage.nom === cible.personnage.nom) {
      victoire = true;
    }

    afficher();
  }

  function demarrer() {
    cible = choisirAleatoirement(BAGUETTES);
    essais = [];
    victoire = false;

    creerPicker(
      zonePicker,
      choisir,
      () => essais.map(baguette => baguette.personnage.nom),
      personnagesPourPicker,
      "Nom d’un personnage…"
    );

    afficher();
  }

  boutonNouvellePartie.addEventListener("click", demarrer);
  demarrer();
}
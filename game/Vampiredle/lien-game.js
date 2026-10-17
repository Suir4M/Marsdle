/* =========================================================
   Mode "Point commun" : 4 personnages, un lien à trouver
   =========================================================

   Les liens sont générés automatiquement à partir de data.js
   (espèce, famille, cheveux, saison, rôle, genre).
   Tu peux en ajouter de plus fins dans LIENS_PERSO ci-dessous.

   Règle du jeu : un lien est gagnant s'il s'applique aux 4 personnages
   (plusieurs liens peuvent donc être valables). À chaque erreur, on voit
   combien de personnages sur 4 correspondent au lien proposé.
   ========================================================= */

/* Liens écrits à la main : ["Nom du lien", ["Personnage 1", "Personnage 2", ...]]
   Les noms doivent être écrits exactement comme dans data.js.
   Il faut au moins 4 personnages pour qu'un lien puisse être tiré au sort.
   Exemple :
     ["Amoureux de Katherine", ["Stefan Salvatore", "Damon Salvatore", "Elijah Mikaelson", "Mason Lockwood"]],
*/
const LIENS_PERSO = [
];

function construireLiens() {
  const liens = [];

  function ajouter(nom, test, { tirable = true, max = 22 } = {}) {
    const membres = PERSONNAGES.filter(test).map(p => p.nom);
    liens.push({
      nom,
      membres: new Set(membres),
      /* Les liens trop larges ou trop étroits ne sont jamais tirés au sort,
         mais restent proposables comme réponse. */
      tirable: tirable && membres.length >= 4 && membres.length <= max
    });
  }

  ["Homme", "Femme"].forEach(g =>
    ajouter(`Genre : ${g}`, p => p.genre === g, { tirable: false }));

  [...new Set(PERSONNAGES.flatMap(p => p.espece.split("/")))].forEach(e =>
    ajouter(`Espèce : ${e}`, p => p.espece.split("/").includes(e)));

  [...new Set(PERSONNAGES.map(p => p.famille))]
    .filter(f => f !== "Aucune")
    .forEach(f => ajouter(`Famille : ${f}`, p => p.famille === f));

  [...new Set(PERSONNAGES.map(p => p.cheveux))].forEach(c =>
    ajouter(`Cheveux : ${c}`, p => p.cheveux === c));

  [...new Set(PERSONNAGES.map(p => p.role))].forEach(r =>
    ajouter(`Rôle : ${r}`, p => p.role === r));

  [...new Set(PERSONNAGES.map(p => p.saison))].sort((a, b) => a - b).forEach(s =>
    ajouter(`Première apparition : saison ${s}`, p => p.saison === s, { max: 99 }));

  LIENS_PERSO.forEach(([nom, noms]) => {
    const valides = noms.filter(n => trouverPersonnage(n));
    liens.push({ nom, membres: new Set(valides), tirable: valides.length >= 4 });
  });

  /* Le sélecteur de recherche attend des objets avec un champ "nom". */
  return liens;
}

function combinaisons(liste, k) {
  const resultat = [];
  (function aller(debut, courant) {
    if (courant.length === k) { resultat.push([...courant]); return; }
    for (let i = debut; i < liste.length; i++) {
      courant.push(liste[i]);
      aller(i + 1, courant);
      courant.pop();
    }
  })(0, []);
  return resultat;
}

function initialiserModeLien(sectionId) {
  const section = $(`#${sectionId}`);
  const LIENS = construireLiens();
  const lienValide = (lien, noms) => noms.every(n => lien.membres.has(n));

  section.innerHTML = `
    <p class="sub">Quel point commun relie ces 4 personnages ?</p>
    <div class="lien-grid"></div>
    <div class="pk"></div>
    <div class="lg"></div>
    <button class="nw">Nouvelle partie</button>
  `;

  const zoneGrille = section.querySelector(".lien-grid");
  const zonePicker = section.querySelector(".pk");
  const zoneResultat = section.querySelector(".lg");
  const boutonNouvellePartie = section.querySelector(".nw");

  let quatre = [];
  let cible;
  let essais = [];
  let victoire = false;

  function tirerPuzzle() {
    cible = choisirAleatoirement(LIENS.filter(l => l.tirable));
    const candidats = combinaisons([...cible.membres], 4);

    /* On garde les groupes de 4 qui ont le moins d'autres liens possibles :
       le puzzle est alors plus net (souvent un seul lien valable). */
    let meilleur = Infinity;
    let retenus = [];
    candidats.forEach(groupe => {
      const nb = LIENS.filter(l => lienValide(l, groupe)).length;
      if (nb < meilleur) { meilleur = nb; retenus = [groupe]; }
      else if (nb === meilleur) retenus.push(groupe);
    });

    quatre = choisirAleatoirement(retenus);
    /* Ordre d'affichage mélangé. */
    quatre = quatre.map(n => [Math.random(), n]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
  }

  function afficher() {
    zoneGrille.innerHTML = quatre
      .map(nom => {
        const p = trouverPersonnage(nom);
        return `
          <div class="lien-p">
            <div class="lien-photo">
              <img src="images/${nomFichierImage(p.nom)}.jpg" alt="Portrait de ${p.nom}"
                   onerror="this.style.display='none'; this.parentElement.classList.add('fallback');">
              <b>${initiales(p.nom)}</b>
            </div>
            <span>${p.nom}</span>
          </div>`;
      })
      .join("");

    zoneResultat.innerHTML = "";

    if (victoire) {
      const autres = LIENS
        .filter(l => l !== essais[0].lien && lienValide(l, quatre))
        .map(l => l.nom);

      zoneResultat.innerHTML += `
        <div class="win">
          <span>
            🎉 Bien vu : <b>${essais[0].lien.nom}</b> !
            ${autres.length ? `<small>Aussi valable : ${autres.join(" · ")}</small>` : ""}
            Trouvé en ${essais.length} essai${essais.length > 1 ? "s" : ""}.
          </span>
        </div>
      `;
    }

    zoneResultat.innerHTML += essais
      .map(({ lien }) => {
        const points = quatre
          .map(n => `<i class="pt ${lien.membres.has(n) ? "ok" : "no"}" title="${n}"></i>`)
          .join("");
        const nb = quatre.filter(n => lien.membres.has(n)).length;
        return `<div class="essai-lien"><span>${lien.nom}</span><span class="pts">${points} ${nb}/4</span></div>`;
      })
      .join("");

    zonePicker.style.display = victoire ? "none" : "block";
  }

  function choisir(lien) {
    essais.unshift({ lien });
    if (lienValide(lien, quatre)) victoire = true;
    afficher();
  }

  function demarrer() {
    tirerPuzzle();
    essais = [];
    victoire = false;

    creerPicker(
      zonePicker,
      choisir,
      () => essais.map(e => e.lien.nom),
      LIENS,
      "Un point commun (ex. Vampire, Mikaelson, Blond…)"
    );
    afficher();
  }

  boutonNouvellePartie.addEventListener("click", demarrer);
  demarrer();
}

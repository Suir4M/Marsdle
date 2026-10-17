/* =========================================================
   Mode "Point commun" : 4 personnages, un lien à trouver
   =========================================================

   Les liens sont générés automatiquement à partir de data.js
   (genre, espèce, maison, rôle, livre, année de naissance).
   Tu peux en ajouter de plus fins dans LIENS_PERSO ci-dessous.

   Règle du jeu : un lien est gagnant s'il s'applique aux 4 personnages
   (plusieurs liens peuvent donc être valables). À chaque erreur, on voit
   combien de personnages sur 4 correspondent au lien proposé.
   ========================================================= */

/* Liens écrits à la main : ["Nom du lien", ["Personnage 1", "Personnage 2", ...]]
   Les noms doivent être écrits exactement comme dans data.js.
   Il faut au moins 4 personnages pour qu'un lien puisse être tiré au sort.
   Exemple :
     ["Membres de l'AD", ["Harry Potter", "Hermione Granger", "Ron Weasley", "Neville Londubat"]],
*/
const LIENS_PERSO = [
];

function construireLiens() {
  const liens = [];

  /* max : au-delà de ce nombre de membres, le lien reste proposable comme réponse
     mais n'est jamais tiré au sort (trop large pour faire une bonne énigme). */
  function ajouter(nom, test, { tirable = true, max = 40 } = {}) {
    const membres = PERSONNAGES.filter(test).map(p => p.nom);
    liens.push({
      nom,
      membres: new Set(membres),
      tirable: tirable && membres.length >= 4 && membres.length <= max
    });
  }

  /* Genre : data.js stocke des codes (H, F, A), pas les mots. */
  ["H", "F"].forEach(g =>
    ajouter(`Genre : ${GENRES[g]}`, p => p.genre === g, { tirable: false }));

  /* Espèce : le code "S" (Sorcier) est exclu, presque tout le monde l'est. */
  [...new Set(PERSONNAGES.flatMap(p => p.espece.split("/")))]
    .filter(e => ESPECES[e] !== "Sorcier")
    .forEach(e => ajouter(`Espèce : ${ESPECES[e]}`, p => p.espece.split("/").includes(e)));

  [...new Set(PERSONNAGES.map(p => p.maison))]
    .filter(m => MAISONS[m] !== "Aucune")
    .forEach(m => ajouter(`Maison : ${MAISONS[m]}`, p => p.maison === m));

  /* Rôle : on teste bien le champ "role" (et non "espece" : les codes de lettres
     se ressemblent, ex. M = Moldu côté espèce mais Mangemort côté rôle). */
  [...new Set(PERSONNAGES.flatMap(p => p.role.split("/")))]
    .filter(r => ROLES[r] !== "Autre")
    .forEach(r => ajouter(`Rôle : ${ROLES[r]}`, p => p.role.split("/").includes(r)));

  [...new Set(PERSONNAGES.map(p => p.livre))]
    .filter(l => l !== 0)
    .sort((a, b) => a - b)
    .forEach(l => ajouter( `Première apparition : livre ${l}`, p => p.livre === l));

  [...new Set(PERSONNAGES.map(p => p.annee))]
    .filter(a => a !== 0)
    .sort((a, b) => a - b)
    .forEach(a =>ajouter(`Année de naissance : ${a}`, p => p.annee === a));

  LIENS_PERSO.forEach(([nom, noms]) => {
    const valides = noms.filter(n => trouverPersonnage(n));
    liens.push({ nom, membres: new Set(valides), tirable: valides.length >= 4 });
  });

  return liens;
}

/* Groupes de 4 parmi une liste : tous si c'est raisonnable,
   sinon un échantillon aléatoire (évite de ralentir le téléphone). */
function groupesDeQuatre(liste, maximum = 3000) {
  const n = liste.length;
  const total = (n * (n - 1) * (n - 2) * (n - 3)) / 24;

  if (total <= maximum) {
    const resultat = [];
    for (let a = 0; a < n; a++)
      for (let b = a + 1; b < n; b++)
        for (let c = b + 1; c < n; c++)
          for (let d = c + 1; d < n; d++)
            resultat.push([liste[a], liste[b], liste[c], liste[d]]);
    return resultat;
  }

  const resultat = [];
  for (let i = 0; i < maximum; i++) {
    const copie = [...liste];
    const groupe = [];
    for (let k = 0; k < 4; k++) {
      groupe.push(copie.splice(Math.floor(Math.random() * copie.length), 1)[0]);
    }
    resultat.push(groupe);
  }
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
    const candidats = groupesDeQuatre([...cible.membres]);

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
      "Un point commun (ex. Ordre du Phénix, Professeur, Mangemort)"
    );
    afficher();
  }

  boutonNouvellePartie.addEventListener("click", demarrer);
  demarrer();
}

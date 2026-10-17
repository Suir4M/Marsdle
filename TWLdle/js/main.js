/* =========================================================
   Initialisation de Lotusdle
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initialiserModeClassique({
    champs: [
      { titre: "Genre", afficher: p => GENRES[p.genre], comparer: (p, c) => comparerExact(p.genre, c.genre) },
      { titre: "Statut", afficher: p => afficherCodes(p.statut, STATUTS, ""), comparer: (p, c) => comparerMultiples(p.statut, c.statut, "") },
      { titre: "Saisons", afficher: p => afficherCodes(p.saisons, SAISONS, ""), comparer: (p, c) => comparerMultiples(p.saisons, c.saisons, "") },
      { titre: "Origine", afficher: p => ORIGINES[p.origine], comparer: (p, c) => comparerExact(p.origine, c.origine) },
      { titre: "Groupe", afficher: p => p.groupe, comparer: (p, c) => comparerExact(p.groupe, c.groupe) },
      { titre: "Destin", afficher: p => DESTINS[p.destin], comparer: (p, c) => comparerExact(p.destin, c.destin) },
      { titre: "Âge", afficher: (p, c) => { const d = c.age - p.age; return `${p.age} ans${d > 0 ? " ↑" : d < 0 ? " ↓" : ""}`; }, comparer: (p, c) => comparerNombre(p.age, c.age, 5) }
    ],
    sousTitreVictoire: p => `joué par ${p.acteur}`
  });
  creerJeuCitation("b", CITATIONS, { afficherActeur: true });
  creerJeuFlou("c", { afficherActeur: true, exempleImage: "images/tanya-mcquoid.jpg" });

  /*
   * Le mode Citation n'est proposé que s'il y a assez de personnages
   * différents (sinon la réponse serait toujours la même).
   */
  const nbPersonnagesCites = new Set(CITATIONS.map(c => c.personnage.nom)).size;
  const boutonCitation = document.querySelector('.cards button[data-t="b"]');

  if (nbPersonnagesCites < 3) {
    boutonCitation.disabled = true;
    boutonCitation.querySelector("small").textContent =
      "Bientôt : ajoute des répliques dans data.js";
  }

  const accueil = $("#home");
  const boutonRetour = $("#back");
  const sections = () => document.querySelectorAll("section");

  document.querySelectorAll(".cards button").forEach(bouton => {
    bouton.addEventListener("click", () => {
      accueil.hidden = true;
      boutonRetour.hidden = false;
      sections().forEach(section => section.classList.remove("on"));
      $(`#${bouton.dataset.t}`).classList.add("on");
    });
  });

  boutonRetour.addEventListener("click", () => {
    accueil.hidden = false;
    boutonRetour.hidden = true;
    sections().forEach(section => section.classList.remove("on"));
  });
});

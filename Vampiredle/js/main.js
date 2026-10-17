/* =========================================================
   Initialisation de Vampiredle
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initialiserModeClassique({
    champs: [
      { titre: "Genre", afficher: p => p.genre, comparer: (p, c) => comparerExact(p.genre, c.genre) },
      { titre: "Espèce", afficher: p => p.espece.split("/").join("<br>"), comparer: (p, c) => comparerMultiples(p.espece, c.espece) },
      { titre: "Famille", afficher: p => p.famille, comparer: (p, c) => comparerExact(p.famille, c.famille) },
      { titre: "Cheveux", afficher: p => p.cheveux, comparer: (p, c) => comparerExact(p.cheveux, c.cheveux) },
      { titre: "Saison", afficher: (p, c) => { const d = c.saison - p.saison; return `S${p.saison}${d > 0 ? " ↑" : d < 0 ? " ↓" : ""}`; }, comparer: (p, c) => comparerNombre(p.saison, c.saison, 1) },
      { titre: "Rôle", afficher: p => p.role, comparer: (p, c) => comparerExact(p.role, c.role) }
    ],
    sousTitreVictoire: p => `${p.famille === "Aucune" ? "The Vampire Diaries" : "Famille " + p.famille} · Saison ${p.saison}`
  });
  creerJeuFlou("c", { afficherActeur: false, exempleImage: "images/nom-du-personnage.jpg" });
  creerJeuCitation("b", CITATIONS);
  initialiserModeLien("d");

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

/* =========================================================
   Initialisation de Vampiredle
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initialiserModeClassique();
  creerJeuFlou("c");
  creerJeuCitation("b", CITATIONS);

  /* Le mode Citation n'est proposé que s'il y a assez de personnages différents. */
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

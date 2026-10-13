/* =========================================================
   Initialisation de Vampiredle
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initialiserModeClassique();
  creerJeuFlou("c");
  creerJeuCitation("b", CITATIONS);

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

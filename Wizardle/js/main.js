/* =========================================================
   Initialisation de l'application
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initialiserModeClassique();

  creerJeuSimple(
    "b",
    CITATIONS,
    question => `
      <blockquote>« ${question.citation} »</blockquote>
      <p class="sub">Qui a dit ça ?</p>
    `
  );

  creerJeuFlou("c");

  creerJeuSimple(
    "d",
    PATRONUS,
    question => `
      <div class="flou-cadre"><img class="flou-photo" src=${question.image}></div>
      <p>Patronus : <b>${question.animal}</b></p>
      <p class="sub">À qui appartient-il ?</p>
    `
  );

  const sortilegesPourPicker = SORTILEGES.map(
    sortilege => sortilege.personnage
  );

  creerJeuSimple(
    "e",
    SORTILEGES,
    question => `
      <blockquote>${question.description}</blockquote>
      <p class="sub">Quel est ce sortilège ?</p>
    `,
    sortilegesPourPicker,
    "Nom d’un sortilège…"
  );

  const potionsPourPicker = POTIONS.map(
    potion => potion.personnage
  );

  creerJeuSimple(
    "f",
    POTIONS,
    (question, victoire) => `
      ${victoire ? `<div class="big">${question.personnage.symbole}</div>` : ""}
      <blockquote>${question.description}</blockquote>
      <p class="sub">Quelle est cette potion ?</p>
    `,
    potionsPourPicker,
    "Nom d’une potion…"
  );

  creerJeuLieu("g");

  initialiserModeBaguette();

  const accueil = $("#home");
  const boutonRetour = $("#back");
  const sections = () => document.querySelectorAll("section");

  document.querySelectorAll(".cards button").forEach(bouton => {
    bouton.addEventListener("click", () => {
      accueil.hidden = true;
      boutonRetour.hidden = false;

      sections().forEach(section => {
        section.classList.remove("on");
      });

      $(`#${bouton.dataset.t}`).classList.add("on");
    });
  });

  boutonRetour.addEventListener("click", () => {
    accueil.hidden = false;
    boutonRetour.hidden = true;

    sections().forEach(section => {
      section.classList.remove("on");
    });
  });
});
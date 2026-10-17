/* =========================================================
   Initialisation de l'application
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initialiserModeClassique({
    champs: [
      { titre: "Genre", afficher: p => GENRES[p.genre], comparer: (p, c) => comparerExact(p.genre, c.genre) },
      { titre: "Espèce", afficher: p => afficherCodes(p.espece, ESPECES), comparer: (p, c) => comparerMultiples(p.espece, c.espece) },
      { titre: "Maison", afficher: p => MAISONS[p.maison], comparer: (p, c) => comparerExact(p.maison, c.maison) },
      { titre: "Affiliation", afficher: p => afficherCodes(p.role, ROLES), comparer: (p, c) => comparerMultiples(p.role, c.role) },
      { titre: "Patronus", afficher: p => patronusDe(p), comparer: (p, c) => comparerExact(patronusDe(p), patronusDe(c)) },
      { titre: "Livre", afficher: (p, c) => { const d = c.livre - p.livre; return `Livre ${p.livre}${d > 0 ? " ↑" : d < 0 ? " ↓" : ""}`; }, comparer: (p, c) => comparerNombre(p.livre, c.livre, 1) },
      { titre: "Naissance", afficher: (p, c) => { const d = c.annee - p.annee; return `${p.annee}${d > 0 ? " ↑" : d < 0 ? " ↓" : ""}`; }, comparer: (p, c) => comparerNombre(p.annee, c.annee, 5) }
    ]
  });
  creerJeuFlou("c", {
    dossierImages: "images/",
    exclusions: ["Charlie Weasley", "Salazar Serpentard", "Godric Griffondor", "Helga Poufsouffle", "Rowena Serdaigle"],
    exempleImage: "images/cedric-digory.jpg"
  });
  creerJeuLieu("g");
  initialiserModeBaguette();
  initialiserModeLien("i");

  creerJeuSimple(
    "b",
    CITATIONS,
    question => `
      <blockquote>« ${question.citation} »</blockquote>
      <p class="sub">Qui a dit ça ?</p>
    `
  );

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
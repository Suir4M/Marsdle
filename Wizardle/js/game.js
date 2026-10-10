/* =========================================================
   Moteur commun des modes Citation, Patronus et Sortilège
   ========================================================= */

function creerJeuSimple(
  sectionId,
  liste,
  afficherQuestion,
  listePicker = PERSONNAGES,
  placeholder = "Nom d’un personnage…"
) {
  const section = document.querySelector(`#${sectionId}`);

  section.innerHTML = `
    <div class="st"></div>
    <div class="pk"></div>
    <div class="lg"></div>
    <button class="nw">Nouvelle partie</button>
  `;

  const zoneQuestion = section.querySelector(".st");
  const zonePicker = section.querySelector(".pk");
  const zoneResultat = section.querySelector(".lg");
  const boutonNouvellePartie = section.querySelector(".nw");

  let question;
  let mauvaisesReponses = [];
  let victoire = false;

  function afficher() {
    zoneQuestion.innerHTML = afficherQuestion(question, victoire);

    if (victoire) {
      zoneResultat.innerHTML = `
        <div class="win">
          ${creerAvatar(question.personnage, "lg")}
          <span>
            🎉 C’était <b>${question.personnage.nom}</b> !
            Trouvé en ${mauvaisesReponses.length + 1}
            essai${mauvaisesReponses.length ? "s" : ""}.
          </span>
        </div>
      `;
    } else {
      zoneResultat.innerHTML = "";
    }

    zoneResultat.innerHTML += `
      <div class="chips">
        ${mauvaisesReponses
          .map(personnage => `<span class="chip">${personnage.nom}</span>`)
          .join("")}
      </div>
    `;

    zonePicker.style.display = victoire ? "none" : "block";
  }

  function choisir(reponse) {
    /*
     * Le picker renvoie toujours un objet personnage.
     * On compare les noms pour éviter les problèmes de références d’objets.
     */
    if (reponse.nom === question.personnage.nom) {
      victoire = true;
    } else {
      mauvaisesReponses.push(reponse);
    }

    afficher();
  }

  function demarrer() {
    question = choisirAleatoirement(liste);
    mauvaisesReponses = [];
    victoire = false;

    creerPicker(
      zonePicker,
      choisir,
      () => mauvaisesReponses.map(personnage => personnage.nom),
      listePicker,
      placeholder
    );

    afficher();
  }

  boutonNouvellePartie.addEventListener("click", demarrer);
  demarrer();
}

/* =========================================================
   Mode Citation
   ========================================================= */

function creerJeuCitation(sectionId, liste, options = {}) {
  const config = { afficherActeur: false, ...options };
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
    zoneQuestion.innerHTML = `
      <blockquote>
        « ${question.citation} »
        ${question.original ? `<small>${question.original}</small>` : ""}
      </blockquote>
      <p class="sub">Qui a dit ça ?</p>
    `;

    zoneResultat.innerHTML = victoire
      ? `
        <div class="win">
          ${creerAvatar(question.personnage, "lg")}
          <span>
            🎉 C’était <b>${question.personnage.nom}</b> !
            Trouvé en ${mauvaisesReponses.length + 1}
            essai${mauvaisesReponses.length ? "s" : ""}.
          </span>
        </div>
      `
      : "";

    zoneResultat.innerHTML += `
      <div class="chips">
        ${mauvaisesReponses.map(p => `<span class="chip">${p.nom}</span>`).join("")}
      </div>
    `;

    zonePicker.style.display = victoire ? "none" : "block";
  }

  function choisir(reponse) {
    if (reponse.nom === question.personnage.nom) {
      victoire = true;
    } else {
      mauvaisesReponses.push(reponse);
    }
    afficher();
  }

  function demarrer() {
    /* On tire d'abord un personnage, puis une de ses répliques :
       un personnage très cité (Tanya) ne domine pas le jeu. */
    const noms = [...new Set(liste.map(item => item.personnage.nom))];
    const nom = choisirAleatoirement(noms);
    question = choisirAleatoirement(liste.filter(item => item.personnage.nom === nom));
    mauvaisesReponses = [];
    victoire = false;

    creerPicker(zonePicker, choisir, () => mauvaisesReponses.map(p => p.nom));
    afficher();
  }

  boutonNouvellePartie.addEventListener("click", demarrer);
  demarrer();
}

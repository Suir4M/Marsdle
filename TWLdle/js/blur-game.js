/* =========================================================
   Mode Portrait flou
   La photo (images/<nom>.jpg) est très floue au départ et
   se précise à chaque mauvaise réponse.
   ========================================================= */

/* Niveaux de flou (en pixels) : un niveau de moins à chaque erreur. */
const NIVEAUX_FLOU = [32, 26, 20, 15, 11, 7, 4, 2, 0];

function creerJeuFlou(sectionId) {
  const section = document.querySelector(`#${sectionId}`);

  section.innerHTML = `
    <p class="sub">Qui est ce personnage ? La photo se précise à chaque erreur.</p>
    <div class="st"></div>
    <div class="pk"></div>
    <div class="lg"></div>
    <button class="nw">Nouvelle partie</button>
  `;

  const zonePhoto = section.querySelector(".st");
  const zonePicker = section.querySelector(".pk");
  const zoneResultat = section.querySelector(".lg");
  const boutonNouvellePartie = section.querySelector(".nw");

  let cible;
  let mauvaisesReponses = [];
  let victoire = false;
  let disponibles = null; /* personnages dont la photo existe */

  /* Vérifie une seule fois quelles photos existent dans images/. */
  function chargerPhotosDisponibles() {
    if (disponibles) return Promise.resolve(disponibles);

    const tests = PERSONNAGES.map(personnage => new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(personnage);
      image.onerror = () => resolve(null);
      image.src = `images/${nomFichierImage(personnage.nom)}.jpg`;
    }));

    return Promise.all(tests).then(resultats => {
      disponibles = resultats.filter(Boolean);
      return disponibles;
    });
  }

  function niveauActuel() {
    if (victoire) return 0;
    return Math.min(mauvaisesReponses.length, NIVEAUX_FLOU.length - 1);
  }

  function afficher() {
    const flou = NIVEAUX_FLOU[niveauActuel()];
    const restantes = NIVEAUX_FLOU.length - 1 - niveauActuel();

    const cadrePhoto = `
      <div class="flou-cadre">
        <img
          class="flou-photo"
          src="images/${nomFichierImage(cible.nom)}.jpg"
          style="filter: blur(${victoire ? 0 : flou}px)"
        >
      </div>
    `;

    zonePhoto.innerHTML = victoire
      ? ""
      : `${cadrePhoto}
        <p class="sub">${restantes > 0
          ? `Encore ${restantes} étape${restantes > 1 ? "s" : ""} avant la photo nette`
          : "La photo est nette : à toi de jouer !"}</p>`;

    zoneResultat.innerHTML = victoire
      ? `
        <div class="win">
          ${cadrePhoto}
          <span>
            🎉 C’était <b>${cible.nom}</b> !
            <small>joué par ${cible.acteur}</small>
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
    if (reponse.nom === cible.nom) {
      victoire = true;
    } else {
      mauvaisesReponses.push(reponse);
    }
    afficher();
  }

  function demarrer() {
    chargerPhotosDisponibles().then(liste => {
      if (!liste.length) {
        zonePhoto.innerHTML = `
          <blockquote>
            Aucune photo trouvée. Ajoute des portraits dans le dossier
            <b>images/</b> (ex. <b>images/tanya-mcquoid.jpg</b>).
          </blockquote>
        `;
        zonePicker.style.display = "none";
        zoneResultat.innerHTML = "";
        return;
      }

      cible = choisirAleatoirement(liste);
      mauvaisesReponses = [];
      victoire = false;

      creerPicker(zonePicker, choisir, () => mauvaisesReponses.map(p => p.nom));
      afficher();
    });
  }

  boutonNouvellePartie.addEventListener("click", demarrer);
  demarrer();
}

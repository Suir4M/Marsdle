/* =========================================================
   Mode Lieu
   ========================================================= */

function creerJeuLieu(sectionId) {
  const section = document.querySelector(`#${sectionId}`);

  section.innerHTML = `
    <p class="sub">Quel est ce Lieu ?</p>
    <div class="st"></div>
    <div class="pk"></div>
    <div class="lg"></div>
    <button class="nw">Nouvelle partie</button>
  `;

  const zonePhoto = section.querySelector(".st");
  const zonePicker = section.querySelector(".pk");
  const zoneResultat = section.querySelector(".lg");
  const boutonNouvellePartie = section.querySelector(".nw");

  /* Le picker propose les noms de lieux (et non les personnages). */
  const lieuxPourPicker = LIEUX.map(lieu => lieu.personnage);

  let cible; /* entrée de LIEUX : { personnage: { nom, symbole }, indice } */
  let mauvaisesReponses = [];
  let victoire = false;
  let disponibles = null; /* lieux dont la photo existe */

  function cheminPhoto(lieu) {
    return `images/${nomFichierImage(lieu.personnage.nom)}.jpg`;
  }

  /* Vérifie une seule fois quelles photos existent dans images/. */
  function chargerPhotosDisponibles() {
    if (disponibles) return Promise.resolve(disponibles);

    const tests = LIEUX.map(lieu => new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(lieu);
      image.onerror = () => resolve(null);
      image.src = cheminPhoto(lieu);
    }));

    return Promise.all(tests).then(resultats => {
      disponibles = resultats.filter(Boolean);
      return disponibles;
    });
  }

  function afficher() {
    const cadrePhoto = `
      <div class="flou-cadre">
        <img
          class="flou-photo"
          src="${cheminPhoto(cible)}"
          alt="Photo du lieu mystère"
        >
      </div>
    `;

    zonePhoto.innerHTML = victoire ? "" : cadrePhoto;

    zoneResultat.innerHTML = victoire
      ? `
        <div class="win">
          ${cadrePhoto}
          <span>
            🎉 C’était <b>${cible.personnage.nom}</b> !
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
    if (reponse.nom === cible.personnage.nom) {
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
            Aucune photo trouvée. Ajoute des photos dans le dossier
            <b>images/</b> (ex. <b>images/12-square-grimmaurd.jpg</b>).
          </blockquote>
        `;
        zonePicker.style.display = "none";
        zoneResultat.innerHTML = "";
        return;
      }

      cible = choisirAleatoirement(liste);
      mauvaisesReponses = [];
      victoire = false;

      creerPicker(
        zonePicker,
        choisir,
        () => mauvaisesReponses.map(p => p.nom),
        lieuxPourPicker,
        "Nom d’un lieu…"
      );
      afficher();
    });
  }

  boutonNouvellePartie.addEventListener("click", demarrer);
  demarrer();
}
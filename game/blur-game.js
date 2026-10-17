/* =========================================================
   Moteur partagé : mode portrait flou
   Les particularités de chaque univers sont fournies en configuration.
   ========================================================= */

const NIVEAUX_FLOU = [32, 26, 20, 15, 11, 7, 4, 2, 0];

function creerJeuFlou(sectionId, options = {}) {
  const section = document.querySelector(`#${sectionId}`);
  if (!section) return;

  const config = {
    dossierImages: "images/",
    afficherActeur: false,
    exclusions: [],
    texteQuestion: "Qui est ce personnage ? La photo se précise à chaque erreur.",
    exempleImage: "images/nom-du-personnage.jpg",
    ...options
  };

  section.innerHTML = `
    <p class="sub">${config.texteQuestion}</p>
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
  let disponibles = null;

  function cheminImage(personnage) {
    return `${config.dossierImages}${nomFichierImage(personnage.nom)}.jpg`;
  }

  function chargerPhotosDisponibles() {
    if (disponibles) return Promise.resolve(disponibles);
    const tests = PERSONNAGES
      .filter(personnage => !config.exclusions.includes(personnage.nom))
      .map(personnage => new Promise(resolve => {
        const image = new Image();
        image.onload = () => resolve(personnage);
        image.onerror = () => resolve(null);
        image.src = cheminImage(personnage);
      }));
    return Promise.all(tests).then(resultats => {
      disponibles = resultats.filter(Boolean);
      return disponibles;
    });
  }

  function niveauActuel() {
    return victoire ? 0 : Math.min(mauvaisesReponses.length, NIVEAUX_FLOU.length - 1);
  }

  function afficher() {
    const niveau = niveauActuel();
    const flou = NIVEAUX_FLOU[niveau];
    const restantes = NIVEAUX_FLOU.length - 1 - niveau;
    const cadrePhoto = `
      <div class="flou-cadre">
        <img class="flou-photo" src="${cheminImage(cible)}"
             alt="Portrait mystère" style="filter: blur(${victoire ? 0 : flou}px)">
      </div>`;

    zonePhoto.innerHTML = victoire ? "" : `${cadrePhoto}
      <p class="sub">${restantes > 0
        ? `Encore ${restantes} étape${restantes > 1 ? "s" : ""} avant la photo nette`
        : "La photo est nette : à toi de jouer !"}</p>`;

    zoneResultat.innerHTML = victoire ? `
      <div class="win">
        ${cadrePhoto}
        <span>🎉 C’était <b>${cible.nom}</b> !
          ${config.afficherActeur && cible.acteur ? `<small>joué par ${cible.acteur}</small>` : ""}
          Trouvé en ${mauvaisesReponses.length + 1}
          essai${mauvaisesReponses.length ? "s" : ""}.
        </span>
      </div>` : "";

    zoneResultat.innerHTML += `<div class="chips">${mauvaisesReponses
      .map(personnage => `<span class="chip">${personnage.nom}</span>`).join("")}</div>`;
    zonePicker.style.display = victoire ? "none" : "block";
  }

  function choisir(reponse) {
    if (reponse.nom === cible.nom) victoire = true;
    else mauvaisesReponses.push(reponse);
    afficher();
  }

  function demarrer() {
    chargerPhotosDisponibles().then(liste => {
      if (!liste.length) {
        zonePhoto.innerHTML = `<blockquote>Aucune photo trouvée. Vérifie les portraits dans le dossier
          <b>${config.dossierImages}</b> (ex. <b>${config.exempleImage}</b>).</blockquote>`;
        zonePicker.style.display = "none";
        zoneResultat.innerHTML = "";
        return;
      }
      cible = choisirAleatoirement(liste);
      mauvaisesReponses = [];
      victoire = false;
      creerPicker(zonePicker, choisir, () => mauvaisesReponses.map(p => p.nom));
      afficher();
    }).catch(erreur => console.error("Impossible de charger les portraits du mode flou :", erreur));
  }

  boutonNouvellePartie.addEventListener("click", demarrer);
  demarrer();
}

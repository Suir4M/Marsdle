/* =========================================================
   Affichage de la page d'accueil
   ========================================================= */

(function () {
  const grille = document.getElementById("grille");
  const stats = document.getElementById("stats");

  function echapper(texte) {
    const div = document.createElement("div");
    div.textContent = texte;
    return div.innerHTML;
  }

  function creerCarte(u) {
    const disponible = u.statut === "disponible" && u.url;
    const balise = disponible ? "a" : "div";
    const carte = document.createElement(balise);

    carte.className = `univers${disponible ? "" : " bientot"}`;
    carte.style.setProperty("--accent", u.couleur);

    if (disponible) {
      carte.href = u.url;
      carte.setAttribute("aria-label", `Jouer à ${u.jeu} (${u.univers})`);
    } else {
      carte.setAttribute("aria-disabled", "true");
    }

    const image = u.image
      ? `<img class="u-image" src="${echapper(u.image)}" alt="" loading="lazy" onerror="this.remove()">`
      : "";

    const modes = u.modes && u.modes.length
      ? `<ul class="u-modes">${u.modes.map(m => `<li>${echapper(m)}</li>`).join("")}</ul>`
      : "";

    carte.innerHTML = `
      <div class="u-visuel">
        ${image}
        <span class="u-icone" aria-hidden="true">${u.icone || "✦"}</span>
        <span class="u-badge">${disponible ? "Disponible" : "Bientôt"}</span>
      </div>
      <div class="u-corps">
        <p class="u-univers">${disponible ? echapper(u.univers) : "Prochainement"}</p>
        <h2 class="u-titre">${echapper(disponible ? u.jeu : u.univers)}</h2>
        <p class="u-desc">${echapper(u.description || "")}</p>
        ${modes}
        <span class="u-cta">${disponible ? 'Jouer <i aria-hidden="true">→</i>' : "En préparation"}</span>
      </div>
    `;

    return carte;
  }

  const visibles = UNIVERS.filter(u => u.visible !== false);
  const disponibles = visibles.filter(u => u.statut === "disponible" && u.url);

  /* Les univers disponibles d'abord, puis ceux à venir. */
  [...disponibles, ...visibles.filter(u => !disponibles.includes(u))]
    .forEach(u => grille.append(creerCarte(u)));

  const nbModes = disponibles.reduce((somme, u) => somme + (u.modes ? u.modes.length : 0), 0);
  const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? "s" : ""}`;

  /* "univers" est invariable : pas de "s" en plus. */
  stats.textContent = `${disponibles.length} univers · ${pluriel(nbModes, "mode")} de jeu`;

  document.getElementById("marque").textContent = SITE.nom;
  document.title = `${SITE.nom} · Devine les personnages de tes univers préférés`;
  document.getElementById("annee").textContent = new Date().getFullYear();
  document.querySelector(".pied .copy").lastChild.textContent = ` ${SITE.nom}`;
})();

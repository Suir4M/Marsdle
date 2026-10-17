/* =========================================================
   Bouton "Accueil" (maison) : retour vers la page d'accueil des univers
   =========================================================
   Fichier autonome : il injecte lui-même le bouton et son style, donc il
   fonctionne tel quel sur Poudledle, Lotusdle ou n'importe quel futur jeu.

   Utilisation (dans index.html, juste avant </body>) :
     <script src="js/home-button.js" data-href="../"></script>

   - data-href  : adresse de la page d'accueil (défaut : "../")
   - data-label : texte d'aide (défaut : "Retour aux univers")
   ========================================================= */

(function () {
  const script = document.currentScript;
  const href = (script && script.dataset.href) || "../";
  const libelle = (script && script.dataset.label) || "Retour aux univers";

  const style = document.createElement("style");
  style.textContent = `
    .home-btn {
      position: fixed;
      top: calc(env(safe-area-inset-top, 0px) + 12px);
      left: max(12px, calc(50vw - 340px));
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      color: var(--gold, #e6cf94);
      background: var(--card, rgba(13, 32, 34, .82));
      -webkit-backdrop-filter: blur(8px);
      backdrop-filter: blur(8px);
      border: 1px solid var(--bd, #2c4a4c);
      border-radius: 50%;
      box-shadow: 0 6px 18px rgba(0, 0, 0, .35);
      text-decoration: none;
      transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }
    .home-btn svg {
      width: 22px;
      height: 22px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .home-btn:active { transform: scale(.94); border-color: var(--gold, #e6cf94); }
    .home-btn:focus-visible { outline: 2px solid var(--gold, #e6cf94); outline-offset: 3px; }
    @media (hover: hover) {
      .home-btn:hover {
        transform: translateY(-2px);
        border-color: var(--gold, #e6cf94);
        box-shadow: 0 10px 24px rgba(0, 0, 0, .45), 0 0 22px rgba(230, 207, 148, .25);
      }
    }
    @media print { .home-btn { display: none; } }
  `;
  document.head.append(style);

  const lien = document.createElement("a");
  lien.className = "home-btn";
  lien.href = href;
  lien.title = libelle;
  lien.setAttribute("aria-label", libelle);
  lien.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5"/>
      <path d="M5.5 9.2V20a1 1 0 0 0 1 1H10v-5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V21h3.5a1 1 0 0 0 1-1V9.2"/>
    </svg>
  `;
  document.body.append(lien);
})();
